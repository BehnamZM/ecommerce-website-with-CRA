import React, { useContext, useEffect, useState } from 'react'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import Input from '../../components/Input/Input'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import './ShippingPage.css'
import {useNavigate} from 'react-router-dom'
import {Store} from '../../Store'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'

function ShippingPage() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch} = useContext(Store)
  const {userInfo, cart: {shippingInfos}} = state

  const [firstname, setFirstName] = useState(shippingInfos.firstname || '')
  const [lastname, setLastName] = useState(shippingInfos.lastname || '')
  const [province, setProvince] = useState(shippingInfos.province || '')
  const [city, setCity] = useState(shippingInfos.city || '')
  const [address, setAddress] = useState(shippingInfos.address || '')
  const [phone, setPhone] = useState(shippingInfos.phone || '')


  const sendShippingInfosHandler = async (e) => {
    e.preventDefault()

    ctxDispatch({type:'SEND_SHIPPING_INFOS',payload: {
      firstname, lastname, province, city, address, phone
    }})

    localStorage.setItem('shippingInfos', JSON.stringify({firstname, lastname, province, city, address, phone}))

    navigate('/payment')
  }

  useEffect(() => {
    if(!userInfo){
      navigate('/Signin?redirect=/shipping')
    }
  },[userInfo, navigate])

  return (
    <div className="shipping-page">
      <CheckoutSteps step1 step2 />
      <div className="shipping-title">
        <TitleStyle>
          ارسال اطلاعات
        </TitleStyle>
      </div>
      <form className='shipping-form' onSubmit={sendShippingInfosHandler}>
        <label>نام
          <Input type='text' value={firstname} placeholder='نام خود را وارد کنید' onChange={e => setFirstName(e.target.value)}/>
        </label>
        <label>نام خانوادگی
          <Input type='text' value={lastname} placeholder='نام خانوادگی خود را وارد کنید' onChange={e => setLastName(e.target.value)}/>
        </label>
        <label>استان
          <Input type='text' value={province} placeholder='استان محل سکونت خود را وارد کنید' onChange={e => setProvince(e.target.value)}/>
        </label>
        <label>شهر
          <Input type='text' value={city} placeholder='شهر محل سکونت خود را وارد کنید' onChange={e => setCity(e.target.value)}/>
        </label>
        <label>آدرس منزل
          <Input type='text' value={address} placeholder='آدرس محل سکونت خود را وارد کنید' onChange={e => setAddress(e.target.value)}/>
        </label>
        <label>شماره تماس
          <Input type='text' value={phone} placeholder='شماره تماس محل سکونت خود را وارد کنید' onChange={e => setPhone(e.target.value)}/>
        </label>
        <div>
          <ButtonStyle>
            ارسال اطلاعات
          </ButtonStyle>
        </div>

      </form>
    </div>
  )
}

export default ShippingPage