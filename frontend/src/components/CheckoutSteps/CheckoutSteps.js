import React from 'react'
import './CheckoutSteps.css'

function CheckoutSteps(props) {
  return (
    <div className="checkout-steps">
      <div className={props.step1 ? 'active' : ''}>۱</div>
      <div className={props.step2 ? 'active' : ''}>۲</div>
      <div className={props.step3 ? 'active' : ''}>۳</div>
      <div className={props.step4 ? 'active' : ''}>۴</div>
      <span className='checkout-progress'></span>

      
    </div>
  )
}

export default CheckoutSteps