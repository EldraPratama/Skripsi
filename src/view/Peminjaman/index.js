import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow 
} from "@mui/material"; 

import {
  ZoomIn,
  Delete,
} from '@mui/icons-material';
import { format } from 'date-fns';




const PeminjamanPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { id: 'No', label: 'No', minWidth: 10 },
    { id: 'Judul buku', label: 'Judul Buku', minWidth: 100 },
    { id: 'Nama', label: 'Nama Peminjam', minWidth: 100 },
    { id: 'tgl pengembalian', label: 'Tgl Pengembalian', minWidth: 30 },
    { id: 'status', label: 'Status', minWidth: 50 },
    { id: 'proses', label: 'Proses', minWidth: 100 },
    { id: 'Aksi', label: 'Aksi', minWidth: 100 },
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

  useEffect(() => {
    handleGetPeminjaman()
  }, []);

  const handleGetPeminjaman = () => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get('http://localhost:5000/api/peminjaman')
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
  }

  // Memanggil endpoint di server backend untuk menghapus data
  const handleDeletePeminjaman = (id) => {
    axios.delete(`http://localhost:5000/api/peminjaman/${id}`)
      .then((response) => {
        handleGetPeminjaman()
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  // Memanggil endpoint di server backend untuk mengupdate data
  const handleUpdateStatus = (id, status) => {
    let body = {
      status: status,
      denda: 0,
    }

    axios.put(`http://localhost:5000/api/peminjaman/${id}`, body)
      .then((response) => {
        handleGetPeminjaman()
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <Stack direction={"row"} justifyContent={"space-between"} marginBottom={2}>
          <h3>Data Peminjaman</h3>
          <Button
            variant={"contained"}
            color="primary"
            style={{ fontWeight: "bold", borderRadius:"25px", marginTop:"30px" }}
            onClick={() => navigate("/peminjaman/tambah")}
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
                          {row.judul_buku}
                        </TableCell>
                        <TableCell align="center">
                          {row.nama_peminjam}
                        </TableCell>
                        <TableCell align="center">
                          {format( new Date(row.tgl_pengembalian),'dd-MM-yyyy')}
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={row.status} 
                            size="small"
                            color={row.status === "Dipinjam" 
                              ? "primary" 
                              : row.status === "Dikembalikan"
                              ? "success"
                              : "error"
                             }/>
                        </TableCell>
                        <TableCell align="center">
                          <Chip label="Kembalikan" color="success" size="small" variant="outlined" 
                            onClick={() => handleUpdateStatus(row.id, "Dikembalikan")}
                          />
                          <Chip label="Denda" color="error" size="small" variant="outlined" 
                            onClick={() => handleUpdateStatus(row.id, "Didenda")}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {/* <IconButton 
                            color="primary"
                            onClick={() => navigate(`/peminjaman/detail/${row.id}`)}
                          >
                            <ZoomIn/>
                          </IconButton>                                           */}
                          <IconButton 
                            color="error"
                            onClick={() => handleDeletePeminjaman(row.id)}
                          >
                            <Delete/>
                          </IconButton>                      
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

export default PeminjamanPage;
