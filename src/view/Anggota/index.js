import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
  TableRow 
} from "@mui/material"; 

import {
  ZoomIn,
  Edit,
  Delete,
} from '@mui/icons-material';

const AnggotaPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { id: 'No', label: 'No', minWidth: 50 },
    { id: 'No induk', label: 'Nomer Induk', minWidth: 100 },
    { id: 'Nama', label: 'Nama', minWidth: 100 },
    { id: 'No Hp', label: 'Nomer HP', minWidth: 100 },
    { id: 'Alamat', label: 'Alamat', minWidth: 200 },
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

  useEffect(() => {
    handleGetAnggota()
  }, []);

  const handleGetAnggota = () => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get('http://localhost:5000/api/anggota')
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
  }

  // Memanggil endpoint di server backend untuk menghapus data
  const handleDeleteAnggota = (id) => {
    axios.delete(`http://localhost:5000/api/anggota/${id}`)
      .then((response) => {
        handleGetAnggota()
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <Stack direction={"row"} justifyContent={"space-between"} marginBottom={2}>
          <h3>Data Anggota</h3>
          <Button
            variant={"contained"}
            color="primary"
            style={{ fontWeight: "bold", borderRadius:"25px", marginTop:"30px" }}
            onClick={() => navigate("/anggota/tambah")}
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
                          {row.no_induk}
                        </TableCell>
                        <TableCell align="center">
                          {row.nama}
                        </TableCell>
                        <TableCell align="center">
                          {row.no_hp}
                        </TableCell>
                        <TableCell align="center">
                          {row.alamat}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton 
                            color="primary"
                            onClick={() => navigate(`/anggota/detail/${row.id}`)}
                          >
                            <ZoomIn/>
                          </IconButton>                      
                          <IconButton 
                            color="success"
                            onClick={() => navigate(`/anggota/edit/${row.id}`)}
                          >
                            <Edit/>
                          </IconButton>                      
                          <IconButton 
                            color="error"
                            onClick={() => handleDeleteAnggota(row.id)}
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

export default AnggotaPage;
