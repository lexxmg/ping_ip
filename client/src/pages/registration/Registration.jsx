
import './registration.css';
import React from 'react';

const Registration = () => {
  const reg = () => {
    fetch(`http://localhost:5000/api/registration${window.location.search}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  return (
    <div className="registration-container">

      <button onClick={reg}>reg</button>
    </div>
  )
}

export default Registration;
