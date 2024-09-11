'use client'
import React from 'react';

export const hydration = (starter, flour, water) => {
  const half = starter/2;
  const percent = (half+water)/(half+flour);
  const hydrationArr = [];

  hydrationArr.push(
  {
    key: "1",
    hydration: (percent*100).toFixed(2),
  });

//   console.log('Percentage Example:', hydrationArr[0].hydration);
  return hydrationArr;
};

export const ingredients = () => {
    
};