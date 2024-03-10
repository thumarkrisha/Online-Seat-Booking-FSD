import React from 'react'
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'
import Avatar from 'react-avatar';

const Navbar = () => {

  const username = sessionStorage.getItem('username')
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <img src={logo} alt='Logo' style={{width:"200px"}}/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div className="navbar-nav navbar-navlink mx-auto ">
        <NavLink to="/seat" className="navlink">Book Seat</NavLink>
        <NavLink to="/cancel" className="navlink">Cancel Seat</NavLink>
      </div>
      <div className="navbar-nav" style={{width:"200px",justifyContent:"right"}}>
              <Avatar name={username} size="45" round={true} />
      </div>
    </div>
    
  </div>
</nav>
    </div>
  )
}

export default Navbar
