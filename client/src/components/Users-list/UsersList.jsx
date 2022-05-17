
import React, { useState } from 'react';
import './users-list.css';
import { useFormik } from 'formik';

const UsersList = ({ users, editMode, deleteUser, editUser }) => {
  const [userId, setUserId] = useState(0);

  const formik = useFormik({
    initialValues: {
      password: '',
      role: 'USER'
    },
    onSubmit: values => {
      editUser(userId, values.role, values.password);
    }
  });

  return (
    <div className="users-list">
      {
        users.map(item => {
          return (
            <div className="users-list__card users-list-card" key={item.id}>
            { !item.edit
              ?
              <div className="users-list-card__inner">
                <div className="users-list-card__body-container">
                  <span className="users-list-card__user">{item.user}</span>
                  <span className="users-list-card__role">{item.role}</span>
                </div>

                <div className="users-list-card__btn-container">
                  <button
                    className="users-list-card__btn"
                    onClick={() => {
                      editMode(item.id, true);
                      setUserId(item.id);
                    }}
                  >Редактировать
                  </button>

                  <button className="users-list-card__btn" onClick={() => deleteUser(item.id)}>Удалить</button>
                </div>
              </div>
              :
              <div className="users-list-edit-container">
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="role">Статус:</label>
                  <select
                    id="role"
                    name="role"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="USER" defaultValue>User</option>
                  </select>

                  <label htmlFor="password">Новый пароль:</label>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <button type="submit">Submit</button>
                </form>

                <button onClick={() => {editMode(item.id, false)}}>отмена</button>
              </div>
            }
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersList;
