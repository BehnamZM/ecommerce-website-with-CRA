import React from 'react'
import './Services.css'
import {MdPayment} from 'react-icons/md'
import {FaShippingFast} from 'react-icons/fa'
import {GiReturnArrow} from 'react-icons/gi'

function Services() {
  return (
    <>
      <div className="services container">
        <div className="service-card">
          <div className="service-icon">
            <FaShippingFast />
          </div>
          <div className="service-des">
            <h4>ارسال رایگان</h4>
            <p>برای خریدهای بالای 200هزار تومان</p>
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <MdPayment />
          </div>
          <div className="service-des">
            <h4>پرداخت امن</h4>
            <p>از طریق درگاه های قابل اعتماد</p>
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <GiReturnArrow />
          </div>
          <div className="service-des">
            <h4>ضمانت بازگشت</h4>
            <p>در صورت آسیب محصول در طی فرایند ارسال</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services