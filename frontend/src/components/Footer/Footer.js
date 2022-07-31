import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook } from 'react-icons/fi'
import { FiTwitter } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { TbBrandTelegram } from 'react-icons/tb'
import logoImg from '../../assets/logo.png'
import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-body container">

        <div className="website-infos">
          <div className="footer-logo">
            <img src={logoImg} alt="logo" />
            <p>این وبسایت در خرداد 1401 تاسیس شده و هدف آن این است تا بتواند در زمینه کشاورزی کمک شایانی به مردم عزیز کشورمان کند.</p>
          </div>

          <div className="socials">
            <FiFacebook className='social'/>
            <FiTwitter className='social'/>
            <FaWhatsapp className='social'/>
            <TbBrandTelegram className='social'/>
          </div>
        </div>

        <div className="useful-links">
          <h3>لینکهای مفید</h3>
          <Link className='useful-link' to='/about'>درباره پرونیا</Link>
          <Link className='useful-link' to='/contact'>ارتباط با ما</Link>
          <Link className='useful-link' to='/login'>ورود و ثبت نام</Link>
          <Link className='useful-link' to='/cart'>سبد خرید</Link>
        </div>

        <div className="my-account">
          <h3>اکانت من</h3>
          <Link to='/login' className='my-account-link'>ورود و ثبت نام</Link>
          <Link to='/cart' className='my-account-link'>سبد خرید</Link>
          <Link to='/cart' className='my-account-link'>لیست علاقخ مندی ها</Link>
          <Link to='/' className='my-account-link'>داشبورد</Link>
        </div>

        <div className="our-services">
          <h3>سرویسهای ما</h3>
          <ul className="footer-services-items">
            <li className="footer-services-item">فروشگاه</li>
            <li className="footer-services-item">مشاوره برای کشاورزی</li>
            <li className="footer-services-item">گیاهپزشکی</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>آیا سوالی دارید؟ با ما تماس بگیرید</h3>
          <h4>0921 123 456 7</h4>
          <div className="permissions">
            مجوز ها در این بخش قرار میگیرند
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>تمام حقوق این وبسایت متعلق به آقای بهنام زارع است.</p>
      </div>
    </footer>
  )
}

export default Footer