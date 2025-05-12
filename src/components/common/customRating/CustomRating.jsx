import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const CustomRating = ({ value }) => {
  const fullStars = Math.floor(value); // Full stars
  const halfStar = value % 1 >= 0.5 ? 1 : 0; // Check for half star
  const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} style={{ color: 'gold', marginRight: '4px' }} />
      ))}
      
      {/* Render half star if applicable */}
      {halfStar === 1 && <FaStarHalfAlt style={{ color: 'gold', marginRight: '4px' }} />}
      
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} style={{ color: 'gold', marginRight: '4px' }} />
      ))}
    </div>
  );
};

export default CustomRating;
