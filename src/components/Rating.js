import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function RatingComponent({handleRating}) {
 


  return (
    <div className='App'>
      <Rating
        onClick={handleRating}
        /* Available Props */
      />
    </div>
  )
}