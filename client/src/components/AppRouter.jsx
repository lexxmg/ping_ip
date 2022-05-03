
import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import Registration from '../pages/registration/Registration';
import Auth from '../pages/auth/Auth';
import Admin from '../pages/admin/Admin';

const AppRouter = () => {
  const isAuth = false;

  return (
    <Routes>
      {isAuth && <Route path={ADMIN_ROUTE} element={<Admin />} exact/>}

      <Route path={LOGIN_ROUTE} element={<Auth />} exact/>

      <Route path={REGISTRATION_ROUTE} element={<Registration />} exact/>
    </Routes>
  )
}

export default AppRouter;
