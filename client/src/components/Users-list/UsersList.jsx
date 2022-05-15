
import React from 'react';
import './users-list.css';

const UsersList = ({ users, deleteUser }) => {
  return (
    <div className="users-list">
      {
        users.map(item => {
          return (
            <div className="users-list__card users-list-card" key={item.id}>
              <div className="users-list-card__body-container">
                <span className="users-list-card__user">{item.user}</span>
                <span className="users-list-card__role">{item.role}</span>
              </div>

              <div className="users-list-card__btn-container">
                <button className="users-list-card__btn">Редактировать</button>
                <button className="users-list-card__btn" onClick={() => deleteUser(item.id)}>Удалить</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersList;
