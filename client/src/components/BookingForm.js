import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BookingForm() {

  const {state} = useLocation();
  const bookSeat = state.bookSeat;
  const date = state.date;
  const time = state.time;

  const [formData, setFormData] = useState({
    name_0: '',
    age_0: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData)
  }

  return (
    <div className='booking-form-container'>
      <h2>Please Fill Below Detail</h2>
      <div>
        {bookSeat.map((seat, index) => (
          <div key={index} className='form-container'>
            <p>Seat No: {seat}</p>
            <input
              className='inputField form-input'
              type="text"
              name={`name_${index}`}
              // value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            <input
              className='inputField form-input'
              type="number"
              name={`age_${index}`}
              // value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </div>
        ))}
      </div>
      <button id="button" className="book-button" onClick={handleSubmit}>
          Proceed For Payment
      </button>
    </div>
  );
}
