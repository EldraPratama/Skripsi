import React, { useState } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import { useNavigate } from "react-router-dom";

import { QrReader } from 'react-qr-reader';

// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from "react-toastify";


import axios from 'axios';
import {
  Box,
  TextField,
  Stack,
  Button,
  Grid
} from "@mui/material"; 

const TambahPeminjamanPage = () => {
  const navigate = useNavigate();

  // const [id_buku, setId_buku] = useState(0);
  // const [id_anggota, setId_anggota] = useState(0);
  const [judul_buku, setJudul_buku] = useState("");
  const [nama_peminjam, setNama_peminjam] = useState("");
  const [kode_buku, setKode_buku] = useState("");
  const [no_induk, setNo_induk] = useState("");
  // const [tgl_pinjam, setTgl_pinjam] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [tgl_pengembalian, setTgl_pengembalian] = useState("");

  // const [openScanBuku, setOpenScanBuku] = useState(false);
  // const [openScanAnggota, setOpenScanAnggota] = useState(false);
  // const [scanAnggota, setScanAnggota] = useState('');
  // const [scanBuku, setScanBuku] = useState('');

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const canAddPeminjaman = () => {
    if( no_induk === "" || 
      nama_peminjam === "" || 
      kode_buku === "" || 
      judul_buku === ""
    ){
      toast.warning("Silahkan lengkapi dulu data")
      return false
    }
    return true
  }

  const handleKurangiStok = () => {
    axios.put(`http://localhost:5000/api/buku/kurang/${kode_buku}`)
    .then((response) => {
      toast.success("Berhasil Menambah Data")
      setTimeout(() => {
        navigate("/peminjaman")
      }, 1500);
    })
    .catch((error) => {
      toast.error("Gagal Menambah Data")
      console.error('Error add data', error);
    });
  }

  const handleAddPeminjaman = () => {
    let body = {
      kode_buku: kode_buku,
      no_induk: no_induk,
      judul_buku: judul_buku,
      nama_peminjam: nama_peminjam,
      tgl_pinjam: new Date().toISOString().slice(0, 10),
      tgl_pengembalian: null,
      status: "Dipinjam",
      denda: 0,      
    }


    axios.post('http://localhost:5000/api/peminjaman', body)
    .then((response) => {
      toast.success("Berhasil Menambah Data")
      setTimeout(() => {
        handleKurangiStok()
        navigate("/peminjaman")
      }, 1500);
    })
    .catch((error) => {
      toast.error("Gagal Menambah Data")
      console.error('Error add data', error);
    });
  }

  // Memanggil endpoint untuk mendapatkan data anggota
  const handleGetBuku = (kode_buku) => {

    axios.get(`http://localhost:5000/api/scan/buku/${kode_buku}`)
    .then((response) => {
      let data = response.data[0]
      // setId_buku(data.id)
      setKode_buku(data.kode_buku)
      setJudul_buku(data.judul)
      toast.success("Berhasil scan data Buku")
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
  }

  // Memanggil endpoint untuk mendapatkan data anggota
  const handleGetAnggota = (no_induk) => {

    axios.get(`http://localhost:5000/api/scan/anggota/${no_induk}`)
    .then((response) => {
      let data = response.data[0]
      // setId_anggota(data.id)
      setNo_induk(data.no_induk)
      setNama_peminjam(data.nama)
      toast.success("Berhasil scan data Anggota")
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
  }

  const checkForLetter = (text) => {
    const regex = /[a-zA-Z]/; // Regex untuk mencari huruf
    const containLetter = regex.test(text);
    containLetter ? handleGetBuku(text) : handleGetAnggota(text); 
  };

  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Tambah Data Peminjaman</h3>
          <Stack direction="row" margin="20px 0 10px 0" justifyContent={"space-between"}>
            <Button
              variant={"contained"}
              color="primary"
              style={{ fontWeight: "bold", borderRadius:"25px", height:"35px"}}
              onClick={() => navigate("/peminjaman")}
            >
              Kembali
            </Button>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker 
                label="Pengembalian" 
                sx={{width:"250px", marginLeft:"-20px"}} 
                minDate={today}
                maxDate={nextWeek}
                onChange={(e) => setTgl_pengembalian(e)} 
              />
            </LocalizationProvider> */}
            <Button
              variant={"contained"}
              color="success"
              style={{ fontWeight: "bold", borderRadius:"25px", height:"35px" }}
              onClick={() => canAddPeminjaman() ? handleAddPeminjaman() : null}
            >
              Tambah
            </Button>
          </Stack>
          <Stack justifyContent={"center"}>
           
          </Stack>
          <Grid container justifyContent="center" alignItems="center" marginTop={"10px"} >
            <Grid item xs={6}>
              <TextField 
                label="No Induk"
                value={no_induk}
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"450px",
                  margin:"10px",
                }}
              />
              <TextField 
                label="Nama Peminjam"
                value={nama_peminjam}
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"450px",
                  margin:"10px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Kode Buku"
                value={kode_buku}
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"450px",
                  margin:"10px",
                }}
              />
              <TextField 
                label="Judul Buku"
                value={judul_buku}
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"450px",
                  margin:"10px",
                }}
              />
            </Grid>
          </Grid>
          <Box width="50%" marginLeft="25%" >
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  checkForLetter(result.text)
                  // if(id_buku === 0){
                  //   handleGetBuku(result.text)
                  // }
                }
              }}
              style={{ width: '100%' }}
            />
          </Box>
      </Box>
    </MerchantLayout>
  );
}

export default TambahPeminjamanPage;
