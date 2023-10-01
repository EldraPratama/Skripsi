import React from 'react';
import { Routes, Route } from "react-router-dom";

// import TestingPage from './view/Testing';
// import TestingPageTwo from './view/Testing/two';
import HomePage from './view/Home';

import BukuPage from './view/Buku';
import TambahBukuPage from './view/Buku/tambah';
import EditBukuPage from './view/Buku/edit';
import DetailBukuPage from './view/Buku/detail';

import AnggotaPage from './view/Anggota';
import TambahAnggotaPage from './view/Anggota/tambah';
import EditAnggotaPage from './view/Anggota/edit';
import DetailAnggotaPage from './view/Anggota/detail';


import PeminjamanPage from './view/Peminjaman';
import TambahPeminjamanPage from './view/Peminjaman/tambah';
import DetailPeminjamanPage from './view/Peminjaman/detail';

import PengembalianPage from './view/Pengembalian';
import DendaPage from './view/Denda';
import LaporanPage from './view/Laporan';
import PengaturanPage from './view/Pengaturan/edit';
import LoginPage from './view/Login';

import NotFoundPage from './view/NotFound';

function App() {

  return (
    <Routes>
      {/* <Route path="/two" element={<TestingPageTwo/>} /> */}
      {/* <Route path="/home" element={<HomePage/>} /> */}
      <Route path="/" element={<HomePage/>} />

      <Route path="/buku" element={<BukuPage/>} />
      <Route path="/buku/tambah" element={<TambahBukuPage/>} />
      <Route path="/buku/edit/:id" element={<EditBukuPage/>} />
      <Route path="/buku/detail/:id" element={<DetailBukuPage/>} />
      
      <Route path="/anggota" element={<AnggotaPage/>} />
      <Route path="/anggota/tambah" element={<TambahAnggotaPage/>} />
      <Route path="/anggota/edit/:id" element={<EditAnggotaPage/>} />
      <Route path="/anggota/detail/:id" element={<DetailAnggotaPage/>} />


      <Route path="/peminjaman" element={<PeminjamanPage/>} />
      <Route path="/peminjaman/tambah" element={<TambahPeminjamanPage/>} />
      <Route path="/peminjaman/detail/:id" element={<DetailPeminjamanPage/>} />

      <Route path="/pengembalian" element={<PengembalianPage/>} />

      <Route path="/denda" element={<DendaPage/>} />
      <Route path="/laporan" element={<LaporanPage/>} />
      <Route path="/pengaturan" element={<PengaturanPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
}

export default App;
