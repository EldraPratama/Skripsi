import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer,toast } from "react-toastify";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow,
  TextField 
} from "@mui/material"; 

import {
  ZoomIn,
  Edit,
  Delete,
} from '@mui/icons-material';

import Confirmation from "../Component/confirmation.tsx"


const BukuPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [idBuku, setIdBuku] = useState("");

  useEffect(() => {
    handleGetBuku()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const columns = [
    { id: 'No', label: 'No', minWidth: 50 },
    { id: 'Judul', label: 'Judul', minWidth: 200 },
    { id: 'Penulis', label: 'Penulis', minWidth: 100 },
    { id: 'Kode', label: 'Kode Buku', minWidth: 100 },
    { id: 'Penerbit', label: 'Penerbit', minWidth: 100 },
    { id: 'Aksi', label: 'Aksi', minWidth: 150 },
  ];


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Memanggil endpoint di server backend untuk mendapatkan data
  const handleGetBuku = () => {
    axios.get(`http://localhost:5000/api/buku?search=${search}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  // Memanggil endpoint di server backend untuk menghapus data
  const handleDeleteBuku = (id) => {
    axios.delete(`http://localhost:5000/api/buku/${id}`)
      .then((response) => {
        toast.success("Berhasil menghapus Buku")
        handleGetBuku()
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }
  
  return (
    <MerchantLayout>
      <ToastContainer />
      <Confirmation
        title="Konfirmasi"
        titleStyle={{ fontWeight: "bold" }}
        description="Yakin mau menghapus buku?"
        open={konfirmasiHapus}
        handleClose={() => setKonfirmasiHapus(false)}
        handleConfirm={() => { 
          handleDeleteBuku(idBuku)
          setKonfirmasiHapus(false)
        }}
      />
      <Box sx={styles.boxStyled}>
        <h2>Data Buku</h2>
        <Stack direction={"row"} justifyContent={"space-between"} marginBottom={2}>
          <TextField 
            label="Cari"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width:"250px",marginTop:"20px"
            }}
          />
          <Button
            variant={"contained"}
            color="primary"
            style={{ fontWeight: "bold", borderRadius:"25px", marginTop:"20px" }}
            onClick={() => navigate("/buku/tambah")}
          >
            Tambah
          </Button>
        </Stack>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={"center"}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {row.judul}
                        </TableCell>
                        <TableCell align="center">
                          {row.penulis}
                        </TableCell>
                        <TableCell align="center">
                          {row.kode_buku}
                        </TableCell>
                        <TableCell align="center">
                          {row.penerbit}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton 
                            color="primary"
                            onClick={() => navigate(`/buku/detail/${row.id}`)}
                          >
                            <ZoomIn/>
                          </IconButton>                      
                          <IconButton 
                            color="success"
                            onClick={() => navigate(`/buku/edit/${row.id}`)}
                          >
                            <Edit/>
                          </IconButton>                      
                          <IconButton 
                            color="error"
                            onClick={() => {
                              setIdBuku(row.id)
                              setKonfirmasiHapus(true)
                            }}
                          >
                            <Delete/>
                          </IconButton>                      
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {data.length === 0 && 
                  <TableRow>
                    <TableCell align="center" colSpan={columns.length}>
                      <b>Data Tidak ditemukan</b>
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </MerchantLayout>
  );
}

export default BukuPage;
