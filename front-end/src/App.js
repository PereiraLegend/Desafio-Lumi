import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cabecalho from './components/cabecalho';
import Dashboard from './components/dashboard';
import BibliotecaFaturas from './components/bibliotecafaturas';
import ExtratorDados from './components/extrairdadospdf'

const App = () => (
  <Router>
    <Cabecalho />
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/faturas" element={<BibliotecaFaturas />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/extrairdados" element={<ExtratorDados/>}/>
    </Routes>
  </Router>
);

export default App;