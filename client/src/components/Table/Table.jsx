
import React from 'react';
import './table.css';

const Table = ({ip, ping}) => {
  return (
    <div>
      <button onClick={ping}>ping</button>

      <table className="table">
        <thead>
          <tr>
            <th>ip</th>
            <th>Свитч</th>
            <th>Пользователь</th>
            <th>Статус</th>
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
