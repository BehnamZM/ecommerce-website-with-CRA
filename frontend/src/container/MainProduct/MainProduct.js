import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import './MainProduct.css'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import Buttonstyle from '../../components/ButtonStyle/ButtonStyle'
import ProductStyle from '../../components/ProductStyle/ProductStyle'
import { useParams, useNavigate } from 'react-router-dom'
import MainProductSlider from './MainProductSlider/MainProductSlider'
import axios from 'axios'
import { GrStar } from 'react-icons/gr'
import Preload from "../../components/Preload/Preload";
import Rating from "../../components/Rating/Rating";
import { Store } from "../../Store";
import ButtonStyle from "../../components/ButtonStyle/ButtonStyle";
import { Link } from "react-router-dom";
// import { RiRestaurantLine } from "react-icons/ri";


const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    default:
      return state;
  }
}


function MainProduct() {
  let reviewsRef = useRef();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate()

  const [{ loading, error, product, loadingCreateReview }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: ''
  })

  let params = useParams()
  const { slug } = params
  // let similarProducts

  useEffect(() => {

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })

        // const { data } = await axios.get('/api/products')
        // similarProducts = data.find(item => item._id === result.data._id).slice(0, 3)

      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.massage })
      }
    }
    fetchData()
  }, [slug])



  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state


  // add to cart function

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find(item => item._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      window.alert('در انبار این تعداد موجودی نداریم')
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    navigate('/cart')
  }


  // send reviews function

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      alert('نمره دهی یا کامنت گذاری انجام نشده است');
      return;
    }
    dispatch({
      type: 'CREATE_REQUEST',
    });
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      alert('دیدگاه با موفقیت ثبت شد');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (err) {
      alert(err.message);
      dispatch({ type: 'CREATE_FAIL' });
    }
  };


  return (
    <div className="main-product">
      <div className="main-product-title">
        <TitleStyle>
          جزئیات محصول
        </TitleStyle>
      </div>
      {
        loading ? <Preload /> :
          error ? (<alert>{error}</alert>) : (
            <>
              <div className="main-product-body container">
                <div className="product-slider">
                  <MainProductSlider img={product.images} name={product.name}/>
                </div>
                <div className="product-infos">
                  <h4 className="product-title">{product.name}</h4>
                  <div className="product-price">{product.price} تومان</div>
                  <div className="product-reviews">

                    <div className="product-stars">
                      <Rating rating={product.rating} />
                    </div>
                    ({product.numReviews} مرور)
                  </div>
                  <div className="product-des">
                    <p>{product.description}</p>
                  </div>
                  <div className="product-actions">
                    <div className="control-product-count">
                      <div className="product-plus">+</div>
                      <div className="product-count">1</div>
                      <div className="product-minus">-</div>
                    </div>
                    {
                      product.countInStock > 0 &&
                      <div onClick={addToCartHandler}>
                        <Buttonstyle>
                          افزودن به سبد خرید
                        </Buttonstyle>
                      </div>
                    }

                  </div>
                </div>
              </div>

              {/* related products */}

              <div className="related-products container">
                <TitleStyle>
                  محصولات مشابه
                </TitleStyle>
                <div className="related-products-list">
                  {/* {
                    similarProducts.map(similarProduct => (
                      <ProductStyle {...similarProduct} key={similarProduct._id} />
                    ))
                  } */}
                  <ProductStyle />
                  <ProductStyle />
                  <ProductStyle />
                  <ProductStyle />
                </div>
              </div>

              {/* product reviews */}

              <div className="customer-reviews">
                <h3 className="customer-reviews-title" ref={reviewsRef}>
                  دیدگاه مشتریان
                </h3>
                {
                  product.reviews.map(review => (
                    <div className="customer-review-item" key={review._id}>
                      <div className="customer-name">{review.name}</div>
                      <Rating rating={review.rating} caption=" "></Rating>
                      <div className="customer-review-date">{review.createdAt.substring(0, 10)}</div>
                      <div className="customer-review">{review.comment}</div>
                    </div>
                  ))
                }

                <div className="customer-reviews-form">
                  {
                    userInfo ? (
                      <form onSubmit={submitHandler}>
                        <label>به این محصول امتیاز دهید.
                          <select
                            value={rating}
                            onChange={e => setRating(e.target.value)}>
                            <option value='0'>امتیازدهی</option>
                            <option value='5'>عالی</option>
                            <option value='4'>خیلی خوب</option>
                            <option value='3'>خوب</option>
                            <option value='2'>بد</option>
                            <option value='1'>خیلی بد</option>
                          </select>
                        </label>
                        <label>دیدگاه شما
                          <textarea
                            placeholder='دیدگاه خود را بنویسید...'
                            onChange={e => setComment(e.target.value)} value={comment} />
                        </label>
                        <div>
                          <ButtonStyle>
                            {loadingCreateReview ? '...' : 'ارسال دیدگاه'}
                          </ButtonStyle>
                        </div>
                      </form>
                    ) : (
                      <div className="signin-message">
                        برای کامنت گذاری <Link to='/signin'>وارد شوید.</Link>
                      </div>
                    )
                  }

                </div>
              </div>
            </>
          )
      }

    </div>
  )
}

export default MainProduct
