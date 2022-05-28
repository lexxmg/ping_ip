
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TABLE_ROUTE} from '../utils/consts';
import Registration from '../pages/registration/Registration';
import Auth from '../pages/auth/Auth';
import Admin from '../pages/admin/Admin';
import Table from '../pages/table/Table';

const AppRouter = ({
  login, isAuth, ip, setIp,
  registrationToken, getRegistrationToken,
  registration, sort, sorted, setSorted, setIpApi,
  uploadFile, ping, searchIp, setIpVerity, ipVerity, getDate,
  getUsers, users, editMode, deleteUser, editUser, user, editOff, currentScroll,
  setCurrentScrol }) => {

  return (
    <Routes>
      {isAuth &&
        <Route path={ADMIN_ROUTE}
          element={
            <Admin
              getRegistrationToken={getRegistrationToken}
              registrationToken={registrationToken}
              uploadFile={uploadFile}
              ip={ip}
              setIp={setIp}
              getDate={getDate}
              getUsers={getUsers}
              users={users}
              editMode={editMode}
              deleteUser={deleteUser}
              editUser={editUser}
            />
          }
          exact
        />
      }

      <Route path={LOGIN_ROUTE} element={<Auth login={login} />} exact/>

      <Route path={REGISTRATION_ROUTE} element={<Registration registration={registration} />} exact/>

      {isAuth && <Route path={TABLE_ROUTE}
        element={
          <Table
            ip={ip}
            editOff={editOff}
            ping={ping}
            user={user}
            setIp={setIp}
            setIpApi={setIpApi}
            sort={sort}
            sorted={sorted}
            setSorted={setSorted}
            searchIp={searchIp}
            ipVerity={ipVerity}
            setIpVerity={setIpVerity}
            getDate={getDate}
            currentScroll={currentScroll}
            setCurrentScrol={setCurrentScrol}
          />} exact/>}

      <Route path="*" element={<Navigate to={isAuth ? TABLE_ROUTE : LOGIN_ROUTE} />} />
    </Routes>
  )
}

export default AppRouter;
