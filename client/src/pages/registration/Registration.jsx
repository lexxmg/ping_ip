
import './registration.css';
import React from 'react';
import { useFormik } from 'formik';

const Registration = ({ registration }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    onSubmit: values => {
      registration(values.name, values.password);
    }
  });

  return (
    <div className="registration-container">
      <h1 className="registration-container__title">Регестрация</h1>

      <form className="registration__form registration-form" onSubmit={formik.handleSubmit}>
        <label className="registration-form__label" htmlFor="firstName">Имя:</label>
        <input className="registration-form__input"
          id="firstName"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label className="registration-form__label" htmlFor="lastName">Пароль:</label>
        <input className="registration-form__input"
          id="lastName"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button className="registration-form__btn" type="submit">Отправить</button>
      </form>
    </div>
  )
}

export default Registration;
