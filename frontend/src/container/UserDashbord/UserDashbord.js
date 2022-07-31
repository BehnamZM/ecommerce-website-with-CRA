import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import './UserDashbord.css'

function UserDashbord() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
     userInfo 
  } = state


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingInfos')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }
  return (
    <div className="profile">
      <div className="profile-body container">
        <div className="user-profile-menu">
          <ul>
            <h5>سلام {userInfo.name} عزیز!</h5>
            <li><Link to="/user-profile">پیشخوان</Link></li>
            <li><Link to="/edit-profile">ویرایش</Link></li>
            <li><Link to="">علاقه مندی ها</Link></li>
            <li><Link to="">تراکنشها</Link></li>
            <li><Link to="/signin" onClick={signoutHandler}>خروج</Link></li>
          </ul>
        </div>
        <div className="user-profile-description">
          <h4>به پروفایل خودتون خوش اومدید!</h4>
        </div>
      </div>
    </div>
  )
}

export default UserDashbord