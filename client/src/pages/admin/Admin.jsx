
import './admin.css';
import React, { useEffect } from 'react';
import { CSVLink } from "react-csv";

const Admin = ({getRegistrationToken, registrationToken, uploadFile, ip, setIp}) => {
  useEffect(() => {
    setIp( ip.map( item => ({...item, ping: false}) ) );
  }, []);

  return (
    <div className="admin-container">
      <button onClick={getRegistrationToken}>Получить ссыдку на регестрацию</button>

      <p>{`localhost:3000/registration?key=${registrationToken}`}</p>

      <input type="file" accept=".csv" onChange={uploadFile}/>

      <CSVLink
        className=""
        data={ip}
        enclosingCharacter={``}
        separator={";"}
        filename={"my-file.csv"}
        target="_blank"
      >
        Скачть CSV файл
      </CSVLink>
    </div>
  )
}

export default Admin;
