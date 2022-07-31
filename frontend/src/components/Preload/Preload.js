import React from 'react'
import './Preload.css'
import preload from "../../assets/preload2.gif"

function Preload() {
  return (
    <div className="preload-box">
      <img src={preload} alt="" />
    </div>
  )
}

export default Preload