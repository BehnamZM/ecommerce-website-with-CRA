import React, { useContext, useEffect, useReducer } from 'react'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import './UserList.css'
import axios from 'axios'
import { Store } from '../../Store'
import Preload from '../../components/Preload/Preload'
import { useNavigate } from 'react-router-dom'


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    case 'FETCH_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'DELETE_REQUEST':
      return {
        ...state,
        loadingDelete: true,
        successDelete: false
      };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return {
        ...state,
        loadingDelete: false
      };
    case 'DELETE_RESET':
      return {
        ...state,
        loadingDelete: false,
        successDelete: false
      }
    default:
      return state
  }
}
function UserList() {

  const navigate = useNavigate()
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    users: []
  })
  const { state } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })

      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
        alert(err.message)
      }
    }
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchUsers();
    }
  }, [userInfo, successDelete])


  const deleteHandler = async (user) => {
    if (window.confirm('از حذف این کاربر مطمتنید؟')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        alert('کاربر با موفقیت حذف شد.');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        alert(err.message);
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };


  return (
    <div className='user-list'>
      <div className='user-list-title'>
        <TitleStyle>
          لیست کاربران
        </TitleStyle>
      </div>

      {loadingDelete && <Preload />}
      {
        loading ? <Preload /> :
          error ? (<h3>{error}</h3>) : (
            <div style={{ overflowX: 'auto' }}>
              <table className='container'>
                <thead>
                  <tr>
                    <th>آیدی</th>
                    <th>نام</th>
                    <th>ایمیل</th>
                    <th>ادمین</th>
                    <th>فروشنده</th>
                    <th>عملیاتها</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(user => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'بله' : 'خیر'}</td>
                        <td>{user.seller ? 'بله' : 'خیر'}</td>
                        <td>
                          <button onClick={() => deleteHandler(user)}>حذف</button>
                          <button onClick={() => navigate(`/admin/user/${user._id}`)}>ویرایش</button>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>)
      }

    </div>
  )
}

export default UserList