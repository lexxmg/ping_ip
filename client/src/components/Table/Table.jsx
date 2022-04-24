
import React from 'react';
import './table.css';

const Table = ({ip, ping, sort, sorted, setSorted}) => {
  const toggleSort = (name) => {
    setSorted((sorted === 'asc') ? 'desc' : 'asc');
    sort(name, sorted);
  }

  return (
    <div className="table__container">
      <button className="table__btn" onClick={ping}>ping</button>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => {toggleSort('id')}}>ip</th>
            <th onClick={() => {toggleSort('sw')}}>Свитч</th>
            <th onClick={() => {toggleSort('name')}}>Пользователь</th>
            <th onClick={() => {toggleSort('stat')}}>Статус</th>
            <th>Был активен</th>
          </tr>
        </thead>

        <tbody>
        {
          ip.map(item => {
            return (
              <tr
                className="table__tr"
                key={item.id}
                style={
                  item.stat
                  ? {backgroundColor: 'green'}
                  : (item.wasActive.stat && !item.stat)
                  ? {backgroundColor: 'yellow'}
                  : {backgroundColor: 'white'}
                }
              >
                <td className="tablr__td">{item.ip}</td>
                <td className="tablr__td">{item.sw || 'не известно'}</td>
                <td className="tablr__td">{item.name}</td>
                <td className="tablr__td">{item.description}</td>
                <td
                  className="tablr__td"

                  >{item.wasActive.date}
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default Table;
