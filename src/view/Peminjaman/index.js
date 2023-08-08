import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import axios from 'axios';

const Testing = () => {
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
    <MerchantLayout>
      <div>
        <h1>Data Peminjaman</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.password}</li>
          ))}
        </ul>
      </div>
    </MerchantLayout>
  );
}

export default Testing;
