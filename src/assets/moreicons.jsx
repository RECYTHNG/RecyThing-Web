import React from 'react';

const HorizontalDotsIcon = ({ color = '#444A6D', fillColor = '#444A6D', strokeWidth = 1.5 }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="12" r="2" stroke={color} strokeWidth={strokeWidth} fill={fillColor} />
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth={strokeWidth} fill={fillColor} />
    <circle cx="19" cy="12" r="2" stroke={color} strokeWidth={strokeWidth} fill={fillColor} />
  </svg>
);

export default HorizontalDotsIcon;
