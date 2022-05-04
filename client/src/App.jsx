
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Api from './API/api';
//import Table from './components/Table/Table';
//import Upload from './components/Upload/Upload';
import 'normalize.css';
import './app.css';


function App() {
  const [ip, setIp] = useState([]);
  const [sorted, setSorted] = useState('asc');
  const [ipTest, setipTest] = useState([]);

  useEffect(() => {
    //auth('lexx', '123');

    Api.check().then(res => console.log(res));
  }, []);

  async function auth(name, password) {
    try {
      const response = await Api.auth(name, password);

      localStorage.setItem('token', response.token);
      console.log(jwt_decode(response.token));

      return response;
    } catch (e) {
      //console.log(e);
      return e.response.data;
    }
  }

  function ping() {
    fetch('http://localhost:5000/api/ping')
      .then(res => res.json())
      .then(data => {
        data.sort(function(a, b) {
          const sort = 'id';

          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;

          return 0 // Никакой сортировки
        });

        setIp(data);
      });
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

  function handleFiles(files) {
    const result = [];

    const reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = function() {
      reader.result.split('\r').forEach((item, i) => {
        const el = item.split(';');

        result.push({tel: el[0], name: el[1]});
      });

      setipTest(result);
      //console.log(result);
    };
  }

  function upload(files) {
    let data = new FormData();
    //data.append(ip, files);
    data.append('test', 'test');

    console.log(data.test);

    fetch('http://localhost:5000/api/ip', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    body: data
  })
    .then(res => res.text())
    .then(data => console.log(data));
  }


  return (
    <div className="">
      <BrowserRouter>
        <AppRouter auth={auth} />
      </BrowserRouter>
    </div>
  );
}

export default App;


//<Upload handleFiles={handleFiles} upload={upload} ipTest={ipTest}/>

//<Table ip={ip} ping={ping} sort={sort} sorted={sorted} setSorted={setSorted}/>
