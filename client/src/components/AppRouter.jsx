
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TABLE_ROUTE} from '../utils/consts';
import Registration from '../pages/registration/Registration';
import Auth from '../pages/auth/Auth';
import Admin from '../pages/admin/Admin';
import Table from '../pages/table/Table';

const AppRouter = ({ login, isAuth, ip, registrationToken, getRegistrationToken }) => {
  return (
    <Routes>
      {isAuth &&
        <Route path={ADMIN_ROUTE}
          element={
            <Admin
              getRegistrationToken={getRegistrationToken}
              registrationToken={registrationToken}
            />
          }
          exact
        />
      }

      <Route path={LOGIN_ROUTE} element={<Auth login={login} />} exact/>

      <Route path={REGISTRATION_ROUTE} element={<Registration />} exact/>

      {isAuth && <Route path={TABLE_ROUTE} element={<Table ip={ip}/>} exact/>}

      <Route path="*" element={<Navigate to={isAuth ? TABLE_ROUTE : LOGIN_ROUTE} />} />
    </Routes>
  )
}

export default AppRouter;
