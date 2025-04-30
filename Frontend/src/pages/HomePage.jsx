import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Reusable service fetching function
const fetchServices = async (carId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/services/car/${carId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching services for car:", error);
    return [];
  }
};

// Reusable component to display each car
const CarCard = ({ car, services, onDeleteCar, onDeleteService }) => (
  <div className="border p-4 rounded shadow-md bg-white">
    <h2 className="text-xl font-semibold">{car.merk} {car.model}</h2>
    <p>Tahun: {car.tahun}</p>
    <p>Harga: Rp{car.hargaDasar}</p>
    <div className="flex gap-2 mt-2">
      <Link to={`/cars/${car._id}`} className="text-blue-500">Detail</Link>
      <button onClick={() => onDeleteCar(car._id)} className="text-red-500">Hapus</button>
    </div>

    <ServiceHistory
      services={services}
      carId={car._id}
      onDeleteService={onDeleteService}
    />
  </div>
);

// Reusable component to display service history
const ServiceHistory = ({ services, carId, onDeleteService }) => (
  <div className="mt-4">
    <h3 className="font-semibold mb-1">Riwayat Service</h3>
    <ul className="list-disc list-inside text-sm mb-2">
      {(services || []).map((service) => (
        <li key={service._id}>
          {service.tanggal.split('T')[0]} - {service.deskripsi} (Rp{service.biaya}){" "}
          <Link to={`/services/edit/${service._id}`} className="text-blue-500 ml-1">Edit</Link>{" "}
          |{" "}
          <button onClick={() => onDeleteService(service._id, carId)} className="text-red-500">
            Hapus
          </button>
        </li>
      ))}
    </ul>
    <Link to={`/services/add/${carId}`} className="text-green-600 text-sm">
      + Tambah Service
    </Link>
  </div>
);

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/cars");
        const carsData = response.data.data;
        setCars(carsData);

        // Fetch services for each car
        const servicesData = {};
        for (let car of carsData) {
          const carServices = await fetchServices(car._id);
          servicesData[car._id] = carServices;
        }
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
      const updatedServices = { ...services };
      delete updatedServices[id];
      setServices(updatedServices);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const deleteService = async (serviceId, carId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/services/${serviceId}`);
      const updatedServices = await fetchServices(carId);
      setServices((prev) => ({
        ...prev,
        [carId]: updatedServices,
      }));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Daftar Mobil</h1>
      <Link to="/add-car" className="bg-blue-500 text-white px-4 py-2 rounded">Tambah Mobil</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            services={services[car._id]}
            onDeleteCar={deleteCar}
            onDeleteService={deleteService}
          />
        ))}
      </div>
    </div>
  );
}
