import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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


const BukuPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Memanggil endpoint di server backend untuk mendapatkan data
    axios.get('http://localhost:5000/api/buku')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  const columns = [
    { id: 'No', label: 'No', minWidth: 50 },
    { id: 'Judul', label: 'Judul', minWidth: 200 },
    { id: 'Penulis', label: 'Penulis', minWidth: 100 },
    { id: 'Kode', label: 'Kode Buku', minWidth: 100 },
    { id: 'Stok Buku', label: 'Stok Buku', minWidth: 100 },
    { id: 'Aksi', label: 'Aksi', minWidth: 150 },
    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
    // },
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
  
  return (
    <MerchantLayout>
      <Box sx={styles.boxStyled}>
        <Stack direction={"row"} justifyContent={"space-between"} marginBottom={2}>
          <h2>Data Buku</h2>
          <Button
            variant={"contained"}
            color="primary"
            style={{ fontWeight: "bold", borderRadius:"25px", marginTop:"30px" }}
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
                          {row.stok_buku}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="primary"><ZoomIn/></IconButton>                      
                          <IconButton color="success"><Edit/></IconButton>                      
                          <IconButton color="error"><Delete/></IconButton>                      
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

export default BukuPage;
