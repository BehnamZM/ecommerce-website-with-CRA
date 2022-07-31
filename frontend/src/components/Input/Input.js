import React from 'react'
import './Input.css'

function Input(props) {

  let inputElement = null

  switch (props.inputType) {
    case 'input':
      inputElement = <input className='input-element' {...props} />
    case 'texterea':
      inputElement = <textarea className='input-element' {...props}/>
    default:
      inputElement = <input className='input-element' {...props} />

  }
  return (
    <>
      {inputElement}
    </>
  )
}

export default Input