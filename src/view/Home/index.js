import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import axios from 'axios';
import styles from "../Layout/styles";

import {
  Box,
  Grid
} from "@mui/material"; 

const Testing = () => {
  const [data, setData] = useState([]);

  const handleGetHome = () => {
    axios.get('http://localhost:5000/api/home')
      .then((response) => {
        console.log(response)
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  // Memanggil endpoint di server backend untuk mendapatkan data
  useEffect(() => {
    handleGetHome()
  }, []);

  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>

      <div>
        <h1>Informasi Umum</h1>
      </div>
      <Grid container spacing={3} width="100%" marginTop={5}>
        <Grid item xs={6}>
          <Box  bgcolor={"greenyellow"} padding={"20px 35px"} boxShadow="10px" borderRadius={"5px 55px"}>
            <h3>Jumlah Buku </h3>
            <h1>{data.jumlah_buku}</h1>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box  bgcolor={"orange"} padding={"20px 35px"} borderRadius={"55px 5px"}>
            <h3>Jumlah Anggota </h3>
            <h1>{data.jumlah_anggota}</h1>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} width="100%" marginTop={5}>
        <Grid item xs={6}>
          <Box  bgcolor={"cyan"} padding={"20px 35px"} borderRadius={"55px 5px"}>
            <h3>Total Peminjaman </h3>
            <h1>{data.jumlah_peminjaman}</h1>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box  bgcolor={"yellow"} padding={"20px 35px"} borderRadius={"5px 55px"}>
            <h3>Total Denda </h3>
            <h1>Rp. {data.jumlah_denda}</h1>
          </Box>
        </Grid>
      </Grid>

      </Box>
    </MerchantLayout>
  );
}

export default Testing;
