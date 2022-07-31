import React, { useContext, useEffect, useReducer} from "react";
import './MainProduct.css'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import Buttonstyle from '../../components/ButtonStyle/ButtonStyle'
import ProductStyle from '../../components/ProductStyle/ProductStyle'
import { useParams, useNavigate } from 'react-router-dom'
import MainProductSlider from './MainProductSlider/MainProductSlider'
import axios from 'axios'
import Preload from "../../components/Preload/Preload";
import Rating from "../../components/Rating/Rating";
import { Store } from "../../Store";
// import { RiRestaurantLine } from "react-icons/ri";


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


function MainProduct() {
  const navigate = useNavigate()

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: ''
  })

  let params = useParams()
  const { slug } = params

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`)

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.massage })
      }
    }
    fetchData()
  }, [slug])



  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {cart} = state
  const addToCartHandler =async () => {
    const existItem = cart.cartItems.find(item => item._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const {data} =await axios.get(`/api/products/${product._id}`)
    if(data.countInStock < quantity) {
      window.alert('در انبار این تعداد موجودی نداریم')
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    navigate('/cart')
    
  }


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
                  <MainProductSlider img={product.images} />
                </div>
                <div className="product-infos">
                  <h4 className="product-title">{product.title}</h4>
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
              <div className="related-products container">
                <TitleStyle>
                  محصولات مشابه
                </TitleStyle>
                <div className="related-products-list">
                  <ProductStyle />
                  <ProductStyle />
                  <ProductStyle />
                  <ProductStyle />
                </div>
              </div>
            </>
          )
      }

    </div>
  )
}

export default MainProduct