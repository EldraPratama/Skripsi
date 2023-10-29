import React, { useState, useEffect } from 'react';
import MerchantLayout from "../Layout/MerchantLayout";
import styles from "../Layout/styles";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  // Button,
  Chip,
  // IconButton,
  // Stack,
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow,
  // TextField
} from "@mui/material"; 

import Confirmation from "../Component/confirmation.tsx"

import {
  // Delete,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { QrReader } from 'react-qr-reader';


const PengembalianPage = () => {
  const [data, setData] = useState([]);
  // const navigate = useNavigate();
  // const [search, setSearch] = useState("");
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [idPeminjaman, setIdPeminjaman] = useState("");
  const [no_induk, setNo_induk] = useState("");
  const [denda, setDenda] = useState(0);
  const [max_pinjam, setMax_pinjam] = useState(0);


  const columns = [
    { id: 'No', label: 'No', minWidth: 10 },
    { id: 'Judul buku', label: 'Judul Buku', minWidth: 100 },
    { id: 'Nama', label: 'Nama Peminjam', minWidth: 100 },
    { id: 'tgl Pinjam', label: 'Tgl Pinjam', minWidth: 30 },
    { id: 'status', label: 'Status Peminjaman', minWidth: 50 },
    { id: 'denda', label: 'Denda', minWidth: 100 },
    { id: 'proses', label: 'Proses', minWidth: 100 },
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
    handleGetPengaturan()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(no_induk){
      handleGetPeminjaman()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [no_induk]);

  const cekKeterlambatan = (tgl) => {
    let hari_pinjam = new Date(tgl).setHours(0,0,0,0)
    let hari_ini = new Date().setHours(0,0,0,0)
    let selisihMilidetik = hari_ini - hari_pinjam 
    let selisihHari = selisihMilidetik / (1000 * 60 * 60 * 24) 

    let hitungHariTerlambat = selisihHari - max_pinjam

    return hitungHariTerlambat

  };

  const dendaKeterlambatan = (tgl) => {
    let terlambat = cekKeterlambatan(tgl)
    let didenda = 0
    if(terlambat > 0){
      didenda = terlambat * denda
    }

    return didenda
  }

  const statusPeminjaman = (tgl) => {
    let peminjaman = cekKeterlambatan(tgl)
    let status = ""
    if(peminjaman > 0){
      status = ` Terlambat ${peminjaman} hari`;
    }else if(peminjaman === 0){
      status = `Hari ini terakhir`
    }else if(peminjaman < 0){
      status = `Sisa  ${Math.abs(peminjaman)} hari`
    }else{
      status = `Dikembalikan`
    }

    return status
  }

  const kirimEmail = async (email, peminjam, status, denda) => {
    // const { to, subject, text } = this.state;
    let subjek = "Pengingat Pengembalian Buku";
    let pesan = `Hallo ${peminjam},\n 
    Peminjaman buku kamu ${status}, pastikan tepat waktu dalam mengembalikan buku, terlambat 1 hari akan didenda ${denda}\n            
    Terimakasih :)
    `;

    try {
      await axios.post(`http://localhost:5000/send-email`, {email, subjek, pesan})
      .then((response) => {
        toast.success("Berhasil mengirim pesan")
      });
      // await axios.post('/send-email', { to, subject, text });
      // this.setState({ message: 'Email berhasil terkirim!' });
    } catch (error) {
      // this.setState({ message: 'Gagal mengirim email.' });
    }
  }

  // Memanggil endpoint di server backend untuk mendapatkan data peminjaman
  const handleGetPengaturan = () => {
    axios.get(`http://localhost:5000/api/pengaturan`)
    .then((response) => {
      setDenda(response.data[0].denda);
      setMax_pinjam(response.data[0].max_pinjam);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
  }

  // Memanggil endpoint di server backend untuk mendapatkan data peminjaman
  const handleGetPeminjaman = () => {
    axios.get(`http://localhost:5000/api/peminjaman/anggota/${no_induk}`)
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
        toast.success("Berhasil menghapus Data")
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

    // Menambah kembali stok
    const handleTambahStok = (kode_buku) => {
      axios.put(`http://localhost:5000/api/buku/tambah/${kode_buku}`)
      .then((response) => {
      })
      .catch((error) => {
        toast.error("Gagal Menambah Data")
        console.error('Error add data', error);
      });
    }

  // Memanggil endpoint di server backend untuk mengupdate data
  const handleUpdateStatus = (id, status, kode_buku, denda) => {
    let body = {
      status: status,
      denda: denda,
      tgl_pengembalian: new Date(),
    }

    axios.put(`http://localhost:5000/api/peminjaman/${id}`, body)
      .then((response) => {
        handleTambahStok(kode_buku)
        handleGetPeminjaman()
        toast.success("Berhasil mengupdate Data")
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  console.log(`${denda} perhari mulai ${max_pinjam}`)
  return (
    <MerchantLayout>
      <ToastContainer />
      <Confirmation
        title="Konfirmasi"
        titleStyle={{ fontWeight: "bold" }}
        description="Yakin mau menghapus peminjaman?"
        open={konfirmasiHapus}
        handleClose={() => setKonfirmasiHapus(false)}
        handleConfirm={() => { 
          handleDeletePeminjaman(idPeminjaman)
          setKonfirmasiHapus(false)
        }}
      />
      <Box sx={styles.boxStyled}>
        <h3>Pengembalian</h3>
        <Box width="20%" marginLeft="40%" marginTop="-20px">
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setNo_induk(result.text)
              }
            }}
            style={{ width: '100%'}}
          />
        </Box>
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                          {format( new Date(row.tgl_pinjam),'dd-MM-yyyy')}
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={ row.status === "Dipinjam" 
                              ? statusPeminjaman(row.tgl_pinjam) 
                              : row.status
                            } 
                            size="small"
                            color={
                              cekKeterlambatan(row.tgl_pinjam) >= 0 && row.status === "Dipinjam"
                              ? "error"
                              : row.status === "Dipinjam" 
                              ? "primary" 
                              : row.status === "Dikembalikan"
                              ? "success"
                              : "error"
                             }/>
                        </TableCell>
                        {/* onClick={() => cekKeterlambatan(row.tgl_pinjam) */}
                        <TableCell align="center">
                          {row.denda ? row.denda : dendaKeterlambatan(row.tgl_pinjam)}
                        </TableCell>
                        <TableCell align="center">
                          { row.status === "Dipinjam" && (
                            <>
                              <Chip label="Kembalikan" color="success" size="small" variant="outlined" 
                                onClick={() => handleUpdateStatus(row.id, "Dikembalikan", row.kode_buku, dendaKeterlambatan(row.tgl_pinjam))}
                              />
                              <Chip label="Ingatkan" color="warning" size="small" variant="outlined" 
                                onClick={() => {
                                  kirimEmail(row.email, row.nama_peminjam, statusPeminjaman(row.tgl_pinjam), denda)
                                }}
                              />
                            </>
                          )}
                        </TableCell>
                    
                        {/* <TableCell align="center">                     
                          <IconButton 
                            color="error"
                            onClick={() => {
                              setIdPeminjaman(row.id)
                              setKonfirmasiHapus(true)
                            }}
                          >
                            <Delete/>
                          </IconButton>                      
                        </TableCell> */}
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

export default PengembalianPage;
