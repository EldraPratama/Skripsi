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

const EditBukuPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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


  useEffect(() => {
    handleGetBuku();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetBuku = () => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get(`http://localhost:5000/api/buku/${id}`)
      .then((response) => {
        const data = response.data
        setKode_buku(data.kode_buku);
        setJudul(data.judul);
        setPenulis(data.penulis);
        setPenerbit(data.penerbit);
        setTahun_terbit(data.tahun_terbit);
        setHarga_buku(data.harga_buku);
        setStok_buku(data.stok_buku);
        setKategori(data.kategori);
        setRak_buku(data.rak_buku);
        setEdisi(data.edisi);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  const canUpdateBuku = () => {
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

  const handleUpdateBuku = () => {
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

    axios.put(`http://localhost:5000/api/buku/${id}`, body)
    .then((response) => {
      toast.success("Berhasil mengupdate Buku")
      setTimeout(() => {
        navigate("/buku")
      }, 1500);
    })
    .catch((error) => {
      toast.error("Gagal Mengupdate Buku, check lagi data")
      console.error('Error update data', error);
    });
  }



  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Edit Data Buku</h3>
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} marginTop={"30px"}>
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Kode Buku"
            value={kode_buku}
            onChange={(e) => setKode_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"5px 10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Judul Buku"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Penulis Buku"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Penerbit Buku"
            value={penerbit}
            onChange={(e) => setPenerbit(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Tahun Terbit"
            value={tahun_terbit}
            onChange={(e) => setTahun_terbit(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Harga Buku"
            value={harga_buku}
            onChange={(e) => setHarga_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Stok Buku"
            value={stok_buku}
            onChange={(e) => setStok_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField 
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Rak Buku"
            value={rak_buku}
            onChange={(e) => setRak_buku(e.target.value)}
            sx={{
              width:"450px",
              margin:"10px",
            }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}             
            variant="outlined"
            label="Edisi"
            value={edisi}
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
              onClick={() => canUpdateBuku() ? handleUpdateBuku() : null}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Box>
    </MerchantLayout>
  );
}

export default EditBukuPage;
