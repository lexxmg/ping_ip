
import classes from './uiCheckBox.module.css';
import React, {useState} from 'react';

const CheckBox = ({ className, ...props }) => {
  return (
    <div className={`${classes.container} ${className}`}>
      <label className={classes.label}>
        <input className={classes.input} type="checkbox" {...props} />

        <div className={classes.item}></div>
      </label>
    </div>
  )
}

export default CheckBox;
