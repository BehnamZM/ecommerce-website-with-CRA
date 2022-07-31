import React from 'react'
import './Searchbox.css'
import { VscClose } from 'react-icons/vsc'

function Searchbox(props) {
  const showHandler = () => {
    props.click()
  }
  return (
    <>
      <div className={props.show ? 'searchbox searchbox-show' : 'searchbox'}>
        <div className="close-searchbox" onClick={showHandler}>
          <VscClose className='close-searchbox-icon'/>
        </div>
        <div className="search-body">
          <h3>به دنبال هر چی هستی در کادر زیر سرچ کن...</h3>
          <input type="text" className='search-input' placeholder='تایپ کن...' />
        </div>
      </div>
    </>
  )
}

export default Searchbox