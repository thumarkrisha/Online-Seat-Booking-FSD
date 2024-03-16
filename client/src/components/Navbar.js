import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const Navbar = () => {
  const [username,setUsername]= useState( localStorage.getItem('username'))
  console.log(username)
  const [open, setOpen] = React.useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleClickOpen = () => {
    setNewUsername(username);
    setOpen(true);
  };
  const handleClose = () => {
    const newUsername = document.getElementById('username').value;
    console.log(newUsername);
    axios.patch(`http://localhost:8080/api/user/userdata/${username}`,  newUsername,{
      headers: {
          'Content-Type': 'text/plain'
      }})
      .then(response => {
        console.log(response.data);
        localStorage.setItem('username',newUsername) // Update the username in the state or context
        setOpen(false) // Clear the input field
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiDialog-paper': {
      width: '400px', // Set the width to your desired value
    },
  }));

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }


  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  }

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
                  <button className="dropdown-item" onClick={handleClickOpen}>Profile</button>
                  <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Username
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
          <div className="inputContainer">
        <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>
    <input placeholder="Username" id="username" className="inputField" type="text" />
    </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button style={{color:'#CE9DFF'}} autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
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
