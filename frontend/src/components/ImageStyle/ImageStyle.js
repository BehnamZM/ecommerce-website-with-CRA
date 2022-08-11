import React from 'react'
import './ImageStyle.css'
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle'
import { Link } from 'react-router-dom'

function ImageStyle(props) {
  return (

    <div className="img-container">
      <img src={props.src} alt="image" className="img-style" />
      <Link to={props.search}  className="absolute-btn">
        <ButtonStyle>
          خرید
        </ButtonStyle>
      </Link>
      <h4>{props.title1}</h4>
      <h2>{props.title2}</h2>
    </div>

  )
}

export default ImageStyle