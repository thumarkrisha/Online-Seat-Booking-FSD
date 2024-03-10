import React from 'react'
import { useLocation } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Success = () => {
    const { state } = useLocation();
    const pnrNumber = state?.pnrNumber;
    const bookingData= state?.bookingData;
    const { width, height } = useWindowSize()
  return (
    <div className='success-container-main' style={{ position: 'relative' ,zIndex:-2}}>
        <Confetti
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
         />
        <div className='success-container'>
        <div className='successfull'>
        Successfully Seats are booked
        </div>
        <div className='pnrnumber'>
            PNR No:  {pnrNumber}
        </div>  
        <div className='seat-no'>
            Seat No : {bookingData.map((seat, index) => (
        <span key={index}>
            {seat.seatNo}
            {index < bookingData.length - 1 && ', '}
        </span>
    ))}
        </div>
        </div>
    </div>
  )
}

export default Success
