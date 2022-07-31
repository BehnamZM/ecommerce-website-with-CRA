import React, { useState } from 'react'
import './Dropdown.css'
import dropMainImg from '../../assets/sanseveria (1).jpg'
import dropImg1 from '../../assets/sanseveria (1).jpg'
import dropImg2 from '../../assets/sanseveria (2).jpg'
import dropImg3 from '../../assets/sanseveria (5).jpg'
import dropImg4 from '../../assets/sanseveria (6).jpg'
import dropImg5 from '../../assets/sanseveria (7).jpg'
import dropImg6 from '../../assets/sanseveria(8).png'
import dropImg7 from '../../assets/benjamin1.jpg'
import dropImg8 from '../../assets/benjamin2.png'
import dropImg9 from '../../assets/adeniom.jpg'
import dropImg10 from '../../assets/sanseveria (1).jpg'
import dropImg11 from '../../assets/sanseveria (2).jpg'
import dropImg12 from '../../assets/sanseveria (5).jpg'

function Dropdown(props) {
  const [dropImg, setDropImg] = useState(dropMainImg)


  return (
    <div className={props.show ? 'dropdown-list show-submenu hover' : 'dropdown-list'} >
      <ul>
        <h3>گیاهان آپارتمانی</h3>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg1)}><a href="" className='dropdown-link'>سانسوریا</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg2)}><a href="" className='dropdown-link'>بنجامین</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg3)}><a href="" className='dropdown-link'>یوکا</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg4)}><a href="" className='dropdown-link'>آدنیوم</a></li>
      </ul>
      <ul>
        <h3>لوازم کشاورزی</h3>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg5)}><a href="" className='dropdown-link'>بیلچه</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg6)}><a href="" className='dropdown-link'>سمپاش</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg7)}><a href="" className='dropdown-link'>چاقو</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg8)}><a href="" className='dropdown-link'>گلدان</a></li>
      </ul>
      <ul>
        <h3>کودها و سموم</h3>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg9)}><a href="" className='dropdown-link'>کود npk</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg10)}><a href="" className='dropdown-link'>قارچکش</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg11)}><a href="" className='dropdown-link'>حشره کش</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg(dropImg12)}><a href="" className='dropdown-link'>ورمی کمپوست</a></li>
      </ul>
      <ul>
        <h3>انواع خاک</h3>
        <li className='dropdown-item' onMouseEnter={() => setDropImg('/src/assets/sanseveria (7).jpg')}><a href="" className='dropdown-link'>پرلیت</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg('/src/assets/sanseveria (1).jpg')}><a href="" className='dropdown-link'>کوکوپیت</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg('/src/assets/sanseveria (2).jpg')}><a href="" className='dropdown-link'>خاک باغچه</a></li>
        <li className='dropdown-item' onMouseEnter={() => setDropImg('/src/assets/sanseveria (7).jpg')}><a href="" className='dropdown-link'>خاک رس</a></li>
      </ul>
      <div className='dropdown-img'>
        <img src={dropImg} alt="" />
      </div>
    </div>
  )
}

export default Dropdown