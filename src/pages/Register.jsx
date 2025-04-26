import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('usuario');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/registro', { nombre, correo, contrasena, rol });
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      alert('Error al registrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Registro</h2>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border p-2" required />
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full border p-2" required />
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="w-full border p-2" required />
        <select value={rol} onChange={(e) => setRol(e.target.value)} className="w-full border p-2">
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Registrarse</button>
        <div className="text-center">
          <p className="text-sm">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Register;