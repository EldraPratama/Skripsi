import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from 'axios';
import {
  Box,
  TextField,
  Stack,
  Button
} from "@mui/material"; 

const EditAnggotaPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [no_induk, setNo_induk] = useState("");
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    handleGetAnggota();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memanggil endpoint di server backend untuk mendapatkan data
  const handleGetAnggota = () => {
    axios.get(`http://localhost:5000/api/anggota/${id}`)
      .then((response) => {
        const data = response.data
        setNo_induk(data.no_induk);
        setNama(data.nama);
        setNo_hp(data.no_hp);
        setAlamat(data.alamat);
        setEmail(data.email);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }


  const canUpdateAnggota = () => {
    if( no_induk === "" || 
      nama === "" || 
      no_hp === "" || 
      alamat === "" ||
      email === "" 
    ){
      toast.warning("Silahkan lengkapi dulu data")
      return false
    }
    return true
  }

  const handleUpdateAnggota = () => {
    let body = {
      no_induk: no_induk,
      nama: nama,
      no_hp: no_hp,
      alamat: alamat,
      email: email,
    }

    axios.put(`http://localhost:5000/api/anggota/${id}`, body)
    .then((response) => {
      toast.success("Berhasil mengupdate Anggota")
      setTimeout(() => {
        navigate("/anggota")
      }, 1500);
    })
    .catch((error) => {
      toast.error("Gagal Mengupdate Anggota, check lagi data")
      console.error('Error update data', error);
    });
  }



  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Edit Data Anggota</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Nomer induk"
            value={no_induk}
            type='number'
            onChange={(e) => setNo_induk(e.target.value)}
            sx={{
              width:"450px",
              margin:"5px 10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Nama Anggota"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Nomer Handphone"
            value={no_hp}
            type='number'
            onChange={(e) => setNo_hp(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Email"
            value={email}
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
              onClick={() => canUpdateAnggota() ? handleUpdateAnggota() : null}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Box>
    </MerchantLayout>
  );
}

export default EditAnggotaPage;
