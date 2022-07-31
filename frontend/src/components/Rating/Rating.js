import React from 'react'
import './Rating.css'
import { MdStarRate } from 'react-icons/md'
import { MdStarOutline } from 'react-icons/md'
import { MdStarHalf } from 'react-icons/md'

function Rating({ rating }) {
  return (
    <>
      <span>
        {
          rating >= 5 ? <MdStarRate /> :
            rating >= 4.5 ? < MdStarHalf /> :
              <MdStarOutline />
        }
      </span>
      <span>
        {
          rating >= 4 ? <MdStarRate /> :
            rating >= 3.5 ? < MdStarHalf /> :
              <MdStarOutline />
        }
      </span>
      <span>
        {
          rating >= 3 ? <MdStarRate /> :
            rating >= 2.5 ? < MdStarHalf /> :
              <MdStarOutline />
        }
      </span>
      <span>
        {
          rating >= 2 ? <MdStarRate /> :
            rating >= 1.5 ? < MdStarHalf /> :
              < MdStarOutline />
        }
      </span>
      <span>
        {
          rating >= 1 ? <MdStarRate /> :
            rating >= 0.5 ? <MdStarHalf /> :
              <MdStarOutline />
        }
      </span>

    </>
  )
}

export default Rating