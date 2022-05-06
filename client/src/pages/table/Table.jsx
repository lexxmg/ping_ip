
import React from 'react';
import './table.css';
import { useFormik } from 'formik';

const Table = ({ip, setIp, ping, sort, sorted, setSorted}) => {
  const toggleSort = (name) => {
    setSorted((sorted === 'asc') ? 'desc' : 'asc');
    sort(name, sorted);
  }

  const editOn = id => {
    const result = ip.map(item => {
      if (id === item.id) {
        return {...item, edit: true}
      }

      return {...item, edit: false}
    });

    setIp(result);
  }

  const editOff = () => {
    const result = ip.map(item => {
      return {...item, edit: false}
    });

    setIp(result);
  }

  //<form className="" id='formTable' onSubmit={formik.handleSubmit}></form>

  return (
    <div className="table__container" onClick={e => {
      if (e.target.className === 'table__container') editOff();
    }}>
      <button className="table__btn" onClick={ping}>ping</button>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => {toggleSort('id')}}>ip</th>
            <th onClick={() => {toggleSort('sw')}}>Свитч</th>
            <th onClick={() => {toggleSort('name')}}>Пользователь</th>
            <th onClick={() => {toggleSort('speed')}}>Скорость</th>
            <th>Был активен</th>
          </tr>
        </thead>

        <tbody>
        {
          ip.map(item => {
            if (item.edit) {
              return (
                <Tr key={item.id} item={{...item}}/>
              )
            } else {
              return (
                 <tr
                  className={item.edit ? 'table__tr table__tr--edit' : 'table__tr'}
                  key={item.id}
                  style={
                    item.ping
                    ? {backgroundColor: 'green'}
                    : (item.wasActivePing && !item.ping)
                    ? {backgroundColor: 'yellow'}
                    : {backgroundColor: 'white'}
                  }
                  onClick={() => editOn(item.id)}
                >
                  <td className="tablr__td">{item.ip}</td>
                  <td className="tablr__td">{item.sw}</td>
                  <td className="tablr__td">{item.name}</td>
                  <td className="tablr__td">{item.speed}</td>
                  <td className="tablr__td">{item.wasActiveDate}</td>
                </tr>
              )
            }
          })
        }
        </tbody>
      </table>
    </div>
  )
}

function Tr({ item }) {
  const formik = useFormik({
    initialValues: {
      name: item.name || '',
      sw: item.sw || ''
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <tr
      className={item.edit ? 'table__tr table__tr--edit' : 'table__tr'}
      onBlur={() => console.log('blur')}
    >

      <td className="tablr__td">{item.ip}</td>
      <td className="tablr__td" style={{width: '70px'}} >
        <input
          style={{width: '100%'}}
          form="formTable"
          name="sw"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.sw}
          />
      </td>
      <td className="tablr__td">
        <input
          style={{width: '100%'}}
          form="formTable"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          />
      </td>
      <td className="tablr__td">{item.speed}</td>
      <td className="tablr__td">{item.wasActiveDate}</td>
    </tr>
  )
}

export default Table;
