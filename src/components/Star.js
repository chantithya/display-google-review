import React from 'react'

const Star = ({ type }) => {
  if (type === 'full') {
    return (
      <svg width={24} height={22} viewBox="0 0 33 30" fill="none">
        <path
          d="M16.5 0l4.849 9.826 10.843 1.575-7.846 7.648 1.852 10.8-9.698-5.1-9.698 5.1 1.852-10.8-7.846-7.648L11.65 9.826 16.5 0z"
          fill="#FFCC48" // Full star color
        />
      </svg>
    );
  } else if (type === 'half') {
    return (
      <svg width={24} height={22} viewBox="0 0 33 30" fill="none">
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#FFCC48" />
            <stop offset="50%" stopColor="#ccc" />
          </linearGradient>
        </defs>
        <path
          d="M16.5 0l4.849 9.826 10.843 1.575-7.846 7.648 1.852 10.8-9.698-5.1-9.698 5.1 1.852-10.8-7.846-7.648L11.65 9.826 16.5 0z"
          fill="url(#halfGradient)" // Half star with gradient
        />
      </svg>
    );
  } else {
    return (
      <svg width={24} height={22} viewBox="0 0 33 30" fill="none">
        <path
          d="M16.5 0l4.849 9.826 10.843 1.575-7.846 7.648 1.852 10.8-9.698-5.1-9.698 5.1 1.852-10.8-7.846-7.648L11.65 9.826 16.5 0z"
          fill="#ccc" // Empty star color
        />
      </svg>
    );
  }
};

export default Star;
