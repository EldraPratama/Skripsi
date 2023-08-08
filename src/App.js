import React from 'react';
import { Routes, Route } from "react-router-dom";

import TestingPage from './view/Testing';
import TestingPageTwo from './view/Testing/two';
import HomePage from './view/Home';

import BukuPage from './view/Buku';
import TambahBukuPage from './view/Buku/tambah';
import EditBukuPage from './view/Buku/edit';
import DetailBukuPage from './view/Buku/detail';

import AnggotaPage from './view/Anggota';
import PeminjamanPage from './view/Peminjaman';
import DendaPage from './view/Denda';
import LoginPage from './view/Login';

function App() {

  return (
    <Routes>
      <Route path="/" element={<TestingPage/>} />
      <Route path="/two" element={<TestingPageTwo/>} />
      <Route path="/home" element={<HomePage/>} />

      <Route path="/buku" element={<BukuPage/>} />
      <Route path="/buku/tambah" element={<TambahBukuPage/>} />
      <Route path="/buku/edit" element={<EditBukuPage/>} />
      <Route path="/buku/detail" element={<DetailBukuPage/>} />
      
      <Route path="/anggota" element={<AnggotaPage/>} />
      <Route path="/peminjaman" element={<PeminjamanPage/>} />
      <Route path="/denda" element={<DendaPage/>} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
  );
}

export default App;
