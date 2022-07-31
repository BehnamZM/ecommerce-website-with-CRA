import axios from 'axios'
import React, { useContext, useReducer, useState } from 'react'
import './EditProfile.css'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import Input from '../../components/Input/Input'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import { Store } from '../../Store'

const reducer = (state, action) => {
  switch (action.type) {
    case 'EDIT_REQUAST':
      return {...state, loadingUpdate: true}
    case 'EDIT_SUCCESSFULL':
      return {...state, loadingUpdate: false}
    case 'EDIT_FAIL':
      return {...state, loadingUpdate: false}
    default:
      return state;
  }
}

function EditProfile() {

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {userInfo} = state

  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [{loadingUpdate}, dispatch] = useReducer(reducer, {loadingUpdate: false})

  const editProfileHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('تکرار پسوورد باید با پسوورد یکی باشد')
      return;
    }
    try {
      dispatch({type: 'EDIT_REQUAST'})
      const { data } = await axios.put('/api/users/profile', {
        name,
        email,
        password
      },
      {
        headers: {Authorization: `Bearer ${userInfo.token}`}
      })
      dispatch({type: 'EDIT_SUCCESSFULL'})
      ctxDispatch({type: 'USER_SIGNIN', payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data))
      alert('ویرایش با موفقیت انجام شد.')
    }
    catch (err) {
      dispatch({type: 'EDIT_FAIL'})
      alert(err.message)

    }
  }
  return (
    <>
      <div className='edit-profile'>
        <div className="edit-profile-title">
          <TitleStyle>ویرایش پروفایل</TitleStyle>
        </div>
        <div className="edit-profile-body container">

          <form className="edit-profile-form auth-part" onSubmit={editProfileHandler}>
            <h4>ثبت نام</h4>
            <div className="edit-profile-name-part">
              <label>نام
                <Input type="text" value={name} placeholder='نام خود را وارد کنید' onChange={e => setName(e.target.value)} />
              </label>
            </div>
            <label>آدرس ایمیل
              <Input type="email" value={email} placeholder='ایمیل خود را وارد کنید' onChange={e => setEmail(e.target.value)} />
            </label>

            <div className="edit-profile-password-part">
              <label>رمز عبور
                <Input type="password" placeholder='رمز عبور شما' value={password} onChange={e => setPassword(e.target.value)} />
              </label>
              <label>تکرار رمز عبور
                <Input type="password" placeholder='تکرار رمز عبور' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </label>
            </div>
            <div>
              <ButtonStyle>
                {
                  loadingUpdate ? '...' : 'ثبت تغییرات'
                }
              </ButtonStyle>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile