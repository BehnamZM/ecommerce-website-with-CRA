import React, { useContext, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import './DashboardAdmin.css'
// import Chart from 'react-google-charts';
// import axios from 'axios'

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         summary: action.payload,
//         loading: false,
//       };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

function DashboardAdmin() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    userInfo
  } = state


  // const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
  //   loading: true,
  //   error: '',
  // });


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/orders/summary', {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       });
  //       dispatch({ type: 'FETCH_SUCCESS', payload: data });
  //     } catch (err) {
  //       dispatch({
  //         type: 'FETCH_FAIL',
  //         payload: err.message,
  //       });
  //     }
  //   };
  //   fetchData();
  // }, [userInfo]);


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
            <li><Link to="/admin/dashboard">داشبورد مدیریت</Link></li>
            <li><Link to="/admin/users-list">لیست کاربران</Link></li>
            <li><Link to="/admin/product-list">لیست محصولات</Link></li>
            <li><Link to="/admin/orders-list">لیست سفارشات</Link></li>
            <li><Link to="/signin" onClick={signoutHandler}>خروج</Link></li>
          </ul>
        </div>
        <div className="website-summery-infos">
          <div className="users-length" style={{ backgroundColor: '#b1b0f5' }}>
            <h3>تعداد کاربران:</h3>
            <h5>43 نفر</h5>
          </div>
          <div className="orders-infos" style={{ backgroundColor: '#f1c4e2' }}>
            <h3>تعداد سفارشات:</h3>
            <h5>مشخص نیست!</h5>
          </div>
          <div className="all-sells" style={{ backgroundColor: '#d2f1c4' }}>
            <h3>درآمد کلی:</h3>
            <h5>مشخص نیست!</h5>
          </div>

          {/* <Chart
            width="100%"
            height="400px"
            chartType="PieChart"
            loader={<div>Loading Chart...</div>}
            data={[
              ['Category', 'Products'],
              ...summary.productCategories.map((x) => [x._id, x.count]),
            ]}
          ></Chart> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin