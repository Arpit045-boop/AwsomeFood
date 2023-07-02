import { useState, React }from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
  let naviagete = useNavigate();
      const [credentials, setcredentials] = useState({email: "", password: ""})
    const handleSubmit = async (e) => { 
      e.preventDefault();
      const response = await fetch("https://foodappapi-arpit045-boop.onrender.com/api/loginUser", {
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
        <form className='d-flex align-items-center flex-column bd-highlight mb-3' style={{marginTop:"120px"}} onSubmit={handleSubmit}>
          <h4>Login</h4>
          <p>Please enter your email and password</p>
          <label className="mb-3">Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} />
          <label className="mb-3 my-3">password</label>
          <input type='password' name="password" value={credentials.password} onChange={handleChange} />
          
          <button type='submit' className='btn btn-success mb-3 my-5' >Submit</button>
          <Link to="/createuser">
          <button type='submit' className='btn btn-danger mx-3' >I'm New User</button>
          </Link>
        </form>
  
      </div>
  )
}

export default Login