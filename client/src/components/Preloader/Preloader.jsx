
import React from 'react';
import './preloader.css';
import preloader from '../../img/Iphone-spinner-2.gif';

const Preloader = () => {
  return (
    <div className="preloader-container">
      <img className="preloader__img" src={preloader} alt="preloader"/>
    </div>
  )
}

export default Preloader;
