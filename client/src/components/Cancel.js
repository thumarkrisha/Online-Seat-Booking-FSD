import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
    const [pnrNumber, setPnrNumber] = useState('');
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatsFetched, setSeatsFetched] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const fetchSeats = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/userbooking/fetchbooked", { params: { pnrNumber: pnrNumber } });
            setSeats(response.data);
            setSeatsFetched(true);
        } catch (error) {
            console.error('Failed to fetch seats:', error);
        }
    };

    const handleSeatChange = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setShowMessage(false)
        }
    };

    const cancelSeats = async () => {
        if (selectedSeats.length === 0) {
            setShowMessage(true);
            return;
        }
        try {
            const response = await axios.delete("http://localhost:8080/api/userbooking/cancelling", {
                params: {
                    pnrNumber: pnrNumber,
                    seatNos: selectedSeats.join(",")
                }
            });
            console.log(response.data);
            navigate("/cancelsuccess", { state: { cancelSeats: selectedSeats } }); 
        } catch (error) {
            console.error('Failed to cancel seats:', error);
        }
    };
    

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
        <div className='booking-form-container'>
            <input
                className="inputField form-input"
                type='text'
                placeholder='Enter PNR number'
                value={pnrNumber}
                onChange={(e) => setPnrNumber(e.target.value)}
            />
            <button onClick={fetchSeats} id='button' className="book-button">Fetch Seats</button>

            {seatsFetched && seats.length > 0 && (
                <div className='booked-seats'>
                    <h5>Seats booked for PNR number </h5>
                       <h5> {pnrNumber}</h5>
                    <div className="cancel-seat" >
                        {seats.reduce((rows, seat, index) => {
                            if (index % 5 === 0) rows.push([]);
                            rows[rows.length - 1].push(seat);
                            return rows;
                        }, []).map((row, rowIndex) => (
                            <div key={rowIndex} className='seat-row'>
                                {row.map((seat, seatIndex) => (
                                    <div
                                        key={seatIndex}
                                        className={`ticket-item ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                                        onClick={() => handleSeatChange(seat)}
                                    >
                                        {seat}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    
                    <button onClick={cancelSeats} className="book-button" id='button' >Cancel Seats</button>
                    {showMessage && <p>Please select the seats you want to cancel.</p>}
                </div>
            )}

            {seatsFetched && seats.length === 0 && (
                <p>No seats booked for this PNR number.</p>
            )}
        </div>
        </>
    );

}

export default Cancel;
