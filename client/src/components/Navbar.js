import React, { useState } from 'react'
import logo from '../images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';

const Navbar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  }

  const username = localStorage.getItem('username')
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
            <div className="dropdown" style={{position: 'relative'}}>
              <button className="navlink avatar-button" onClick={toggleDropdown}>
                <Avatar name={username} size="45" round={true} />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu show" style={{position: 'absolute', top: '100%', left: '-50px'}}>
                  <button className="dropdown-item" onClick={() => console.log('Profile clicked')}>Profile</button>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
