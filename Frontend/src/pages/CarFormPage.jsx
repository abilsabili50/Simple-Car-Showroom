import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utility function to handle form data
const handleFormChange = (form, setForm, event) => {
  const { name, value, type, checked } = event.target;
  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
};

// Utility function to prepare the form data before submission
const prepareFormData = (form) => {
  const data = {
    merk: form.merk,
    model: form.model,
    tahun: Number(form.tahun),
    hargaDasar: Number(form.hargaDasar),
  };

  if (form.pakaiBank) {
    data.pinjaman = Number(form.pinjaman) || 0;
    data.sukuBunga = Number(form.sukuBunga) || 0;
  }

  return data;
};

const CarFormPage = () => {
  const [form, setForm] = useState({
    merk: "",
    model: "",
    tahun: "",
    hargaDasar: "",
    pinjaman: "",
    sukuBunga: "",
    pakaiBank: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = prepareFormData(form);

    try {
      await axios.post("http://localhost:3000/api/v1/cars", dataToSend);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-4">Tambah Mobil</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <InputField name="merk" placeholder="Merk" value={form.merk} onChange={(e) => handleFormChange(form, setForm, e)} required />
        <InputField name="model" placeholder="Model" value={form.model} onChange={(e) => handleFormChange(form, setForm, e)} required />
        <InputField name="tahun" placeholder="Tahun" type="number" value={form.tahun} onChange={(e) => handleFormChange(form, setForm, e)} required />
        <InputField name="hargaDasar" placeholder="Harga Dasar" type="number" value={form.hargaDasar} onChange={(e) => handleFormChange(form, setForm, e)} required />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="pakaiBank" checked={form.pakaiBank} onChange={(e) => handleFormChange(form, setForm, e)} />
          Dibeli dengan dana bank?
        </label>

        {form.pakaiBank && (
          <>
            <InputField name="pinjaman" placeholder="Dana Pinjaman (Rp)" type="number" value={form.pinjaman} onChange={(e) => handleFormChange(form, setForm, e)} />
            <InputField name="sukuBunga" placeholder="Suku Bunga (% per tahun)" type="number" value={form.sukuBunga} onChange={(e) => handleFormChange(form, setForm, e)} />
          </>
        )}

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Simpan</button>
      </form>
    </div>
  );
};

// Reusable InputField component for form fields
const InputField = ({ name, placeholder, type = "text", value, onChange, required }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border p-2 rounded"
    required={required}
  />
);

export default CarFormPage;
