import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import './UserEdit.css'
import { useNavigate, useParams } from 'react-router-dom';
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle';
import Input from '../../components/Input/Input';
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import { Store } from '../../Store';
import Preload from '../../components/Preload/Preload';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};


function UserEdit() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err.message,
        });
      }
    };
    fetchData();
  }, [userId, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      alert('اطلاعات کاربر با موفقیت ویرایش شد.');
      navigate('/admin/users-list');
    } catch (err) {
      alert(err.message);
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };


  return (
    <div className='edit-user'>
      <div className='edit-user-title'>
        <TitleStyle>
          ویرایش کاربر { name }
        </TitleStyle>
      </div>
      <div className='edit-user-body'>
        {
          loading ? <Preload /> :
            error ? (<h3>{error}</h3>) :
              (<form onSubmit={submitHandler}>
                <label>نام
                  <Input
                    type="text"
                    value={name}
                    placeholder='نام کاربر'
                    onChange={e => setName(e.target.value)} />
                </label>
                <label>آدرس ایمیل
                  <Input
                    type="email"
                    value={email}
                    placeholder='ایمیل کاربر'
                    onChange={e => setEmail(e.target.value)} />
                </label>
                <label>ادمین است؟
                  <Input
                    type="checkbox"
                    checked={isAdmin}
                    placeholder='ایمیل خود را وارد کنید' onChange={e => setIsAdmin(e.target.checked)} />
                </label>
                <div>
                  <ButtonStyle>{loadingUpdate ? '...' : 'آپدیت'}</ButtonStyle>
                </div>
              </form>)
        }

      </div>
    </div>
  )
}

export default UserEdit