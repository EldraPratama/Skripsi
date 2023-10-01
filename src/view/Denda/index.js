import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Chip,
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

import { format } from 'date-fns';




const PeminjamanPage = () => {
  const [data, setData] = useState([]);
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const columns = [
    { id: 'No', label: 'No', minWidth: 10 },
    { id: 'Judul buku', label: 'Judul Buku', minWidth: 100 },
    { id: 'Nama', label: 'Nama Peminjam', minWidth: 100 },
    { id: 'tgl pengembalian', label: 'Tgl Pengembalian', minWidth: 30 },
    { id: 'status', label: 'Status', minWidth: 50 },
    { id: 'denda', label: 'Denda', minWidth: 100 },
    { id: 'Aksi', label: 'Aksi', minWidth: 100 },
  ];


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [selectedId, setSelectedId] = React.useState(0);
  const [denda, setDenda] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    handleGetDenda()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleGetDenda = () => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get(`http://localhost:5000/api/denda?search=${search}`)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
  }

  // Memanggil endpoint di server backend untuk mengupdate data
  const handleUpdateStatus = (id, denda, status) => {
    let body = {
      denda: denda,
      status: status,
    }

    axios.put(`http://localhost:5000/api/denda/${id}`, body)
      .then((response) => {
        toast.success("Berhasil mengupdate Data")
        handleGetDenda()
        setSelectedId(0)
        setDenda(0)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <h3>Data Denda</h3>
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
                          <Chip label={row.denda > 0 ? "Dibayar" : "Belum Bayar" } 
                            size="small"
                            color={row.denda > 0 ? "success" : "warning"}/>
                        </TableCell>
                        <TableCell align="center">
                          { selectedId === row.id ? (
                            <TextField 
                              size='small'          
                              value={denda}
                              type='number'
                              onChange={(e) => setDenda(e.target.value)}
                              sx={{
                                width:"130px",
                              }}
                            /> ) : ( row.denda )
                          }
                        </TableCell>
                        <TableCell align="center">
                          { selectedId !== row.id 
                            ? (
                              <Chip label="Update" color="primary" size="small" variant="outlined" 
                                onClick={() => {
                                  setSelectedId(row.id)
                                  setDenda(row.denda)
                                }}
                              />
                            ) : (
                              <Chip label="Simpan" color="success" size="small" variant="outlined" 
                                onClick={() => {
                                  handleUpdateStatus(row.id, denda ,"Dikembalikan")
                                  handleGetDenda()
                                }}
                              />
                            )
                          }
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

export default PeminjamanPage;
