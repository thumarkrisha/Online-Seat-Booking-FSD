import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingForm() {
  const { state } = useLocation();
  const bookSeat = state.bookSeat;
  const date = state.date;
  console.log(date);
  const time = state.time;
  console.log(time);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    bookSeat.map((seat, index) => ({
      seatNo: seat,
      name: "",
      age: "",
      gender: "",
    }))
  );

  function generateUniqueNumber() {
    const timestamp = new Date().getTime(); 
    const randomSuffix = Math.floor(Math.random() * 100000); 
  
    const uniqueNumber = `${timestamp}${randomSuffix}`;
  
    return uniqueNumber;
  }
  
  // Usage
  const uniqueNumber = generateUniqueNumber();
  console.log(uniqueNumber);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [name]: value
      };
      return updatedFormData;
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

   const bookingData = Array.from(formData);

   const booking = {
    date: date,
    time: time,
    seats: bookSeat,
    pnrNumber:uniqueNumber
  };
  
 await axios.post('http://localhost:8080/api/userbooking/booking', booking, {
  params: {
    username: sessionStorage.getItem('username')
  },
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => {
  console.log("Details stored");
}).catch(error => {
  console.error('fail to store data', error);
});


   await axios.post("http://localhost:8080/api/book/details", 
        bookingData,
        {
          params: {
            username: sessionStorage.getItem('username'),
            pnrNumber:uniqueNumber
            }
        }
        )
    .then(response => {
        console.log('Registration successful');
        navigate("/success",{ state: {
          bookingData: bookingData,
          pnrNumber: uniqueNumber
        }})
    })
    .catch(error => {
        console.error('Registration failed:', error);
        // Handle registration failure (e.g., display error message)
    });
    console.log(formData);
  };

  return (
    <div className="booking-form-container">
      <h2>Please Fill Below Detail</h2>
      <div>
        {formData.map((data, index) => (
          <div key={index} className="form-container">
            <p>Seat No: {data.seatNo}</p>
            <input
              className="inputField form-input"
              type="text"
              name={`name`}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter your name"
              required
            />
            <input
              className="inputField form-input"
              type="number"
              name={`age`}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter your age"
              required
            />
            <select
              className="inputField form-input"
              name={`gender`}
              onChange={(e) => handleChange(e, index)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        ))}
      </div>
      <button id="button" className="book-button" onClick={handleSubmit}>
        Book
      </button>
    </div>
  );
}
