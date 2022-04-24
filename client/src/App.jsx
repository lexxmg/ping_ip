
import React, { useState, useEffect } from 'react';
import Table from './components/Table/Table';
import 'normalize.css';
import './app.css';


function App() {
  const [ip, setIp] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/ip')
      .then(res => res.json())
      .then(data => setIp(data));

      console.log('useEffect');
  }, []);

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

  return (
    <div className="">
      <Table ip={ip} ping={ping}/>
    </div>
  );
}

export default App;
