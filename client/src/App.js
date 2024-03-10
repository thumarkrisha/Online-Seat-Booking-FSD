import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SeatBookingList from './components/SeatBookingList';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import BookingForm from './components/BookingForm';
import Success from './components/Success';

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [displaySeats, setDisplaySeats] = useState([]);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route exact path='/register' Component={Register}/>
        <Route exact path='/home' Component={Home}/>
        <Route exact path='/seat' Component={SeatBookingList} />
        <Route exact path='/book' Component={BookingForm}/>
        <Route exact path="success" Component={Success}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
