
import classes from './uiUpButton.module.css';
import React, {useState} from 'react';

const UpButton = ({children, className, ...props}) => {
  return (
    <button {...props} className={`${classes.btn} ${className}`}>
      {children}
    </button>
  )
}

export default UpButton;
