import React from 'react'
import TitleStyle from '../TitleStyle/TitleStyle'
import './tabmenuProducts.css'
import ProductStyle from '../ProductStyle/ProductStyle'

function TabmenuProducts() {
  return (
    <>
      <div className="tabmenu-products container">
        <TitleStyle>
          محصولات ما
        </TitleStyle>
        <div className="products">
          <ProductStyle />
          <ProductStyle />
          <ProductStyle />
        </div>
      </div>
    </>
  )
}

export default TabmenuProducts