import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';
// import Badge from 'react-boo'


function Navbar() {
  const data  = useCart();
  const navigate = useNavigate();
  const [cartView,setCartView] = useState(false);
  const handleLogOut = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }


  return (
    <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" style={{color:"red"}} to="/">Awsome Food</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" style={{color:"red", fontWeight:"bold"}} aria-current="page" to="/">Home</Link>
        </li>

        {(localStorage.getItem("authToken")) && 
        <li className="nav-item">
        <Link className="nav-link active fs-5" aria-current="page" style={{color:"red", fontWeight:"bold"}} to="/myOrderData">My Orders</Link>
      </li>
        }
      </ul>

          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-danger text-white mx-2" to="/login">Login</Link>
              <Link className="btn bg-danger text-white mx-2" to="/createuser">Sign Up</Link>
            </div>
            :
            <div>
            <div className='btn bg-white text-danger mx-2' onClick={()=>{setCartView(true)}}>My Cart <span className="badge bg-secondary">{data.length}</span></div> 
            {cartView && <Modal onClose={()=>setCartView(false)}><Cart/></Modal>}
            
            <div className='btn btn-danger text-white mx-2' onClick={handleLogOut}>LogOut </div>
          </div>
          }
       
    </div>
  </div>
</nav>
  )
}

export default Navbar