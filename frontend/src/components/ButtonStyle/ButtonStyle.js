import React from 'react'
import './ButtonStyle.css'

function ButtonStyle({children}) {
  return (
    <button className='button-style'>
      {children}
    </button>
  )
}

export default ButtonStyle