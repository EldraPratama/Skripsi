import React, { useState } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


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
  const [email, setEmail] = useState("");

  const canAddAnggota = () => {
    if( no_induk === "" || 
      nama === "" || 
      no_hp === "" || 
      alamat === ""||
      alamat === "" 
    ){
      toast.warning("Silahkan lengkapi dulu data")
      return false
    }
    return true
  }

  const handleAddAnggota = () => {
    let body = {
      no_induk: no_induk,
      nama: nama,
      no_hp: no_hp,
      alamat: alamat,
      email: email,
    }

    axios.post('http://localhost:5000/api/anggota', body)
    .then((response) => {
      toast.success("Berhasil menambah Anggota")
      setTimeout(() => {
        navigate("/anggota")
      }, 1500);
    })
    .catch((error) => {
      toast.error("Gagal Menambah Anggota, check lagi data")
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
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
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
              onClick={() => canAddAnggota() ? handleAddAnggota() : null}
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
