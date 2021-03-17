import React,{useState, useEffect} from 'react'
import axios from 'axios'
import UserDetails from './UserDetails'
var _ = require('lodash');

const Dashboard = (props) =>{
    const [userInfo, setUserInfo] = useState([])
    const [selectedJobTitle, setSelectedJobTitle] = useState('Front-End Developer')
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`http://dct-application-form.herokuapp.com/users/application-forms`)
        .then((response)=>{
            const result = response.data
            // console.log(result)
            setUserInfo(result)
            
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])
    
    //Find unique Job Titles
    const UniqueJobTitle = _.uniqBy(userInfo, 'jobTitle');


    useEffect(()=>{
        filterUserData(selectedJobTitle)
    },[userInfo])

    //filters users data of particular Job Title
    const filterUserData = (jobTitle) =>{
       const result =  userInfo.filter((user)=>{
            return user.jobTitle === jobTitle
        })
        setData(result)
    }
    
    //handle change between different Job Titles
    const handleButtonChange = (e) =>{
        const result =  e.target.value
        filterUserData(result)
        setSelectedJobTitle(result)
    }

    //Update user status to shortlisted in state variable
    const shortListUser = (user) =>{
       const result = userInfo.map((u)=>{
           if(u._id===user._id){
               return {...u, ...user}
           } else {
               return {...u}
           }
       })
       setUserInfo(result)
    }

    //Update user status to rejected in state variable
    const rejectUser = (user) =>{
        const result = userInfo.map((u)=>{
            if(u._id === user._id){
                return {...u, ...user}
            } else {
                return {...u}
            }
        })
        setUserInfo(result)
    }

    return (
        <div className="container">
           <h1>Admin Dashboard - {userInfo.length}</h1>
           {UniqueJobTitle.map((u)=>{
               return(
                   <button type="button" className={u.jobTitle===selectedJobTitle ? "btn-primary mr-2 mb-2 active" : "btn mr-2 mb-2"} key={u._id} onClick={handleButtonChange} value={u.jobTitle}>{u.jobTitle}</button>
               )
           })}
           <h1>{selectedJobTitle}</h1>
           <p className="mb-2">List of Developers applied for {selectedJobTitle} -  {data.length}</p>
            <UserDetails data={data} shortListUser={shortListUser} rejectUser={rejectUser}/>
        </div>
    )
}

export default Dashboard