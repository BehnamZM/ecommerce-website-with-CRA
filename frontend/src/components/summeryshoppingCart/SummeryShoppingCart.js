import React, { useContext } from 'react'
import './SummeryShoppingCart.css'
import { VscClose } from 'react-icons/vsc'
import ShopItem from './ShopItem/ShopItem'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'

function SummeryshoppingCart(props) {

  
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems }
  } = state
  const showHandler = () => {
    props.click()
  }
  return (
    <>
      <div className={
        props.show ?
          'summery-shopping-cart summery-shopping-cart-show' : 'summery-shopping-cart'}>
        <div className="summery-shopping-cart-body">

          <div className="summery-shopping-cart-title">
            <h2>سبد خرید</h2>
            <div className="close-summery-shopping-cart">
              <VscClose onClick={showHandler} />
            </div>
          </div>
          <div className="shopitems">
            {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center' }}>سبد خرید خالی است</p>
            ) : (
              cartItems.map(item => (
            <ShopItem {...item} key={item.name}/>))
            )}

          </div>
          <div className="summery-shop-totalprice">
            <h4>مجموع قیمت</h4>
            <p>{cartItems.reduce((a,c) => a + c.price * c.quantity, 0)} تومان</p>
          </div>
          <Link to='/cart'>
            <button onClick={showHandler}>مشاهده جزئیات</button>
          </Link>
          {/* <button>بررسی نهایی</button> */}
        </div>
      </div>
      {
        props.show &&
        <div className="shopping-overlay" onClick={showHandler}></div>
      }

    </>
  )
}

export default SummeryshoppingCart