import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Utility function for API calls
const fetchData = async (url, setter) => {
  try {
    const response = await axios.get(url);
    setter(response.data.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [services, setServices] = useState([]);
  const [hppData, setHppData] = useState(null);

  useEffect(() => {
    // Fetch car details, services, and HPP data
    fetchData(`http://localhost:3000/api/v1/cars/${id}`, setCar);
    fetchData(`http://localhost:3000/api/v1/services/car/${id}`, setServices);
    fetchData(`http://localhost:3000/api/v1/cars/hpp/${id}`, setHppData);
  }, [id]);

  // Render loading state if data is still fetching
  if (!car || !hppData) {
    return <div className="p-6">Loading...</div>;
  }

  // Render car details and services
  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-4">Detail Mobil</h1>
      <div className="mb-4">
        <p><strong>Merk:</strong> {car.merk}</p>
        <p><strong>Model:</strong> {car.model}</p>
        <p><strong>Tahun:</strong> {car.tahun}</p>
        <p><strong>Harga Dasar:</strong> Rp{car.hargaDasar}</p>
        <p><strong>Pinjaman:</strong> Rp{car.pinjaman || 0}</p>
        <p><strong>Suku Bunga:</strong> {car.sukuBunga || 0}%</p>
        <p className="mt-2 text-green-700 font-bold">HPP: Rp{hppData.hpp.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Biaya Service: Rp{hppData.totalBiayaService.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Suku Bunga (Nominal): Rp{hppData.sukuBungaNominal.toFixed(2)}</p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Riwayat Service</h2>
      <ul className="list-disc list-inside">
        {services.map((service) => (
          <li key={service._id}>
            {service.tanggal} - {service.deskripsi} (Rp{service.biaya})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarDetailPage;
