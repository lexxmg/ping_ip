
import classes from './uiButton.module.css';
import React, {useState} from 'react';

const Button = ({children, className, ...props}) => {
  return (
    <button {...props} className={`${classes.btn} ${className}`}>
      {children}
    </button>
  )
}

export default Button;
