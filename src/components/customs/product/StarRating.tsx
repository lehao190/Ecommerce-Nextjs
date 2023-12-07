'use client';

import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

type Props = {
  starRating?: number;
}

const StarRating = ({ starRating }: Props) => {
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log(value, index)

  return (
    <div style={{
      direction: 'ltr',
      fontFamily: 'sans-serif',
      touchAction: 'none'
    }}>
      <Rating
        size={20}
        readonly={true}
        initialValue={starRating ?? 0}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        allowHover={false}
        SVGstyle={{ display: 'inline' }}
      />
    </div>
  )
}

export default StarRating;
