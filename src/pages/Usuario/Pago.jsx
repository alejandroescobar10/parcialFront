import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const Pago = () => {
  const { idVenta } = useParams();
  const [venta, setVenta] = useState(null);
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [fecha, setFecha] = useState('');
  const [ccv, setCcv] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarVenta = async () => {
      try {
        const res = await API.get('/user/compras');
        const ventaEncontrada = res.data.find((v) => v._id === idVenta);
        setVenta(ventaEncontrada);
      } catch {
        alert('Error al cargar venta');
      }
    };
    cargarVenta();
  }, [idVenta]);

  const handlePago = async () => {
    if (!nombre || !cedula || !telefono || !tarjeta || !fecha || !ccv) {
      return alert('Por favor completa todos los campos');
    }

    try {
      const res = await API.post('/user/pago', {
        idVenta,
        nombre,
        cedula,
        telefono,
        tarjeta,
        fecha,
        ccv
      });
      alert(res.data.mensaje);
      navigate('/compras');
    } catch (err) {
      alert('Error en la transacción');
    }
  };

  if (!venta) return <p className="text-center mt-10">Cargando datos...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Pasarela de Pago</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Producto</label>
          <input value={venta.producto} readOnly className="w-full border p-2 bg-gray-100 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Valor</label>
          <input value={venta.valor} readOnly className="w-full border p-2 bg-gray-100 rounded" />
        </div>

        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border p-2 mb-3 rounded" />
        <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} className="w-full border p-2 mb-3 rounded" />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full border p-2 mb-3 rounded" />
        <input type="text" placeholder="Tarjeta" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} className="w-full border p-2 mb-3 rounded" />
        <input type="text" placeholder="Fecha de vencimiento (MM/AA)" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full border p-2 mb-3 rounded" />
        <input type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} className="w-full border p-2 mb-4 rounded" />

        <button onClick={handlePago} className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Pago;
