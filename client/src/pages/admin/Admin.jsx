
import './admin.css';
import React from 'react';
import { CSVLink } from "react-csv";

const Admin = ({getRegistrationToken, registrationToken, uploadFile, ip}) => {
  return (
    <div className="admin-container">
      <button onClick={getRegistrationToken}>Получить ссыдку на регестрацию</button>

      <p>{`localhost:3000/registration?key=${registrationToken}`}</p>

      <input type="file" accept=".csv" onChange={uploadFile}/>

      <CSVLink
        data={ip}
        enclosingCharacter={``}
        separator={";"}
        filename={"my-file.csv"}
        className=""
        target="_blank"
      >
        Download me
      </CSVLink>
    </div>
  )
}

export default Admin;
