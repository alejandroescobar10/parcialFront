import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const Compras = () => {
  const [valor, setValor] = useState('');
  const [producto, setProducto] = useState('');
  const [historial, setHistorial] = useState([]);
  const navigate = useNavigate();

  const cargarCompras = async () => {
    const res = await API.get('/user/compras');
    setHistorial(res.data);
  };

  const crearVenta = async () => {
    const res = await API.post('/user/comprar', { valor, producto });
    navigate(`/pago/${res.data._id}`);
  };

  useEffect(() => {
    cargarCompras();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Nueva Compra</h2>
      <div className="space-y-2 mb-6">
        <input type="text" placeholder="Producto" value={producto} onChange={(e) => setProducto(e.target.value)} className="w-full border p-2" />
        <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full border p-2" />
        <button onClick={crearVenta} className="bg-blue-600 text-white px-4 py-2 rounded">Pagar</button>
      </div>
      <h2 className="text-xl font-bold mb-2">Historial</h2>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Producto</th>
            <th className="border px-2 py-1">Valor</th>
            <th className="border px-2 py-1">Fecha</th>
            <th className="border px-2 py-1">Estado</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((venta) => (
            <tr key={venta._id}>
              <td className="border px-2 py-1">{venta.producto}</td>
              <td className="border px-2 py-1">${venta.valor}</td>
              <td className="border px-2 py-1">{new Date(venta.fecha).toLocaleString()}</td>
              <td className="border px-2 py-1">{venta.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Compras;