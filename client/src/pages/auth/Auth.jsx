
import './auth.css';
import React from 'react';
import { useFormik } from 'formik';

const Auth = ({ login }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    onSubmit: values => {
      login(values.name, values.password);
    }
  });

  return (
    <div className="auth-container">
      <h1 className="auth-container__title">Авторизация</h1>

      <form className="auth__form auth-form" onSubmit={formik.handleSubmit}>
        <label className="auth-form__label" htmlFor="firstName">Имя:</label>
        <input className="auth-form__input"
          id="firstName"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label className="auth-form__label" htmlFor="lastName">Пароль:</label>
        <input className="auth-form__input"
          id="lastName"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button className="auth-form__btn" type="submit">Отправить</button>
      </form>
    </div>
  )
}

export default Auth;
