import React, { useState, useEffect } from 'react';

import axios from 'axios';

const Two = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from PostgreSQL</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Two;
