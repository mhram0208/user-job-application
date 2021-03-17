import React from 'react'
import axios from 'axios'

const UserDetails = (props) =>{
    const {data, shortListUser, rejectUser} = props

    //convert date into dd-mm-yyy format
    const dateConversion = (inputDate) =>{
        const date = new Date(inputDate)
        const newDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        return newDate
    }

    //function to Shortlist the user in db
    const handleShortList = (id) =>{
        const confirmShortList = window.confirm('Are you sure, you want to Shortlist?')
        if(confirmShortList){
            const status = {status:'shortlisted'}
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, status)
            .then((response)=>{
                const result = response.data
                shortListUser(result)
            }) //success
            .catch((err)=>{
                alert(err.message)
            }) //error
        }
    }

    //function to Reject the user in db
    const handleReject = (id) =>{
        const confirmReject = window.confirm('Are you sure, you want to Reject?')
        if(confirmReject){
            const status = {status : 'rejected'}
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, status)
            .then((response)=>{
                const result = response.data
                rejectUser(result)
            })
            .catch((err)=>{
                alert(err.message)
            })
        }
    }

    const showDetails = (id) =>{
        data.map((u)=>{
            if(u._id === id){
                alert(`
                    Job Profile
                    Contact Number - ${u.phone}
                    Email - ${u.email}
                    Skills - ${u.skills}
                    Experience - ${u.experience}
                `)
            }
        })
    }

    return(
        <div>
           <table className="table table-sm">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Technical Skills</th>
                       <th>Experience</th>
                       <th>Applied Date</th>
                       <th>View Details</th>
                       <th>Update Application Status</th>
                   </tr>
               </thead>
               <tbody>
                   {data.map((user,i)=>{
                       return(
                           <tr key={i}>
                               <td>{user.name}</td>
                               <td>{user.skills}</td>
                               <td>{user.experience}</td>
                               <td>
                                   {dateConversion(user.createdAt)}
                                </td>
                               <td><button className="btn btn-info btn-sm" onClick={()=>{showDetails(user._id)}}>View Details</button></td>
                                {
                                    user.status==='applied' && 
                                    <td className="btn-group">
                                        <button type="button" className="btn btn-success btn-sm mr-1" onClick={()=>{handleShortList(user._id)}}>ShortList</button>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={()=>{handleReject(user._id)}}>Reject</button>
                                    </td>
                                } 
                                {
                                    user.status==='shortlisted' && 
                                    <td>
                                        <p className="text-success">Shortlisted</p>
                                    </td>
                                } 
                                {
                                    user.status==='rejected' && 
                                    <td>
                                        <p className="text-danger">Rejected</p>
                                    </td>
                                } 
                           </tr>
                       )
                   })}
                   <tr>
                       
                   </tr>
               </tbody>
           </table>
        </div>
    )
}

export default UserDetails