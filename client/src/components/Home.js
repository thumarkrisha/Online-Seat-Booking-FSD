import React from 'react'
import seat from '../images/Seat2.png'
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();
  return (
    <div class="container">
    <div class="text">
      <h1>Welcome to Our Seat Booking Platform</h1>
      <h3>Discover the Easiest Way to Book Your Preferred Seats</h3>
      <p>Navigating our interactive seating charts is a breeze, allowing you to effortlessly choose the perfect seat for your preferred event. The booking process is secure and straightforward, ensuring your information is handled with the utmost care. From the initial seat selection to the enjoyment of the event itself, we prioritize your comfort and satisfaction. Explore the diverse range of events we offer, and get ready for a seamless and enjoyable booking experience. Why settle for anything less when you can book your seats hassle-free with us? Join us on this journey, and let the excitement begin!</p>
      <button class="home-button" onClick={()=>navigate('/seat')}>
  Book Now
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button>
    </div>
    <div class="image">
      <img src={seat} alt="Seat Booking Platform Image"/>
    </div>
  </div>  
  );
}
