import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../auth/useAuth';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { correo, contrasena });
      login(res.data.token, res.data.rol);
      if (res.data.rol === 'admin') navigate('/admin');
      else navigate('/compras');
    } catch (err) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Iniciar Sesión</h2>
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Entrar</button>
        <div className="text-center">
          <p className="text-sm">
            ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Login;