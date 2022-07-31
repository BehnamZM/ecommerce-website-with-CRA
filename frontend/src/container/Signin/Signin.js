import React, { useContext, useEffect, useState } from 'react'
import './Signin.css'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import Input from '../../components/Input/Input'
// import Preload from '../../components/Preload/Preload'
import { Store } from '../../Store'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import {getError} from '../utils'


 
function Signin() {



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';


  // get userInfo and dispatch from store file

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {userInfo} = state


  // login function

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password
      })

      ctxDispatch({type:'USER_SIGNIN', payload: data})
      localStorage.setItem('userInfo',JSON.stringify(data))
      navigate(redirect || '/')
    }
    catch (err) {
      alert(err.message)
    }

  }


  // when userInfo is existance we redirect to home page

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo, navigate, redirect])


  return (
    <>
      <div className="login">
        {/* {loading && <Preload />}
        {error && <alert>{error}</alert>} */}
        <div className="login-title">
          <TitleStyle>صفحه ورود</TitleStyle>
        </div>
        <div className="login-body container">

          {/* login part */}

          <form className="login-part auth-part" onSubmit={loginHandler}>
            <h4>ورود</h4>
            <label>آدرس ایمیل
              <Input type="email" placeholder='ایمیل خود را وارد کنید' onChange={e => setEmail(e.target.value)} />
            </label>
            <label>رمز عبور
              <Input type="password" placeholder='رمز عبور شما' onChange={e => setPassword(e.target.value)} />
            </label>

            <div className="login-massages">
              <p className="forget-password-massage">آیا رمز خود را فراموش کرده اید؟</p>
              <Link to='/signup' className="build-account-message">اگر اکانتی ندارید کلیک کنید.</Link>
              <label className="remember-checkbox">
                مرا به خاطر بسپار
                <Input type="checkbox" />
              </label>
            </div>
            <ButtonStyle>
              ورود
            </ButtonStyle>

          </form>
        </div>
      </div>
    </>
  )
}

export default Signin