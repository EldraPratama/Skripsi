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

const TambahBukuPage = () => {
  const navigate = useNavigate();
  const [kode_buku, setKode_buku] = useState("");
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun_terbit, setTahun_terbit] = useState(0);
  const [harga_buku, setHarga_buku] = useState(0);
  const [stok_buku, setStok_buku] = useState(0);


  const handleAddBuku = () => {
    let body = {
      kode_buku: kode_buku,
      judul: judul,
      penulis: penulis,
      penerbit: penerbit,
      tahun_terbit: Number(tahun_terbit),
      harga_buku: Number(harga_buku),
      stok_buku: Number(stok_buku),
    }

    axios.post('http://localhost:5000/api/buku', body)
    .then((response) => {
      console.log("sukses")
      navigate("/buku")
    })
    .catch((error) => {
      console.error('Error add data', error);
    });
  }


  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Tambah Data Buku</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Kode Buku"
            onChange={(e) => setKode_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"5px 10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Judul Buku"
            onChange={(e) => setJudul(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Penulis Buku"
            onChange={(e) => setPenulis(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Penerbit Buku"
            onChange={(e) => setPenerbit(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Tahun Terbit"
            onChange={(e) => setTahun_terbit(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Harga Buku"
            onChange={(e) => setHarga_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            label="Stok Buku"
            onChange={(e) => setStok_buku(e.target.value)}
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
              onClick={() => navigate("/buku")}
            >
              Kembali
            </Button>
            <Button
              variant={"contained"}
              color="success"
              style={{ fontWeight: "bold" }}
              onClick={() => handleAddBuku()}
            >
              Tambah
            </Button>
          </Stack>
        </Stack>
      </Box>
    </MerchantLayout>
  );
}

export default TambahBukuPage;
