import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Compras from '../pages/Usuario/Compras';
import Pago from '../pages/Usuario/Pago';
import PanelAdmin from '../pages/Admin/PanelAdmin';
import { useAuth } from '../auth/useAuth';

const AppRouter = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {auth?.rol === 'usuario' && (
        <>
          <Route path="/compras" element={<Compras />} />
          <Route path="/pago/:idVenta" element={<Pago />} />
        </>
      )}

      {auth?.rol === 'admin' && (
        <Route path="/admin" element={<PanelAdmin />} />
      )}

      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;