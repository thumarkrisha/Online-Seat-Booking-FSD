import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const CancelSuccess = () => {
    const { state } = useLocation();
    const cancelSeats = state?.cancelSeats;
    console.log(cancelSeats);
    const { width, height } = useWindowSize()
    const navigate = useNavigate();

  return (
    <><button class="button" onClick={()=>{navigate("/home")}}>
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
      <div className='success-container-main' style={{ position: 'relative' ,zIndex:-2}}>
        <Confetti
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
         />
        <div className='success-container'>
        <div className='successfull'>
        Successfully Seats are Cancelled
        </div>
       
        <div className='seat-no'>
            Seat No : {cancelSeats.map((seat, index) => (
        <span key={index}>
            {seat}
            {index < cancelSeats.length - 1 && ', '}
        </span>
    ))}
        </div>
        </div>
    </div>
    </>

  )
}

export default CancelSuccess;
