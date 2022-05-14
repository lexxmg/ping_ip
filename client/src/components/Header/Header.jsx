
import React from 'react';
import './header.css';
import { ADMIN_ROUTE, TABLE_ROUTE } from '../../utils/consts';
import { NavLink } from 'react-router-dom';
import Button from '../UI/Button/Button';

const Preloader = ({user, logout}) => {
  return (
    <header className="header">
      <div className="header__left-inner">
        {user.role !== 'USER' && <Nav />}
      </div>

      <div className="header__right-inner">
        <span className="header__user">{user.user}</span>

        <Button className="header__btn" onClick={logout}>Выход</Button>
      </div>
    </header>
  )
}

function Nav() {
  return (
    <nav className="header__nav header-nav">
      <NavLink className="header-nav__link" to={ADMIN_ROUTE} >Администрирование</NavLink>
      <NavLink className="header-nav__link" to={TABLE_ROUTE} >Таблица</NavLink>
    </nav>
  )
}
export default Preloader;
