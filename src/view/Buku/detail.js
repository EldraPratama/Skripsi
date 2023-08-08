import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";

import axios from 'axios';
import {
  Box,
} from "@mui/material"; 

const DetailBukuPage = () => {
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
      <Box sx={styles.boxStyled}>
        <div>
          <h2>Detail Data Buku</h2>

        </div>

      </Box>
    </MerchantLayout>
  );
}

export default DetailBukuPage;
