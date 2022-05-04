
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import Registration from '../pages/registration/Registration';
import Auth from '../pages/auth/Auth';
import Admin from '../pages/admin/Admin';

const AppRouter = ({auth}) => {
  const isAuth = false;

  return (
    <Routes>
      {isAuth && <Route path={ADMIN_ROUTE} element={<Admin />} exact/>}

      <Route path={LOGIN_ROUTE} element={<Auth auth={auth} />} exact/>

      <Route path={REGISTRATION_ROUTE} element={<Registration />} exact/>

      <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  )
}

export default AppRouter;
