'use client'
import React from 'react';

export const ratioFill = (maxNum) => {
  const tempArr = [];
  
  for (let num=0; num < maxNum; num++)
  {
    tempArr.push( 
    {
      key: (num+1).toString(),
      label: (num+1).toString()
    });
  }
  // console.log('Generated array:', tempArr);
  return tempArr;
};
