import React, { useState } from 'react'
import './Searchbox.css'
import { VscClose } from 'react-icons/vsc'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Searchbox(props) {
  const showHandler = () => {
    props.click()
  }
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    navigate(query ? `/search/?query=${query}` : '/search')
    props.click()
  }


  return (
    <>
      <div
        className={props.show ? 'searchbox searchbox-show' : 'searchbox'}>
        <div
          className="close-searchbox"
          onClick={showHandler}>
          <VscClose
            className='close-searchbox-icon' />
        </div>
        <div
          className="search-body">
          <h3>به دنبال هر چی هستی در کادر زیر سرچ کن...</h3>
          <form
            onSubmit={submitHandler}>
            <input
              type="text"
              className='search-input'
              placeholder='تایپ کن...'
              onChange={(e) => setQuery(e.target.value)} />
            <button
              type='submit' className='search-in-products-icon'>
              <BsSearch />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Searchbox