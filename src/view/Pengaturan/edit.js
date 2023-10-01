import React, { useState, useEffect } from 'react';
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

const EditPengaturanPage = () => {
  const navigate = useNavigate();
  const [denda, setDenda] = useState(0);
  const [max_pinjam, setMax_pinjam] = useState(0);

  useEffect(() => {
    handleGetPengaturan();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memanggil endpoint di server backend untuk mendapatkan data
  const handleGetPengaturan = () => {
    axios.get(`http://localhost:5000/api/pengaturan`)
      .then((response) => {
        const data = response.data[0]
        setDenda(data.denda);
        setMax_pinjam(data.max_pinjam);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }


  const canUpdatePengaturan = () => {
    if( denda === 0 || 
      max_pinjam === ""
    ){
      toast.warning("Silahkan lengkapi dulu data")
      return false
    }
    return true
  }

  const handleUpdatePengaturan = () => {
    let body = {
      denda: denda,
      max_pinjam: max_pinjam,
    }

    axios.put(`http://localhost:5000/api/pengaturan`, body)
    .then((response) => {
      toast.success("Berhasil mengupdate Pengaturan")
      setTimeout(() => {
        navigate("/pengaturan")
      }, 1500);
    })
    .catch((error) => {
      toast.error("Gagal Mengupdate Pengaturan, check lagi data")
      console.error('Error update data', error);
    });
  }



  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Pengaturan</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Jumlah Denda(Per hari)"
            value={denda}
            type='number'
            onChange={(e) => setDenda(e.target.value)}
            sx={{
              width:"450px",
              margin:"5px 10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Maksimal Peminjaman(hari)"
            value={max_pinjam}
            onChange={(e) => setMax_pinjam(e.target.value)}
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
              onClick={() => canUpdatePengaturan() ? handleUpdatePengaturan() : null}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Box>
    </MerchantLayout>
  );
}

export default EditPengaturanPage;
