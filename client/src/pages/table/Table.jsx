
import React from 'react';
import './table.css';
import { useFormik } from 'formik';

const Table = ({ip, setIp, ping, sort, sorted, setSorted, setIpApi}) => {
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
        <thead className="tablr__thead">
          <tr className="tablr__tr">
            <th className="tablr__th" onClick={() => {toggleSort('id')}}>ip</th>
            <th className="tablr__th" onClick={() => {toggleSort('sw')}}>Свитч</th>
            <th className="tablr__th">Порт</th>
            <th className="tablr__th">Комната</th>
            <th className="tablr__th" onClick={() => {toggleSort('name')}}>Пользователь</th>
            <th className="tablr__th" onClick={() => {toggleSort('speed')}}>Скорость</th>
            <th className="tablr__th">Вкл/выкл</th>
            <th className="tablr__th">Был активен</th>
          </tr>
        </thead>

        <tbody>
        {
          ip.map(item => {
            if (item.edit) {
              return (
                <Tr key={item.id} item={{...item}} setIpApi={setIpApi} setIp={setIp} ip={ip}/>
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
                  <td className="tablr__td tablr__td--sw">{item.sw}</td>
                  <td className="tablr__td tablr__td--port">{item.port}</td>
                  <td className="tablr__td tablr__td--office">{item.office}</td>
                  <td className="tablr__td">{item.name}</td>
                  <td className="tablr__td tablr__td--speed">{item.speed}</td>
                  <td className="tablr__td" style={item.active ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>{item.active}</td>
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

function Tr({ item, setIp, ip, setIpApi}) {
  const formik = useFormik({
    initialValues: {
      id: item.id,
      name: item.name || '',
      sw: item.sw || '',
      port: item.port || '',
      speed: item.speed || '',
      office: item.office || '',
      active: item.active
    },
    onSubmit: values => {
      values.active ? values.active = true : values.active = false;

      setIp(ip.map(obg => {
        if (obg.id === item.id) return {...obg, ...values};
        return obg;
      }));

      setIpApi(item.id, values);
      console.log(values);
    }
  });

  return (
    <tr
      className={item.edit ? 'table__tr table__tr--edit' : 'table__tr'}
      onBlur={() => {
        formik.handleSubmit();
      }}
    >

      <td className="tablr__td">{item.ip}</td>
      <td className="tablr__td tablr__td--sw">
        <input className="table__input"
          form="formTable"
          name="sw"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.sw}
          />
      </td>
      <td className="tablr__td tablr__td--port">
        <input className="table__input"
          form="formTable"
          name="port"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.port}
        />
      </td>
      <td className="tablr__td tablr__td--office">
        <input className="table__input"
          form="formTable"
          name="office"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.office}
        />
      </td>
      <td className="tablr__td">
        <input className="table__input"
          form="formTable"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          />
      </td>
      <td className="tablr__td tablr__td--speed">
        <input className="table__input"
          form="formTable"
          name="speed"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.speed}
        />
      </td>
      <td className="tablr__td">
        <input className="table__input"
          form="formTable"
          name="active"
          type="checkBox"
          onChange={(e) => {
            formik.handleChange(e);
            formik.handleSubmit();
          }}
          checked={formik.values.active}
        />
      </td>
      <td className="tablr__td">{item.wasActiveDate}</td>
    </tr>
  )
}

export default Table;
