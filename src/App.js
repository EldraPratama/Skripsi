import React from 'react';
import { Routes, Route } from "react-router-dom";

import TestingPage from './view/Testing';
import TestingPageTwo from './view/Testing/two';

function App() {

  return (
    <Routes>
      <Route path="/" element={<TestingPage/>} />
      <Route path="/two" element={<TestingPageTwo/>} />
    </Routes>
  );
}

export default App;
