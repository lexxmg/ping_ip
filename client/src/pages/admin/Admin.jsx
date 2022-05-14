
import './admin.css';
import React, { useEffect } from 'react';
import { CSVLink } from "react-csv";

const Admin = ({getRegistrationToken, registrationToken,
  uploadFile, ip, setIp, getDate, getUsers, users }) => {
  const host = document.location.origin;

  useEffect(() => {
    setIp( ip.map( item => ({...item, ping: false}) ) );
    getUsers();
  }, []);

  return (
    <div className="admin-container">
      <button onClick={getRegistrationToken}>Получить ссыдку на регестрацию</button>

      <p>{`${host}/registration?key=${registrationToken}`}</p>

      <input type="file" accept=".csv" onChange={uploadFile}/>

      <CSVLink
        className=""
        data={ip}
        enclosingCharacter={``}
        separator={";"}
        filename={`ip_table_${getDate().split(' ')[0]}.csv`}
        target="_blank"
      >
        Скачть CSV файл
      </CSVLink>

      <ul>
        {users.map(item => {
          return (
            <li key={item.id}>
              <span>{item.user}:</span>
              <span>{item.role}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Admin;
