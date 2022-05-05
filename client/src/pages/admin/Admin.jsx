
import './admin.css';
import React from 'react';

const Admin = ({getRegistration, linkRegistration}) => {
  return (
    <div className="admin-container">
      <button onClick={getRegistration}>Получить ссыдку на регестрацию</button>

      <p>{`localhost:3000/registration?key=${linkRegistration.split('=')[1]}`}</p>
    </div>
  )
}

export default Admin;
