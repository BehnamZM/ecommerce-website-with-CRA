import React from 'react'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import { FiPhoneCall } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import './Contact.css'
import Input from '../../components/Input/Input'
import BottonStyle from '../../components/ButtonStyle/ButtonStyle'


function Contact() {
  return (
    <div className="contact">
      <div className="contact-title">
        <TitleStyle>ارتباط با ما</TitleStyle>
      </div>
      <div className="contact-body container">
        <div className="contact-info">
          <h3 className="contact-info-title">راه های ارتباطی</h3>
          <p>از راه های زیر میتوانید با ما در ارتباط باشید</p>
          <div className="contact-ways">
            <div className="contact-way">
              <div className="contact-way-icon">
                <FiPhoneCall />
              </div>
              <p>09211234567</p>
            </div>
            <div className="contact-way">
              <div className="contact-way-icon">
                <AiOutlineMail />
              </div>
              <p>info@example.com</p>
            </div>
            <div className="contact-way">
              <div className="contact-way-icon">
                <GoLocation />
              </div>
              <p>استان البرز، شهر کرج</p>
            </div>
          </div>
        </div>
        <div className="massage-to-us">
          <Input type="text" placeholder='نام خود را وارد کنید' />
          <Input type="text" placeholder='نام خانوادگی خود را وارد کنید' />
          <Input type="email" placeholder='ایمیل خود را وارد کنید' />
          <Input type="tel" placeholder='شماره تماس خود را وارد کنید' />
          <textarea inputType='texterea' placeholder='پیام شما'  className='input-element' cols="30" rows="10"/>
          <BottonStyle>ارسال پیام</BottonStyle>
        </div>
      </div>
    </div>
  )
}

export default Contact