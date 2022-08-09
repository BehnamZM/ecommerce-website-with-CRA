import React from 'react'
import './SkeletonStyle.css'

function SkeletonStyle({type}) {
  return (
    <div className={`skeleton ${type}`}></div>
  )
}

export default SkeletonStyle