import React, { useState } from 'react'
import './Dropdown.css'
import dropMainImg from '../../assets/sanseveria (1).jpg'
import dropImg1 from '../../assets/sanseveria (1).jpg'
import dropImg2 from '../../assets/pot1.jpg'
import dropImg3 from '../../assets/tools.jpg'
import dropImg4 from '../../assets/Poisons-fertilizers.jpg'

import { Link } from 'react-router-dom'

function Dropdown(props) {
  const [dropImg, setDropImg] = useState(dropMainImg)


  const hiddenMenuHandler = () => {
    props.hidden()
  }

  return (
    <div className={props.show1 && props.show2 ? 'dropdown-list hover show-submenu' : props.show1 && !props.show2 ? 'dropdown-list hover' :!props.show1 && props.show2 ? 'dropdown-list show-submenu' : 'dropdown-list'}>
      <ul
        onMouseEnter={() => setDropImg(dropImg1)}>
        <h3>گیاهان آپارتمانی</h3>
        <li
          className='dropdown-item'
          onClick={hiddenMenuHandler}
        >
          <Link

            to='/search/?query=سانسوریا'
            className='dropdown-link'>سانسوریا</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=بنجامین'
            className='dropdown-link'>بنجامین</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search'
            className='dropdown-link'>یوکا</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=آدنیوم'
            className='dropdown-link'>آدنیوم</Link>
        </li>
      </ul>
      <ul
        onMouseEnter={() => setDropImg(dropImg3)}>
        <h3>لوازم کشاورزی</h3>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=بیلچه'
            className='dropdown-link'>بیلچه</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=سمپاش'
            className='dropdown-link'>سمپاش</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search'
            className='dropdown-link'>چاقو</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=گلدان'
            className='dropdown-link'>گلدان</Link>
        </li>
      </ul>
      <ul
        onMouseEnter={() => setDropImg(dropImg4)}>
        <h3>کودها و سموم</h3>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=npk'
            className='dropdown-link'>کود npk</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=قارچکش'
            className='dropdown-link'>قارچکش</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search'
            className='dropdown-link'>حشره کش</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=ورمی کمپوست'
            className='dropdown-link'>ورمی کمپوست</Link>
        </li>
      </ul>
      <ul
        onMouseEnter={() => setDropImg(dropImg2)}>
        <h3>انواع گلدان</h3>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=گلدان فلزی'
            className='dropdown-link'>گلدان فلزی</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=گلدان آبی'
            className='dropdown-link'>گلدان آبی</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search/?query=گلدان سنگی'
            className='dropdown-link'>گلدان سنگی</Link>
        </li>
        <li
          onClick={hiddenMenuHandler}
          className='dropdown-item'>
          <Link
            to='/search'
            className='dropdown-link'>گلدان پلاستیکی</Link>
        </li>
      </ul>
      <div
        className='dropdown-img'>
        <img
          src={dropImg}
          alt="" />
      </div>
    </div>
  )
}

export default Dropdown