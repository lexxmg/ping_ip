
import React, { useState } from 'react';
import './table.css';
import { useFormik } from 'formik';
import CheckBox from '../../components/UI/CheckBox/CheckBox';
import Button from '../../components/UI/Button/Button';

const Table = ({ip, setIp, ping, sort, sorted, setSorted, setIpApi, searchIp, setIpVerity}) => {
  const [on, setOn] = useState(false);

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

  const getStylePing = (ping, wasActivePing, on = true) => {
    const bgR = {
      backgroundColor: '#FC4645'
    }

    const bgG = {
      backgroundColor: '#22BC29'
    }

    const bgY = {
      backgroundColor: '#fedb25'
    }

    const bg = {
      backgroundColor: 'white'
    }

    if (on) {
      return ping ? bgG : (wasActivePing && !ping) ? bgY : bgR;
    }

    return {backgroundColor: ''}
  }

  //<form className="" id='formTable' onSubmit={formik.handleSubmit}></form>

  return (
    <div className="table__container" onClick={e => {
      if (e.target.className === 'table__container') editOff();
    }}>
      <div className="tible__top">
        <CheckBox className="table__checkbox" onChange={(e) => setOn(e.target.checked)}></CheckBox>

        <input className="table__search" type="text" placeholder="Поиск" onChange={e => searchIp(e.target.value)} />

        <Button className="table__btn" onClick={ping}>ping</Button>
      </div>

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
            <th className="tablr__th" onClick={() => {toggleSort('wasActivePing')}}>ping</th>
          </tr>
        </thead>

        <tbody>
        {
          ip.map(item => {
            if (item.edit) {
              return (
                <Tr
                  key={item.id}
                  item={{...item}}
                  setIpApi={setIpApi}
                  setIp={setIp}
                  ip={ip}
                  getStylePing={getStylePing}
                  setIpVerity={setIpVerity}
                />
              )
            } else {
              return (
                 <tr
                  className={item.edit ? 'table__tr table__tr--edit' : 'table__tr'}
                  key={item.id}
                  onClick={() => editOn(item.id)}
                >
                  <td className="tablr__td" style={getStylePing(item.ping, item.wasActivePing, on)}>{item.ip}</td>
                  <td className="tablr__td tablr__td--sw" style={getStylePing(item.ping, item.wasActivePing, on)}>{item.sw}</td>
                  <td className="tablr__td tablr__td--port" style={getStylePing(item.ping, item.wasActivePing, on)}>{item.port}</td>
                  <td className="tablr__td tablr__td--office" style={getStylePing(item.ping, item.wasActivePing, on)}>{item.office}</td>
                  <td className="tablr__td" style={getStylePing(item.ping, item.wasActivePing, on)}>{item.name}</td>
                  <td className="tablr__td tablr__td--speed">{item.speed}</td>
                  <td className="tablr__td">
                    <Circle active={item.active} mode="active"></Circle>
                  </td>
                  <td className="tablr__td">
                    <Circle
                      ping={item.ping}
                      wasActivePing={item.wasActivePing}
                      getStylePing={getStylePing}
                      mode="ping"
                      item={item}
                    >
                    </Circle>
                  </td>
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

function Tr({ item, setIp, ip, setIpApi, getStylePing, setIpVerity}) {
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

      const newIp = ip.map(obg => {
        if (obg.id === item.id) return {...obg, ...values};
        return obg;
      });

      setIp(newIp);

      //setIpVerity(newIp);

      setIpApi(item.id, values);
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
        <input className="table__input table__input--check"
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
      <td className="tablr__td">
        <Circle ping={item.ping} wasActivePing={item.wasActivePing} getStylePing={getStylePing} mode="ping"></Circle>
      </td>
    </tr>
  )
}

function Circle({ active, ping, wasActivePing, mode, item, getStylePing }) {
  const bgR = {
    backgroundColor: '#FC4645'
  }

  const bgG = {
    backgroundColor: '#22BC29'
  }

  if (mode === 'active') {
    return (
      <div className="circle">
        <div className="circle__item"
          style={active ? bgG : bgR}
        ></div>
      </div>
    )
  }

  if (mode === 'ping') {
    return (
      <div className="circle">
        <div className="circle__item"
          style={getStylePing(ping, wasActivePing)}
          onMouseEnter={(e) => {
            console.log(`Был активен: ${item.wasActiveDate}, Редактировал: ${item.manager} ${item.dateEdit}`);
            console.log(e.target.getBoundingClientRect());
          }}
          onMouseLeave={(e) => console.log(`Скрыть`)}
        ></div>
      </div>
    )
  }
}

export default Table;
