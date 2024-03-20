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
    username: localStorage.getItem('username')
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
            username: localStorage.getItem('username'),
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

  return (<>
    <button class="button" onClick={()=>{navigate("/seat")}}>
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
    </>
  );
}
