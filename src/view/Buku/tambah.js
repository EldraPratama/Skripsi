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

const TambahBukuPage = () => {
  const navigate = useNavigate();
  const [kode_buku, setKode_buku] = useState("");
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun_terbit, setTahun_terbit] = useState(0);
  const [harga_buku, setHarga_buku] = useState(0);
  const [stok_buku, setStok_buku] = useState(0);
  const [kategori, setKategori] = useState("");
  const [rak_buku, setRak_buku] = useState("");
  const [edisi, setEdisi] = useState("");


  const canAddBuku = () => {
    if( kode_buku === "" || 
      judul === "" || 
      penulis === "" || 
      penerbit === "" || 
      tahun_terbit === 0 || 
      harga_buku === 0 || 
      stok_buku === 0 ||
      kategori === "" ||
      rak_buku === "" ||
      edisi === "" 
    ){
      toast.warning("Silahkan lengkapi dulu data")
      return false
    }
    return true
  }

  const handleAddBuku = () => {
    let body = {
      kode_buku: kode_buku,
      judul: judul,
      penulis: penulis,
      penerbit: penerbit,
      tahun_terbit: Number(tahun_terbit),
      harga_buku: Number(harga_buku),
      stok_buku: Number(stok_buku),
      kategori: kategori,
      rak_buku: rak_buku,
      edisi: edisi,
    }

    axios.post('http://localhost:5000/api/buku', body)
    .then((response) => {
      toast.success("Berhasil menambah Buku")
      setTimeout(() => {
        navigate("/buku")
      }, 1500);
    })
    .catch((error) => {
      toast.error("Gagal Menambah Buku, check lagi data")
      console.error('Error add data', error);
    });
  }


  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Tambah Data Buku</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <TextField 
            label="Kode Buku"
            onChange={(e) => setKode_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"5px 10px",
            }}
          />
          <TextField 
            label="Judul Buku"
            onChange={(e) => setJudul(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Penulis Buku"
            onChange={(e) => setPenulis(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Penerbit Buku"
            onChange={(e) => setPenerbit(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Tahun Terbit"
            onChange={(e) => setTahun_terbit(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Harga Buku"
            onChange={(e) => setHarga_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Stok Buku"
            onChange={(e) => setStok_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Kategori Buku"
            onChange={(e) => setKategori(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Rak Buku"
            onChange={(e) => setRak_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            label="Edisi"
            onChange={(e) => setEdisi(e.target.value)}
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
              onClick={() => canAddBuku() ? handleAddBuku() : null}
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
