import { useState, React }from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
  let naviagete = useNavigate();
      const [credentials, setcredentials] = useState({email: "", password: ""})
    const handleSubmit = async (e) => { 
      e.preventDefault();
      const response = await fetch("http://localhost:8000/api/loginUser", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { 
            email: credentials.email, 
            password: credentials.password,
          }
        )
  
      });
      const json = await response.json();
      console.log(json);
  
      if(!json.success){
        alert("Enter valid credentials")
      }
      if(json.success){
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        naviagete("/")  
      }
    }
  
    const handleChange = (event) => {
      setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return (
      <div className='container'>
        <form className='m-3' onSubmit={handleSubmit}>
          <label className="mx-3">Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} />
          <label className="mx-3">password</label>
          <input type='password' name="password" value={credentials.password} onChange={handleChange} />
          
          <button type='submit' className='btn btn-success mx-3' >Submit</button>
          <Link to="/createuser">
          <button type='submit' className='btn btn-danger mx-3' >I'm New User</button>
          </Link>
        </form>
  
      </div>
  )
}

export default Login