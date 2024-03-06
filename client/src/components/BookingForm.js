import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BookingForm() {
  const { state } = useLocation();
  const bookSeat = state.bookSeat;
  const date = state.date;
  const time = state.time;

  const [formData, setFormData] = useState(
    bookSeat.map((seat, index) => ({
      seatNo: seat,
      name: "",
      age: "",
      gender: ""
    }))
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
  
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
        Proceed For Payment
      </button>
    </div>
  );
}
