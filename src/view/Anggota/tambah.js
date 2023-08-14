import React, { useState } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import { useNavigate } from "react-router-dom";


import axios from 'axios';
import {
  Box,
  TextField,
  Stack,
  Button
} from "@mui/material"; 

const TambahAnggotaPage = () => {
  const navigate = useNavigate();
  const [no_induk, setNo_induk] = useState("");
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [alamat, setAlamat] = useState("");


  const handleAddAnggota = () => {
    let body = {
      no_induk: no_induk,
      nama: nama,
      no_hp: no_hp,
      alamat: alamat,
    }

    axios.post('http://localhost:5000/api/anggota', body)
    .then((response) => {
      console.log("sukses")
      navigate("/anggota")
    })
    .catch((error) => {
      console.error('Error add data', error);
    });
  }



  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Tambah Data Anggota</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Nomer Induk"
            type='number'
            onChange={(e) => setNo_induk(e.target.value)}
            sx={{
              width:"450px",
              margin:"5px 10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Nama Anggota"
            onChange={(e) => setNama(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Nomer HP"
            type='number'
            onChange={(e) => setNo_hp(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Alamat"
            onChange={(e) => setAlamat(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <Stack direction="row" marginTop={"10px"}>
            <Button
              variant={"contained"}
              color="primary"
              style={{ fontWeight: "bold", marginRight: "260px" }}
              onClick={() => navigate("/anggota")}
            >
              Kembali
            </Button>
            <Button
              variant={"contained"}
              color="success"
              style={{ fontWeight: "bold" }}
              onClick={() => handleAddAnggota()}
            >
              Tambah
            </Button>
          </Stack>
        </Stack>
      </Box>
    </MerchantLayout>
  );
}

export default TambahAnggotaPage;
