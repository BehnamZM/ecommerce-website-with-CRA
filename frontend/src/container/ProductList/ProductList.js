import React, { useContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Preload from '../../components/Preload/Preload';
import TitleStyle from '../../components/TitleStyle/TitleStyle';
import { Store } from '../../Store';
import './ProductList.css'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle';
import { Link } from 'react-router-dom';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

function ProductList() {

  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) { }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm('آیا از افزودن محصول اطمینان دارید؟')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        alert('محصول با موفقیت اضافه گردید.');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        alert(err.message);
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        alert('محصول با موفقیت حذف گردید.');
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
    <div className='product-list'>
      <div className='product-list-title'>
        <TitleStyle>
          لیست کاربران
        </TitleStyle>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ButtonStyle onClick={createHandler}>  {loadingCreate ? '...' : 'افزودن محصول'}</ButtonStyle>
      </div>

      {loadingDelete && <Preload />}
      {
        loading ? <Preload /> :
          error ? (<h3>{error}</h3>) : (
            <>
              <table className='container'>
                <thead>
                  <tr>
                    <th>آیدی</th>
                    <th>نام</th>
                    <th>قیمت</th>
                    <th>دسته بندی</th>
                    <th>برند</th>
                    <th>عملیاتها</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map(product => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>

                        <td>
                          <button onClick={() => deleteHandler(product)}>حذف</button>
                          <button onClick={() => navigate(`/admin/product/${product._id}`)}>ویرایش</button>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    key={x + 1}
                    to={`/admin/products?page=${x + 1}`}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>)
      }


    </div>
  )
}

export default ProductList