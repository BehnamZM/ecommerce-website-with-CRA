import React, { useContext, useEffect, useState } from 'react'
import './Signup.css'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import Input from '../../components/Input/Input'
// import Preload from '../../components/Preload/Preload'
import { Store } from '../../Store'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import {getError} from '../utils'



function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const navigate = useNavigate()
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';


  // get userInfo and dispatch from store file

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state


  // register function

  const registerHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('تکرار پسوورد باید با پسوود یکی باشد')
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password
      })

      ctxDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    }
    catch (err) {
      alert(err.message)
    }
  }


  // when userInfo is existance we redirect to home page

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])


  return (
    <>
      <div className="register">
        {/* {loading && <Preload />}
        {error && <alert>{error}</alert>} */}
        <div className="signup-title">
          <TitleStyle>صفحه ثبت نام</TitleStyle>
        </div>
        <div className="register-body container">

          {/* register part */}

          <form className="register-form auth-part" onSubmit={registerHandler}>
            <h4>ثبت نام</h4>
            <div className="register-name-part">
              <label>نام
                <Input type="text" placeholder='نام خود را وارد کنید' onChange={e => setName(e.target.value)} />
              </label>
            </div>
            <label>آدرس ایمیل
              <Input type="email" placeholder='ایمیل خود را وارد کنید' onChange={e => setEmail(e.target.value)} />
            </label>

            <div className="register-password-part">
              <label>رمز عبور
                <Input type="password" placeholder='رمز عبور شما' onChange={e => setPassword(e.target.value)} />
              </label>
              <label>تکرار رمز عبور
                <Input type="password" placeholder='تکرار رمز عبور' onChange={e => setConfirmPassword(e.target.value)} />
              </label>
            </div>
            <div>
              <ButtonStyle>
                ثبت نام
              </ButtonStyle>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup