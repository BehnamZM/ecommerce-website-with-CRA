import React, { useContext } from 'react'
import './ShopItem.css'
import { VscClose } from 'react-icons/vsc'
import { Store } from '../../../Store'

function ShopItem(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems }
  } = state



  const removeItemHandler = (props) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: props })
  }
  return (
    <>


      <div className="shopitem" >
        <div className="shopitem-img">
          <img src={props.image} alt="shopitem" />
        </div>
        <div className="shopitem-des">
          <div className="shopitem-title">{props.name}</div>
          <div className="shopitem-price">{props.price} هزار تومان</div>
        </div>
        <div className="remove-shopitem" onClick={() => removeItemHandler(props)}>
          <VscClose />
        </div>
      </div >
    </>
  )
}

export default ShopItem