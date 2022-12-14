import React, { useContext, useEffect, useState } from 'react'
import './SelectPayment.css'

import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import { Store } from '../../Store'
import { useNavigate } from 'react-router-dom'


function SelectPayment() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { shippingInfos, paymentMethod }
  } = state
  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'پرداخت از طریق کارت بانکی')


  const paymentMethodHandler = (e) => {
    e.preventDefault()
    ctxDispatch({type: 'CHOOSE_PAYMENT_METHOD', payload: paymentMethodName })
    localStorage.setItem('paymentMethod', paymentMethodName)
    navigate('/placeorder')

  }

  useEffect(() => {
    if(!shippingInfos.address){
      navigate('/shipping')
    }
  }, [shippingInfos, navigate])
  return (
    <div className="select-payment">
      <CheckoutSteps step1 step2 step3 />
      <div className="payment-title">
        <TitleStyle>
          انتخاب روش پرداخت
        </TitleStyle>
      </div>
      <div className="payment-body">
        <form onSubmit={paymentMethodHandler}>
          <label htmlFor="benkcart"><p>پرداخت از طریق کارت بانکی</p>
            <input 
            type="radio" 
            id='benkcart'
            className='payment-way' 
            value='پرداخت از طریق کارت بانکی' 
            label='پرداخت از طریق کارت بانکی'
            checked={paymentMethodName === 'پرداخت از طریق کارت بانکی'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </label>
          <label htmlFor="bagmoney"><p>پرداخت از طریق کیف پول</p>
            <input 
            id='bagmoney'
            type="radio" 
            className='payment-way'  
            value='پرداخت از طریف کیف پول' 
            label='پرداخت از طریف کیف پول'
            checked={paymentMethodName === 'پرداخت از طریف کیف پول'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
             />
          </label>
          <div>
            <ButtonStyle>
              ارسال
            </ButtonStyle>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SelectPayment