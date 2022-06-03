
import React, { useState, useLayoutEffect } from 'react';
import './table.css';
import { useFormik } from 'formik';
import CheckBox from '../../components/UI/CheckBox/CheckBox';
import Button from '../../components/UI/Button/Button';
import UpButton from '../../components/UI/UpButton/UpButton';

const Table = ({ip, setIp, ping, sort, sorted, setSorted, setIpApi,
  searchIp, setIpVerity, ipVerity, getDate, user, editOff, currentScroll,
  setCurrentScrol
}) => {
  const [searchScroll, setSearchScroll] = useState(0);
  const [on, setOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [cardStatState, setCardStatState] = useState({
    visible: false,
    event: null,
    manager: '',
    dateEdit: '',
    wasActiveDate: ''
  });

  const [cardIpState, setCardIpState] = useState({
    visible: false,
    event: null,
    gateway: '',
    mask: '',
    ip: ''
  });

  const search = (value) => {
    searchIp(value);
    setSearchValue(value);
  }

  const resetSearch = () => {
    searchIp('').then(() => {
      if (searchScroll === 0) {
        window.scrollTo(0, currentScroll);
      } else {
        window.scrollTo(0, searchScroll);
      }  
    });

    setSearchValue('');
  }

  useLayoutEffect(() => {
    window.scrollTo(0, currentScroll);

    resetSearch();

    return () => {
      setCurrentScrol(window.scrollY);
    }
  }, [currentScroll, setCurrentScrol]);

  const contextMenu = (e) => {
    e.preventDefault();

    setSearchScroll(window.scrollY);

    const text = e.target.innerText;

    setSearchValue(text);
    searchIp(text);
  }

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

    if (on) {
      return ping ? bgG : (wasActivePing && !ping) ? bgR : bgY;
    }

    return {backgroundColor: ''}
  }

  //<form className="" id='formTable' onSubmit={formik.handleSubmit}></form>

  return (
    <div className="table-padding-container">
      <UpButton onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}></UpButton>

      <div className="table__container table__container--is-fixed">


        <table className="table">
          <thead className="tablr__thead tablr__thead--is-fixed">
            <tr className="tablr__tr">
              <td className="tablr__tr-top" colSpan="8">
                <div className="tible__top tible__top--is-fixed">
                  <CheckBox className="table__checkbox" onChange={(e) => setOn(e.target.checked)}></CheckBox>

                  <div className="table__search-container table-search-container">
                    <button
                      className={
                        searchValue
                        ? "table-search-container__reset table-search-container__reset--active"
                        : "table-search-container__reset"
                      }
                      onClick={resetSearch} aria-label="сброс">
                    </button>

                    <input className="table__search" type="text" placeholder="Поиск" value={searchValue} onChange={e => search(e.target.value)} />
                  </div>

                  <Button className="table__btn" onClick={ping}>ping</Button>
                </div>
              </td>
            </tr>

            <tr className="tablr__tr">
              <th className={sorted === 'asc' ? 'tablr__th tablr__th--arrow tablr__th--arrow-down' : 'tablr__th tablr__th--arrow'} onClick={() => {toggleSort('id')}}>ip</th>
              <th className={sorted === 'asc' ? 'tablr__th tablr__th--arrow tablr__th--arrow-down' : 'tablr__th tablr__th--arrow'} onClick={() => {toggleSort('sw')}}>Свитч</th>
              <th className={sorted === 'asc' ? 'tablr__th tablr__th--arrow tablr__th--arrow-down' : 'tablr__th tablr__th--arrow'} onClick={() => {toggleSort('port')}}>Порт</th>
              <th className="tablr__th">Комната</th>
              <th className={sorted === 'asc' ? 'tablr__th tablr__th--arrow tablr__th--arrow-down' : 'tablr__th tablr__th--arrow'} onClick={() => {toggleSort('name')}}>Пользователь</th>
              <th className={sorted === 'asc' ? 'tablr__th tablr__th--arrow tablr__th--arrow-down' : 'tablr__th tablr__th--arrow'} onClick={() => {toggleSort('speed')}}>Скорость</th>
              <th className="tablr__th">Вкл/выкл</th>
              <th className={sorted === 'asc' ? 'tablr__th tablr__th--arrow tablr__th--arrow-down' : 'tablr__th tablr__th--arrow'} onClick={() => {toggleSort('wasActivePing')}}>ping</th>
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
                    editOff={editOff}
                    getStylePing={getStylePing}
                    setIpVerity={setIpVerity}
                    ipVerity={ipVerity}
                    setCardStatState={setCardStatState}
                    getDate={getDate}
                  />
                )
              } else {
                return (
                   <tr
                    className={item.edit ? 'table__tr table__tr--edit' : 'table__tr'}
                    key={item.id}
                    onClick={ user.role !== 'USER' ? () => editOn(item.id) : () => console.log('Нет доступа!')}
                  >
                    <td className="tablr__td"
                      style={getStylePing(item.ping, item.wasActivePing, on)}
                      onMouseEnter={(e) => {
                        setCardIpState({
                          visible: true,
                          event: e,
                          gateway: item.gateway,
                          mask: item.mask,
                          ip: item.ip
                        })
                      }}
                      onMouseLeave={(e) => {
                        setCardIpState({
                          visible: false,
                          event: null,
                          gateway: '',
                          mask: '',
                          ip: ''
                        })
                      }}
                    >{item.ip}</td>
                    <td className="tablr__td tablr__td--sw"
                      style={getStylePing(item.ping, item.wasActivePing, on)}
                      onContextMenu={contextMenu}
                    >{item.sw}
                    </td>
                    <td
                      className="tablr__td tablr__td--port"
                      style={getStylePing(item.ping, item.wasActivePing, on)}
                    >{(item.port === 0 || item.port === null) ? '' : item.port}
                    </td>
                    <td className="tablr__td tablr__td--office" style={getStylePing(item.ping, item.wasActivePing, on)}>{item.office}</td>
                    <td className="tablr__td" style={getStylePing(item.ping, item.wasActivePing, on)}>{item.name}</td>
                    <td className="tablr__td tablr__td--speed">{item.speed}</td>
                    <td className="tablr__td tablr__td--on-off">
                      <Circle active={item.active} mode="active"></Circle>
                    </td>
                    <td className="tablr__td">
                      <Circle
                        ping={item.ping}
                        wasActivePing={item.wasActivePing}
                        getStylePing={getStylePing}
                        mode="ping"
                        item={item}
                        setCardStatState={setCardStatState}
                        getDate={getDate}
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

        {cardStatState.visible && <CardStat data={{...cardStatState}}></CardStat>}
        {cardIpState.visible && <CardIp data={{...cardIpState}}></CardIp>}
      </div>
    </div>
  )
}

function Tr({ item, setIp, ip, setIpApi, getStylePing, setIpVerity, ipVerity, setCardStatState, getDate, editOff}) {
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
        })
      );

      setIpVerity(ipVerity.map(obg => {
        if (obg.id === item.id) return {...obg, ...values};
          return obg;
        })
      );

      setIpApi(item.id, values);

      //console.log('submit');
    }
  });

  return (
    <tr
      className={item.edit ? 'table__tr table__tr--edit' : 'table__tr'}
      onBlur={() => formik.handleSubmit()}
      onKeyUp={e => {
        if (e.keyCode === 27) {
          //formik.handleSubmit().then(() => console.log(33));
          editOff();
        }
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
      <td className="tablr__td tablr__td--on-off">
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
        <Circle ping={item.ping} item={item} wasActivePing={item.wasActivePing} getStylePing={getStylePing} setCardStatState={setCardStatState} getDate={getDate} mode="ping"></Circle>
      </td>
    </tr>
  )
}

function Circle({ active, ping, wasActivePing, mode, item, getStylePing, setCardStatState, getDate }) {
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
            setCardStatState({
              visible: true,
              event: e,
              manager: item.manager,
              dateEdit: item.dateEdit,
              wasActiveDate: item.wasActiveDate,
              currentDete: getDate()
            })
          }}
          onMouseLeave={(e) => {
            setCardStatState({
              visible: false,
              event: null,
              manager: '',
              dateEdit: '',
              wasActiveDate: ''
            })
          }}
        ></div>
      </div>
    )
  }
}

function CardStat({data}) {
  const h = window.innerHeight;
  const x = data.event.clientX;
  let y = data.event.clientY;
  const delta = 120;

  if ( h - (y + delta) <= 0 ) {
    y = y - delta;
  }

  return (
    <div className="card-stat" style={{position: 'fixed', top: y + 'px', left: (x - 350) + 'px'}}>
      <div className="card-stat__item card-stat-item">
        <span className="card-stat-item__title">Текущая дата:</span>
        <span className="card-stat-item__text">{data.currentDete}</span>
      </div>

      <div className="card-stat__item card-stat-item">
        <span className="card-stat-item__title">Был активен:</span>
        <span className="card-stat-item__text">{data.wasActiveDate || 'Не пингуется'}</span>
      </div>

      <div className="card-stat__item card-stat-item">
        <span className="card-stat-item__title">Редактировал:</span>
        <span className="card-stat-item__text">{data.manager || 'Не редактировался'}</span>
      </div>

      <div className="card-stat__item card-stat-item">
        <span className="card-stat-item__title">Редактировалось:</span>
        <span className="card-stat-item__text">{data.dateEdit || 'Не редактировался'}</span>
      </div>
    </div>
  )
}

function CardIp({data}) {
  const h = window.innerHeight;
  const x = data.event.clientX;
  let y = data.event.clientY;
  const delta = 100;

  if ( h - (y + delta) <= 0 ) {
    y = y - delta;
  }

  return (
    <div className="card-ip" style={{position: 'fixed', top: y + 'px', left: (x + 50) + 'px'}}>
      <div className="card-ip__item card-ip-item">
        <span className="card-ip-item__title">IP-адрес:</span>
        <span className="card-ip-item__text">{data.ip || 'Неизвестно'}</span>
      </div>

      <div className="card-ip__item card-ip-item">
        <span className="card-ip-item__title">Маска:</span>
        <span className="card-ip-item__text">{data.mask || 'Неизвестно'}</span>
      </div>

      <div className="card-ip__item card-ip-item">
        <span className="card-ip-item__title">Шлюз:</span>
        <span className="card-ip-item__text">{data.gateway || 'Неизвестно'}</span>
      </div>
    </div>
  )
}

export default Table;
