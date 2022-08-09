import React from 'react'
import Shimmer from './Shimmer'
import SkeletonStyle from './SkeletonStyle'

function SkeletonProduct() {
  return (
    <div className='skeleton-wrapper'>
      <div className='skeleton-product'>
        <SkeletonStyle type='image' />
        <SkeletonStyle type='text' />
        <SkeletonStyle type='text' />
        <SkeletonStyle type='text' />
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonProduct