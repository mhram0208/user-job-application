import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './Home'
import JobApplication from './JobApplication'
import Dashboard from './Dashboard'


const App = (props) =>{
  return(
    <div>
      <Link to="/">Home</Link> | 
      <Link to="/job-application">Apply for Job</Link> | 
      <Link to="/dashboard">Dashboard</Link>

      <Route path="/" component={Home} exact={true} />
      <Route path="/job-application"  component={JobApplication} />
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  )
}

export default App