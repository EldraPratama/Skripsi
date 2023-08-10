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


const DetailBukuPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams()


  useEffect(() => {
    handleGetBuku();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetBuku = () => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get(`http://localhost:5000/api/buku/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Detail Data Buku</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <Grid container>
            <Grid item xs={7}>
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={data.kode_buku}
                label="Kode Buku"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"5px 10px",
                }}
              />
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={data.judul}
                label="Judul Buku"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={data.penulis}
                label="Penulis Buku"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={data.penerbit}
                label="Penerbit Buku"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={data.tahun_terbit}
                label="Tahun Terbit"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={data.harga_buku}
                label="Harga Buku"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={data.stok_buku}
                label="Stok Buku"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width:"500px",
                  margin:"10px",
                }}
              />
            </Grid>
            <Grid item xs={5}>

              <QRCode 
                value={data.kode_buku} 
                size={300}
              />

              <Button
                variant={"contained"}
                color="primary"
                style={{ fontWeight: "bold", width: "300px" , marginTop: "50px" }}
                onClick={() => navigate("/buku")}
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

export default DetailBukuPage;
