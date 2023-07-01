import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" })
  const handleSubmit = async (e) => { 
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/createuser", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { 
          name: credentials.name, 
          email: credentials.email, 
          password: credentials.password,
          location: credentials.location 
        }
      )

    });
    const json = await response.json();
    console.log(json);

    if(!json.success){
      alert("Enter valid credentials")
    }
   
  }

  const handleChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  return (
    <div className='container'>
      <form className='m-3' onSubmit={handleSubmit}>
        <label className="mx-3">Name</label>
        <input type="text" name="name" value={credentials.name} onChange={handleChange} />
        <label className="mx-3">Email</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        <label className="mx-3">password</label>
        <input type='password' name="password" value={credentials.password} onChange={handleChange} />
        <label className="mx-3">location</label>
        <input type='text' name="location" value={credentials.location} onChange={handleChange} />

        <button type='submit' className='btn btn-success mx-3' >Submit</button>
        <Link to="/login">
        <button type='submit' className='btn btn-danger mx-3' >Already a User</button>
        </Link>
      </form>

    </div>
  )
}

export default SignUp