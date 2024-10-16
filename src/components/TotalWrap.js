import React from 'react'
import Star from './Star'

const TotalWrap = ({ rating }) => {
  // Calculate full stars, half stars, and empty stars based on rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="total-wrap">
      <div className="star-row">
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} type="full" />
        ))}

        {/* Render half star if applicable */}
        {hasHalfStar && <Star type="half" />}

        {/* Render empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={index} type="empty" />
        ))}
      </div>
      <p className="rating-text">
        <b>{rating.toFixed(1)} out of 5</b>
      </p>
    </div>
  );
};

export default TotalWrap;
