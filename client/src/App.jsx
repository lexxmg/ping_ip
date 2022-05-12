
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, TABLE_ROUTE } from './utils/consts';
import AppRouter from './components/AppRouter';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import { auth, check, getLinkRegistration, addUser, ipApi, setIpApi, pingApi, uploadIpApi } from './API/api';
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

  async function registration(name, password) {
    addUser(name, password).then(data => {
      if (!data.message) {
        console.log(data);
        setUser(data);
        setIsAuth(true);
        navigate(TABLE_ROUTE);
      }
    }).finally(() => setLoading(false));
  }

  function getRegistrationToken() {
    getLinkRegistration().then(data => {
      if (!data.message) {
        console.log(data);
        setRegistrationToken(data.token);
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

  if (loading) {
    return <Preloader/>
  }


  return (
    <div className="">
      {isAuth && <Header user={user} logout={logout}/>}

      <AppRouter
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
        setIpVerity={setIpVerity}
      />
    </div>
  );
}

export default App;


//<Upload handleFiles={handleFiles} upload={upload} ipTest={ipTest}/>

//<Table ip={ip} ping={ping} sort={sort} sorted={sorted} setSorted={setSorted}/>
