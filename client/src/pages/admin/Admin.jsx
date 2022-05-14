
import './admin.css';
import React, { useEffect } from 'react';
import { CSVLink } from "react-csv";

const Admin = ({getRegistrationToken, registrationToken, uploadFile, ip, setIp, getDate}) => {
  const host = document.location.origin;

  useEffect(() => {
    setIp( ip.map( item => ({...item, ping: false}) ) );
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
    </div>
  )
}

export default Admin;
