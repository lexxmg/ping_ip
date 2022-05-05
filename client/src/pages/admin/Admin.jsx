
import './admin.css';
import React from 'react';

const Admin = ({getRegistrationToken, registrationToken}) => {
  return (
    <div className="admin-container">
      <button onClick={getRegistrationToken}>Получить ссыдку на регестрацию</button>

      <p>{`localhost:3000/registration?key=${registrationToken}`}</p>
    </div>
  )
}

export default Admin;
