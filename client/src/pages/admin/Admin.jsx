
import './admin.css';
import React from 'react';

const Admin = ({getRegistrationToken, registrationToken, uploadFile}) => {
  return (
    <div className="admin-container">
      <button onClick={getRegistrationToken}>Получить ссыдку на регестрацию</button>

      <p>{`localhost:3000/registration?key=${registrationToken}`}</p>

      <input type="file" accept=".csv" onChange={uploadFile}/>
    </div>
  )
}

export default Admin;
