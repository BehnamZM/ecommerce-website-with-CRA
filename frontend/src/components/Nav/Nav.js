import React, { useContext, useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FiUsers } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'
import { TiThMenuOutline } from 'react-icons/ti'
import { VscClose } from 'react-icons/vsc'
import { IoIosArrowDown } from 'react-icons/io'
import Dropdown from '../Dropdown/Dropdown'
import Searchbox from '../searchbox/Searchbox'
import SummeryshoppingCart from '../summeryshoppingCart/SummeryShoppingCart'
import logo from '../../assets/logo.png'
import { Store } from '../../Store'


function Nav() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  const [showNavbar, setShowNavbar] = useState(false)
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [showSubmenuMobile, setShowSubmenuMobile] = useState(false)
  const [showSearchbox, setShowSearchbox] = useState(false)
  const [showShoppingCart, setShowShoppingCart] = useState(false)
  const [navbar, setNavbar] = useState(false)
  const [showDropUser, setShowDropUser] = useState(false)
  const [showDropAdmin, setShowDropAdmin] = useState(false)


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingInfos')
    localStorage.removeItem('paymentMethod')
    setShowDropUser(false)
    window.location.href = '/signin'
  }

  const showNavbarHandler = () => {
    setShowNavbar(!showNavbar)
  }

  const showSubmenuHandler = () => {
    setShowSubmenu(true)
  }
  const hiddenSubmenuHandler = () => {
    setShowSubmenu(false)
  }

  const showSubmenuMobileHandler = () => {
    setShowSubmenuMobile(!showSubmenuMobile)
  }


  const showSearchboxHandler = () => {
    setShowSearchbox(!showSearchbox)
  }
  const showShoppingCardHandler = () => {
    setShowShoppingCart(!showShoppingCart)
  }

  const changeBackground = () => {
    if (window.scrollY >= 200) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  // const closeDropdownHandler = () => {
  //   setShowDropUser(false)
  //   setShowDropAdmin(false)
  // }

  window.addEventListener('scroll', changeBackground)
  // window.addEventListener('click', closeDropdownHandler)



  return (
    <>
      {
        navbar ? (
          <nav
            className={navbar ? 'fixed-nav' : ''}
            style={{ transition: "all .3s ease" }}>
            <div
              className="nav-part-one container">
              <div
                className="icons-part">
                <div
                  className="nav-icon menu-icon"
                  onClick={showNavbarHandler}>
                  <TiThMenuOutline
                    className='icon' />
                </div>
                <div
                  className="nav-icon shopping-icon"
                  onClick={showShoppingCardHandler}>
                  <HiOutlineShoppingBag
                    className='icon' />
                  <span>{cart.cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}</span>
                </div>

                {/* user control */}

                {
                  userInfo ? (
                    <div
                      className="user-control">

                      <div
                        className='user-controler'
                        onClick={() => setShowDropUser(!showDropUser)}>
                        {userInfo.name.slice(0, 1)}
                      </div>
                      <div
                        className={`${showDropUser ? 'user-dropdown-show' : ''} user-control-dropdown`}>
                        <ul>
                          <li
                            onClick={() => setShowDropUser(false)}>
                            <Link
                              to='/user-profile'
                              className='link'>پروفایل</Link>
                          </li>
                          <li
                            onClick={() => setShowDropUser(false)}>
                            <Link
                              to='/orders'
                              className='link'>سفارشات</Link>
                          </li>
                          <li
                            onClick={signoutHandler}>خروج</li>
                        </ul>
                      </div>
                    </div>) :
                    (<Link
                      to='/signin'>
                      <div
                        className="nav-icon user-icon">
                        <FiUsers
                          className='icon' />
                      </div>
                    </Link>)
                }

                {/* admin control */}

                {
                  userInfo && userInfo.isAdmin &&
                  <div
                    className="admin-control">

                    <div
                      className='admin-controler'
                      onClick={() => setShowDropAdmin(!showDropAdmin)}>
                      {userInfo.name.slice(0, 1)}
                    </div>
                    <div
                      className={`${showDropAdmin ? 'admin-dropdown-show' : ''} admin-control-dropdown`}>
                      <ul>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/dashboard'
                            className='link'>داشبورد مدیریت</Link>
                        </li>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/product-list'
                            className='link'>لیست محصولات</Link>
                        </li>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/users-list'
                            className='link'>لیست کاربران</Link>
                        </li>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/orders-list'
                            className='link'>لیست سفارشات</Link>
                        </li>
                        <li onClick={signoutHandler}>خروج</li>
                      </ul>
                    </div>
                  </div>
                }

                <div
                  className="nav-icon search-icon"
                  onClick={showSearchboxHandler}>
                  <BsSearch
                    className='icon' />
                </div>
              </div>

              <div
                className={showNavbar ? 'navbar show'
                  : 'navbar hidden'}>
                <VscClose
                  onClick={showNavbarHandler}
                  className="close-icon" />
                <ul>
                  <li
                    onClick={showNavbarHandler}>
                    <Link
                      to="/">خانه</Link>
                  </li>
                  <li
                    className='product-link'
                    onMouseEnter={showSubmenuHandler}
                    onMouseLeave={hiddenSubmenuHandler}>
                    <Link
                      onClick={showNavbarHandler}
                      to="/products"
                    >فروشگاه</Link>
                    
                    <IoIosArrowDown
                      className='submenu-icon'
                      onClick={showSubmenuMobileHandler} />

                    <Dropdown
                      className='dropdown'
                      show1={showSubmenu}
                      show2={showSubmenuMobile}
                      hidden={showNavbarHandler}
                    />
                  </li>
                  <li onClick={showNavbarHandler}>
                    <Link
                      to="/about"
                    >درباره ما</Link>
                  </li>
                  <li onClick={showNavbarHandler}>
                    <Link
                      to="/contact"
                    >ارتباط با ما</Link>
                  </li>
                </ul>
              </div>
              <div className="logo-part">
                <img src={logo} alt='logoImage' />
              </div>
            </div>
          </nav>
        ) : (





          <nav
            className={navbar ? 'fixed-nav' : ''}
            style={{ transition: "all .3s ease" }}>
            <div
              className="nav-part-one container">
              <div
                className="icons-part">
                <div
                  className="nav-icon menu-icon"
                  onClick={showNavbarHandler}>
                  <TiThMenuOutline className='icon' />
                </div>
                <div
                  className="nav-icon shopping-icon"
                  onClick={showShoppingCardHandler}>
                  <HiOutlineShoppingBag className='icon' />
                  <span>{cart.cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}</span>
                </div>
                {/* user control */}

                {
                  userInfo ? (
                    <div
                      className="user-control">

                      <div
                        className='user-controler'
                        onClick={() => setShowDropUser(!showDropUser)}>
                        {userInfo.name.slice(0, 1)}
                      </div>
                      <div
                        className={`${showDropUser ? 'user-dropdown-show' : ''} user-control-dropdown`}>
                        <ul>
                          <li
                            onClick={() => setShowDropUser(false)}>
                            <Link
                              to='/user-profile'
                              className='link'>پروفایل</Link>
                          </li>
                          <li
                            onClick={() => setShowDropUser(false)}>
                            <Link
                              to='/orders'
                              className='link'>سفارشات</Link>
                          </li>
                          <li
                            onClick={signoutHandler}>خروج</li>
                        </ul>
                      </div>
                    </div>) :
                    (<Link
                      to='/signin'>
                      <div
                        className="nav-icon user-icon">
                        <FiUsers
                          className='icon' />
                      </div>
                    </Link>)
                }

                {/* admin control */}

                {
                  userInfo && userInfo.isAdmin &&
                  <div
                    className="admin-control">

                    <div
                      className='admin-controler'
                      onClick={() => setShowDropAdmin(!showDropAdmin)}>
                      {userInfo.name.slice(0, 1)}
                    </div>
                    <div
                      className={`${showDropAdmin ? 'admin-dropdown-show' : ''} admin-control-dropdown`}>
                      <ul>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/dashboard'
                            className='link'>داشبورد مدیریت</Link>
                        </li>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/product-list'
                            className='link'>لیست محصولات</Link>
                        </li>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/users-list'
                            className='link'>لیست کاربران</Link>
                        </li>
                        <li
                          onClick={() => setShowDropAdmin(false)}>
                          <Link
                            to='/admin/orders-list'
                            className='link'>لیست سفارشات</Link>
                        </li>
                        <li onClick={signoutHandler}>خروج</li>
                      </ul>
                    </div>
                  </div>
                }
                <div
                  className="nav-icon search-icon"
                  onClick={showSearchboxHandler}>
                  <BsSearch className='icon' />
                </div>
              </div>
              <div
                className="logo-part">
                <img src={logo} alt='logoImage' />
              </div>
              <div
                className="call-with-us">
                <span>+98 9201236547</span>
                <FiPhoneCall
                  className="call-icon" />
              </div>
            </div>

            <div
              className={showNavbar ? 'navbar show'
                : 'navbar hidden'}>
              <VscClose onClick={showNavbarHandler}
                className="close-icon" />
              <ul>
                <li
                  onClick={showNavbarHandler}>
                  <Link
                    to="/"
                  >خانه</Link>

                </li>
                <li

                  className='product-link'
                  onMouseEnter={showSubmenuHandler}
                  onMouseLeave={hiddenSubmenuHandler}>
                  <Link
                    onClick={showNavbarHandler}
                    to="/products">فروشگاه</Link>
                  <IoIosArrowDown
                    className='submenu-icon'
                    onClick={showSubmenuMobileHandler} />

                  <Dropdown
                    className='dropdown'
                    show1={showSubmenu}
                    show2={showSubmenuMobile}
                    hidden={showNavbarHandler} />
                </li>
                <li onClick={showNavbarHandler}>
                  <Link
                    to="/about"
                  >درباره ما</Link>

                </li>
                <li onClick={showNavbarHandler}>
                  <Link
                    to="/contact"

                  >ارتباط با ما</Link>

                </li>
              </ul>
            </div>
          </nav>
        )
      }

      <Searchbox
        show={showSearchbox}
        click={showSearchboxHandler} />
      <SummeryshoppingCart
        show={showShoppingCart}
        click={showShoppingCardHandler} />
    </>
  )
}

export default Nav

