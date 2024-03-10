import React from 'react'
import { useLocation } from 'react-router-dom';

const Success = () => {
    const { state } = useLocation();
    const pnrNumber = state?.pnrNumber;
  return (
    <div>
      {pnrNumber}
    </div>
  )
}

export default Success
