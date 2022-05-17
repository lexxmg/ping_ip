
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, TABLE_ROUTE } from './utils/consts';
import AppRouter from './components/AppRouter';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import { auth, check, getLinkRegistration, addUser, ipApi, setIpApi, pingApi, uploadIpApi, getUsersApi, deleteUsersApi } from './API/api';
//import Table from './components/Table/Table';
//import Upload from './components/Upload/Upload';
import 'normalize.css';
import './app.css';


function App() {
  const [ip, setIp] = useState([]);
  const [ipVerity, setIpVerity] = useState([]);
  const [sorted, setSorted] = useState('asc');
  const [ipTest, setipTest] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [registrationToken, setRegistrationToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    check().then(data => {
      if (!data.message) {
        setUser(data);
        setIsAuth(true);
        navigate(TABLE_ROUTE);
        getIp();
        return;
      }
    }).finally(() => setLoading(false));
  }, []);

  async function login(name, password) {
    auth(name, password).then(data => {
      if (!data.message) {
        console.log(data);
        setUser(data);
        setIsAuth(true);
        navigate(TABLE_ROUTE);
        getIp();
        return;
      }
    }).finally(() => setLoading(false));
  }

  async function getUsers() {
    if (user.role === 'ADMIN') {
      getUsersApi().then(data => {
        if (!data.message) {
          console.log(data);
          setUsers(data);
          return;
        }
      }).finally(() => setLoading(false));
    } else {
      setUsers([]);
    }
  }

  async function deleteUser(id) {
    setUsers( users.filter(item => item.id !== id) );
    deleteUsersApi(id).then(data => {
      console.log(data);
    });
  }

  async function registration(name, password) {
    addUser(name, password).then(data => {
      if (!data.message) {
        console.log(data);
        setUser(data);
        setIsAuth(true);
        getIp();
        navigate(TABLE_ROUTE);
      }
    }).finally(() => setLoading(false));
  }

  function getRegistrationToken() {
    const host = document.location.origin;

    getLinkRegistration().then(data => {
      if (!data.message) {
        setRegistrationToken(`${host}/#/registration?key=${data.token}`);
      }
    });
  }

  function logout() {
    setIsAuth(false);
    localStorage.removeItem('token');
    setIp([]);
    navigate(LOGIN_ROUTE);
  }

  async function getIp() {
    setLoading(true);

    ipApi()
      .then(ip => {
        setIp(ip);
        setIpVerity(ip);
      }).finally(() => setLoading(false));
  }

  function ping() {
    setLoading(true);

    pingApi().then(data => {
        data.sort(function(a, b) {
          const sort = 'id';

          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;

          return 0 // Никакой сортировки
        });

        setIp(data);
        setIpVerity(data);
      }).finally(() => setLoading(false));
  }

  function sort(name, sort = 'asc') {
    const sortIp = [...ip];

    sortIp.sort(function(a, b) {
      if (sort === 'asc') {
        if (a[name] < b[name]) return -1;
        if (a[name] > b[name]) return 1;
      }

      if (sort === 'desc') {
        if (a[name] < b[name]) return 1;
        if (a[name] > b[name]) return -1;
      }

      return 0 // Никакой сортировки
    });

    setIp(sortIp);
  }

  function searchIp(search) {
    setIp(ipVerity.filter(item => {
      const ip = item.ip.toLowerCase().search( search.toLowerCase() );
      const name = item.name.toLowerCase().search( search.toLowerCase() );

      if ( ip >= 0 || name >= 0 ) {
        return true;
      }
      return false;
    }));
  }

  function uploadFile(event) {
    setLoading(true);

    uploadIpApi(event).then(data => {
      setIp(data);
      navigate(TABLE_ROUTE);
    }).finally(() => setLoading(false));
  }

  function getDate() {
    const date = new Date();
    const day = (date.getDate() >= 10) ? date.getDate() : '0' + date.getDate();
    const month = (date.getMonth() >= 9) ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = (date.getHours() >= 10) ? date.getHours() : '0' + date.getHours();
    const minutes = (date.getMinutes() >= 10) ? date.getMinutes() : '0' + date.getMinutes();
    const seconds = (date.getSeconds() >= 10) ? date.getSeconds() : '0' + date.getSeconds();

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  if (loading) {
    return <Preloader/>
  }


  return (
    <div className="">
      {isAuth && <Header user={user} logout={logout}/>}

      <AppRouter
        getDate={getDate}
        login={login}
        isAuth={isAuth}
        ip={ip}
        ping={ping}
        setIp={setIp}
        setIpApi={setIpApi}
        getRegistrationToken={getRegistrationToken}
        registrationToken={registrationToken}
        registration={registration}
        sort={sort}
        sorted={sorted}
        setSorted={setSorted}
        uploadFile={uploadFile}
        searchIp={searchIp}
        ipVerity={ipVerity}
        setIpVerity={setIpVerity}
        getUsers={getUsers}
        users={users}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;


//<Upload handleFiles={handleFiles} upload={upload} ipTest={ipTest}/>

//<Table ip={ip} ping={ping} sort={sort} sorted={sorted} setSorted={setSorted}/>
