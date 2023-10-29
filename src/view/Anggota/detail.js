import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Stack,
  Grid
} from "@mui/material"; 

import QRCode from 'qrcode.react';



const DetailAnggotaPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleDownloadQR = () => {
    const qrCodeCanvas = document.querySelector('canvas');
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeCanvas.toDataURL();
    downloadLink.download = `qrcode-${data.nama}.png`;
    downloadLink.click();
  };


  useEffect(() => {
    handleGetBuku();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetBuku = () => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get(`http://localhost:5000/api/anggota/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  };

  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Detail Data Anggota</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <Grid container>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                value={data.no_induk}
                label="Nomer Induk"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"5px 10px",
                }}
              />
              <TextField
                variant="outlined"
                value={data.nama}
                label="Nama Anggota"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                variant="outlined"
                value={data.no_hp}
                label="Nomer Handphone"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                variant="outlined"
                value={data.alamat}
                label="Alamat Anggota"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                variant="outlined"
                value={data.email}
                label="Email Anggota"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <QRCode 
                value={data.no_induk} 
                size={300}
              />

              <Button
                variant={"contained"}
                color="primary"
                style={{ fontWeight: "bold", width: "300px" , marginTop: "50px" }}
                onClick={() => handleDownloadQR()}
              >
                Download QR Code
              </Button>

              <Button
                variant={"contained"}
                color="primary"
                style={{ fontWeight: "bold", width: "300px" , marginTop: "10px" }}
                onClick={() => navigate("/anggota")}
              >
                Kembali
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </MerchantLayout>
  );
}

export default DetailAnggotaPage;
