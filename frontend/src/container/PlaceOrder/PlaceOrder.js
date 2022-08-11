import React, { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import { Store } from '../../Store'
import { Link, useNavigate } from 'react-router-dom'


function PlaceOrder() {
  const { state, despatch: ctxDespatch } = useContext(Store)
  const { cart, userInfo } = state

  const navigate = useNavigate();


  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);


  const submitHandler = (e) => {
    e.preventDefault()
    alert('متاسفانه در حال حاضر به سیستم بانکی متصل نیستیم!')
  }


  return (
    <div className="placeorder-page">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="payment-title">
        <TitleStyle>
          مرور سفارش
        </TitleStyle>
        <div className="placeorder-body container">
          <div className="shipping-review">
            <h3>مشخصات ارسال</h3>
            <div className="shipping-preview-name">
              <p className='title'>نام:</p>
              <p>{cart.shippingInfos.firstname} {cart.shippingInfos.lastName}</p>
            </div>
            <div className="shipping-preview-address">
              <p className='title'>آدرس کامل:</p>
              <p>{cart.shippingInfos.address}</p>
            </div>
            <Link to='/shipping'>ویرایش</Link>
          </div>
          <div className="payment-preview">
            <p className='title'>روش پرداخت:</p>
            <p>{cart.paymentMethod}</p>
            <Link to='/payment'>ویرایش</Link>
          </div>
          <div className="preview-orders">
            <h3 style={{ textAlign: 'center' }}>محصولات</h3>
            {
              cart.cartItems.map(item => (
                <div 
                key={item._id} className="preview-order-item">
                  <div className="preview-order-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <Link to={`/api/product/${item.slug}`}>{item.name}</Link>
                  <div className="preview-order-numbers">
                    <p className='title'>تعداد</p>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="preview-order-price">
                    <p className='title'>قیمت</p>
                    <p >{item.price} تومان</p>
                  </div>
                </div>
              ))
            }
            <Link to='/cart'>ویرایش</Link>

          </div>
          <div className="preview-price-box">
            <h3 className="preview-price-title">
              جزییات هزینه سفارشات
            </h3>
            <div className="preview-price-body">
              <div className="preview-orders-price">
                <p className='title'>قیمت محصولات:</p>
                <p className='price'>{cart.itemsPrice.toFixed(2)} تومان </p>
              </div>
              <div className="preview-shipping-price">
                <p className='title'>هزینه ارسال:</p>
                <p className='price'>{cart.shippingPrice.toFixed(2)} تومان </p>
              </div>
              <div className="preview-tax-price">
                <p className='title'>مالیات:</p>
                <p className='price'>{cart.taxPrice.toFixed(2)} تومان </p>
              </div>
              <div className="preview-total-price">
                <p className='title'>مبلغ قابل پرداخت:</p>
                <p className='price'>{cart.totalPrice.toFixed(2)} تومان </p>
              </div>
              <div onClick={submitHandler}>
                <ButtonStyle>
                  تکمیل خرید
                </ButtonStyle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder