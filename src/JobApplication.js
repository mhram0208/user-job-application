import axios from 'axios'
import React,{useState, useEffect} from 'react'

const JobApplication = (props) =>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [skills, setSkills] = useState('')
    const [experience, setExperience] = useState('')
    const [formErrors,setFormErrors] = useState({})
    const errors = {}

    const handleChange = (e)=>{
        console.log('handle change',e.target.name)
        const attr = e.target.name
        if(attr === 'name'){
          setName(e.target.value)
        } else if(attr === 'email'){
          setEmail(e.target.value)
        } else if(attr === 'phone'){
          setPhone(e.target.value)
        } else if(attr === 'jobTitle'){
          setJobTitle(e.target.value)
        } else if(attr === 'experience'){
          setExperience(e.target.value)
        } else if(attr === 'skills'){
            setSkills(e.target.value)
        }
    }

    const runValidations = () =>{
        //name
        if(name.trim().length===0){
            errors.name='Name cannot be blank'
        }
        //email
        if(email.trim().length===0){
        errors.email='Email cannot be blank'
        } 
        //phone
        if(phone.trim().length===0){
            errors.phone='Phone cannot be blank'
        }
        //jobTitle
        if(jobTitle.trim().length===0){
            errors.jobTitle='Please select Job Title'
        }
        //experience
        if(experience.trim().length===0){
            errors.experience='Please enter your experience'
        }
        //skills
        if(skills.trim().length===0){
            errors.skills='Please enter your skills'
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const formData={
                name:name,
                email:email,
                phone:phone,
                jobTitle:jobTitle,
                experience:experience,
                skills:skills
            }
            
            axios.post(`http://dct-application-form.herokuapp.com/users/application-form`,formData)
            .then((response)=>{
                const result = response.data
                console.log(result)
                setName('')
                setEmail('')
                setPhone('')
                setJobTitle('')
                setExperience('')
                setSkills('')
            })
            .catch((err)=>{
                alert(err.message)
            })
        } else {
            setFormErrors(errors)
        }

    }

    return(
        <div className="container">
            <form className="col-lg-8 offset-lg-2" noValidate onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Full Name</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" value={name} name="name" onChange={handleChange}/>
                    </div>
                    <div className="col-sm-12">
                        {formErrors.name && <span className="text-danger">{formErrors.name}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Email Address</label>
                    <div className="col-sm-9">
                        <input type="email" className="form-control" value={email} name="email" onChange={handleChange}/>
                    </div>
                    <div className="col-sm-12">
                        {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Contact Number</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" value={phone} name="phone" onChange={handleChange}/>
                    </div>
                    <div className="col-sm-12">
                        {formErrors.phone && <span className="text-danger">{formErrors.phone}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Applying fro Job</label>
                    <div className="col-sm-9">
                        <select className="form-select" value={jobTitle} name="jobTitle" onChange={handleChange}>
                            <option value="">----Select----</option>
                            <option value="Front-End Developer">Front-End Developer</option>
                            <option value="Node.js Developer">Node.js Developer</option>
                            <option value="MEAN Stack Developer">MEAN Stack Developer</option>
                            <option value="FULL Stack Developer">Full Stack Developer</option>
                        </select>
                    </div>
                    <div className="col-sm-12">
                        {formErrors.jobTitle && <span className="text-danger">{formErrors.jobTitle}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Experience</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" value={experience} name="experience" onChange={handleChange}/>
                    </div>
                    <div className="col-sm-12">
                        {formErrors.experience && <span className="text-danger">{formErrors.experience}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Technical Skills</label>
                    <div className="col-sm-9">
                        <textarea name="skills" className="form-control" value={skills} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-sm-12">
                        {formErrors.skills && <span className="text-danger">{formErrors.skills}</span>}
                    </div>
                </div>
                <button className="btn btn-primary"type="submit">Send Application</button>
            </form>
        </div>
    )
}

export default JobApplication