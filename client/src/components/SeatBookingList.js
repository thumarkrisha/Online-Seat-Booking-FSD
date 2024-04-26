import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SeatBookingList() {

  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [displaySeats, setDisplaySeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [bookedSeats, setBookedSeats] = useState([]);
  console.log(selectedDate);
  console.log(bookedSeats);

 useEffect(()=>{
    const fetchBookedSeats = async (date, time) => {
      try {
        const response = await axios.get('http://localhost:8080/api/userbooking/bookedSeats', {
          params: {
            date,
            time,
          },
        });
        setBookedSeats(response.data);
        console.log('Booked seats:', response.data);
        // Use bookedSeats as needed in your frontend
      } catch (error) {
        console.error('Failed to fetch booked seats:', error);
      }
    };
    fetchBookedSeats(selectedDate, selectedTime);
},[selectedDate,selectedTime])

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seat = `${rowIndex}-${seatIndex}`;
    if (bookedSeats.includes(seats[rowIndex][seatIndex])) {
      return; 
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
      setDisplaySeats(displaySeats.filter((displaySeats)=> displaySeats !==  seats[rowIndex][seatIndex]));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setDisplaySeats([...displaySeats,seats[rowIndex][seatIndex]])
    }
  };


  const generateSeats = (seatsArray) =>
    seatsArray.map((row, rowIndex) => (
      <div key={rowIndex} className='seat-row'>
        {row.map((seat, seatIndex) => (
          
        <React.Fragment key={`${rowIndex}-${seatIndex}`}>
        <div
         className={`ticket-item ${selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''} ${bookedSeats.includes(seats[rowIndex][seatIndex]) ? 'booked' : ''}`}
          onClick={() => handleSeatClick(rowIndex, seatIndex)}
        >
          {seat}
        </div>
        {(seatIndex + 1) % 5 === 0 && seatIndex !== row.length - 1 && <div className="spacer"></div>}
      </React.Fragment>
        ))}
      </div>
    )); 
    
     const handleSubmit = () =>{ 
    navigate('/book',{ state: { bookSeat: displaySeats, date: selectedDate, time: selectedTime } });
  }
    const seats = [
      ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
      ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
      ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
      ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
      ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
      ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
      ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
    ];

  return (
    <>
   <button class="button" onClick={()=>{navigate("/home")}}>
  <div class="button-box">
    <span class="button-elem">
      <svg viewBox="0 0 46 66" xmlns="http://www.w3.org/2000/svg">
        <path
           d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
            fill='#CE9DFF'
        ></path>
      </svg>
    </span>
    <span class="button-elem">
      <svg viewBox="0 0 46 66">
        <path
           d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
           fill='#CE9DFF'
        ></path>
      </svg>
    </span>
  </div>
</button>

    <div className="date-time-container">
      <div className='date-time'>
      <div className='time-date'>
    <label>Date:</label>
    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} min={new Date().toISOString().split('T')[0]} selected={selectedDate} onChange={(e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    console.log('Selected Date:', dateValue);
  }} />
    </div>
    <div className='time-date'>
    <label>Time:</label>
    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className='time'>
      <option value="10:00 AM">10:00 AM</option>
      <option value="1:00 PM">1:00 PM</option>
      <option value="4:00 PM">4:00 PM</option>
      <option value="7:00 PM">7:00 PM</option>
    </select>
    </div>
    </div>
  </div>

    <div className='main-container'>
    <div className='seatbooking-container'>
      <div className='seat-demo'>
        <div className='seat'>
          <div>Available </div>
          <div className='ticket-item' >
          </div>
        </div>
        <div className='seat'>
          <div>Booked </div>
          <div className='ticket-item booked'>
          </div>
        </div>
        <div className='seat'>
          <div>Selected </div>
          <div className='ticket-item selected'>
          </div>
        </div>
      </div>
      <div>{generateSeats(seats)}</div>
      <div>
      {selectedSeats?.length>0 &&(
        <>
          <h4>Selected Seats : {displaySeats.join(", ")}</h4>
          <h6>Total Price : {displaySeats.length*200}</h6>
        </>
      )}
    <button id="button" className="book-button" onClick={handleSubmit} disabled={selectedSeats.length <= 0}>
      Book Now
    </button>
    </div>
    </div>
    </div>
    </>
  )
}

