import React, { useContext } from 'react'
import './CartPage.css'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import './CartPage.css'
import { BsFillTrashFill } from 'react-icons/bs'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import Input from '../../components/Input/Input'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import axios from 'axios'

function CartPage() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems }
  } = state

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('در انبار این تعداد موجودی نداریم')
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const checkoutHandler = () => {
    navigate('/Signin?redirect=/shipping')
  }

  return (
    <div className="cart-page">
      <div className="cart-page-inner container">
        <div className="cart-page-title">
          <TitleStyle>
            سبد خرید شما
          </TitleStyle>
        </div>
        <div className="cart-page-body">

          {
            cartItems.length === 0 ?
              <div className="empty-cart">
                <p>سبد خرید خالی است</p>
                <Link to="/products">
                  <div style={{ margin: '2rem 0' }}>
                    <ButtonStyle>
                      بازگشت به فروشگاه
                    </ButtonStyle>
                  </div>
                </Link>
              </div> :

              <>
                <div className="cart-page-list-item">
                  {
                    cartItems.map(item => (

                      <div className="cart-page-item" key={item.name}>
                        <div className="cart-page-item-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <Link to={`/product/${item.slug}`} className="cart-page-item-title">
                          {item.name}
                        </Link>
                        <div className="cart-page-item-total-price">
                          {item.price} تومان
                        </div>
                        <div className="control-product-count">
                          <div className="product-plus" onClick={() => updateCartHandler(item, item.quantity + 1)}>+</div>
                          <div className="product-count">{item.quantity}</div>
                          <div className="product-minus" onClick={() => updateCartHandler(item, item.quantity - 1)}>-</div>
                        </div>
                        <div className="cart-page-item-price">
                          {cartItems.reduce((a,c) => a + c.price * c.quantity, 0)} تومان
                        </div>
                        <div className="cart-page-item-remove-product" onClick={() => removeItemHandler(item)}>
                          <BsFillTrashFill />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="cart-page-control">
                  <Link to="/products">
                    <div>
                      <ButtonStyle>
                        بازگشت به فروشگاه
                      </ButtonStyle>
                    </div>
                  </Link>
                  <div className="discount">
                    <div>
                      <ButtonStyle>
                        اعمال تخفیف
                      </ButtonStyle>
                    </div>
                    <Input type="text" placeholder='کد را وارد کنید' />
                  </div>
                </div>
                <div className="final-check">
                  <div className="cart-page-count-product">
                    <p>تعداد:</p>
                    <p>{cartItems.reduce((a, c) => a + c.quantity, 0)} کالا</p>
                  </div>
                  <div className="cart-page-total-price">
                    <h4>قیمت نهایی:</h4>
                    <h5>{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}  تومان</h5>
                  </div>
                  <div onClick={checkoutHandler}>
                    <ButtonStyle>
                      پرداخت
                    </ButtonStyle>
                  </div>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default CartPage

