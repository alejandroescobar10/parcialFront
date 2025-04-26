import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

const PanelAdmin = () => {
  const [ventas, setVentas] = useState([]);
  const [estado, setEstado] = useState('');

  const cargarVentas = async () => {
    const res = await API.get('/ventas');
    setVentas(res.data);
  };

  const actualizarEstado = async (id) => {
    await API.put('/ventas', { id, estado });
    cargarVentas();
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>
      <table className="w-full border text-left">
        <thead>
          <tr>
            <th className="border px-2 py-1">Usuario</th>
            <th className="border px-2 py-1">Producto</th>
            <th className="border px-2 py-1">Valor</th>
            <th className="border px-2 py-1">Estado</th>
            <th className="border px-2 py-1">Acción</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr key={v._id}>
              <td className="border px-2 py-1">{v.usuarioId?.nombre}</td>
              <td className="border px-2 py-1">{v.producto}</td>
              <td className="border px-2 py-1">${v.valor}</td>
              <td className="border px-2 py-1">{v.estado}</td>
              <td className="border px-2 py-1">
                <select value={estado} onChange={(e) => setEstado(e.target.value)} className="border">
                  <option value="">Cambiar estado</option>
                  <option value="Aceptado">Aceptar</option>
                  <option value="Declinado">Declinar</option>
                </select>
                <button onClick={() => actualizarEstado(v._id)} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelAdmin;