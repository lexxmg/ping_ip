
import './admin.css';
import React, { useEffect } from 'react';
import { CSVLink } from "react-csv";
import UsersList from "../../components/Users-list/UsersList";

const Admin = ({getRegistrationToken, registrationToken,
  uploadFile, ip, setIp, getDate, getUsers, users, deleteUser }) => {

  useEffect(() => {
    setIp( ip.map( item => ({...item, ping: false}) ) );
    getUsers();
  }, []);

  return (
    <div className="admin-container fixed-container">
      <button onClick={getRegistrationToken}>Получить ссыдку на регестрацию</button>

      <span className="admin-container__reg-link">{registrationToken}</span>

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

      <div className="admin-container__user-list-container">
        <UsersList users={users} deleteUser={deleteUser}></UsersList>
      </div>
    </div>
  )
}

export default Admin;
