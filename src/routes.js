import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'

import Filme from './Pages/Filme'
import Home from './Pages/Home'
import Header from './components/Header'
import Erro from "./Pages/Erro";
import Favoritos from "./Pages/Favoritos";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmes/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  )
}
