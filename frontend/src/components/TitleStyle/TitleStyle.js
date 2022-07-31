import React from 'react'
import './TitleStyle.css'

function TitleStyle({ children }) {
  return (
    <>
      <div className="main-title">
        <h2 className="title-style">
          {children}
        </h2>
      </div>
    </>
  )
}

export default TitleStyle