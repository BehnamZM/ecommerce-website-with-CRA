import React from 'react'
import './ImageStyle.css'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'

function ImageStyle(props) {
  return (

    <div className="img-container">
      <img src={props.src} alt="image" className="img-style" />
      <ButtonStyle className="absolute-btn">
        خرید
      </ButtonStyle>
      <h4>{props.title1}</h4>
      <h2>{props.title2}</h2>
    </div>

  )
}

export default ImageStyle