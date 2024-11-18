import React from "react";
import { toast } from "react-hot-toast";

export default function BookingForm() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({});

  const handleFirstStepSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFormData((prev) => ({
      ...prev,
      ...Object.fromEntries(data),
    }));
    setStep(2);
  };

  const handleSecondStepSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const additionalData = new FormData(e.currentTarget);
    const completeData = { ...formData, ...Object.fromEntries(additionalData) };

    try {
      const response = await fetch("http://localhost:3000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: completeData.nombre,
          telefono: completeData.telefono,
          email: completeData.email,
          empresa: completeData.empresa,
          origen: completeData.origin,
          destino: completeData.destination,
          fecha: completeData.date,
          hora: completeData.time,
          pasajeros: parseInt(completeData.passengers, 10),
          tipoVehiculo: completeData.vehicleType,
          tipoServicio: completeData.serviceType,
          esperaEnDestino: completeData.needsWaiting === "on",
          requisitos: completeData.requirements,
        }),
      });

      if (!response.ok) throw new Error("Booking failed");

      toast.success("Booking submitted successfully!");
      setFormData({});
      setStep(1);
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Reserve tu Servicio De Transporte
      </h1>

      {step === 1 ? (
        <form
          onSubmit={handleFirstStepSubmit}
          className="space-y-6 bg-white shadow-lg rounded-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lugar de Origen */}
            <div>
              <label
                htmlFor="origin"
                className="block text-sm font-medium text-gray-700"
              >
                Lugar de Origen
              </label>
              <input
                type="text"
                name="origin"
                id="origin"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Lugar de Destino */}
            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700"
              >
                Lugar de Destino
              </label>
              <input
                type="text"
                name="destination"
                id="destination"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Fecha */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha del Servicio
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Hora */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Hora
              </label>
              <input
                type="time"
                name="time"
                id="time"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Número de Pasajeros */}
            <div>
              <label
                htmlFor="passengers"
                className="block text-sm font-medium text-gray-700"
              >
                Número de Pasajeros
              </label>
              <input
                type="number"
                name="passengers"
                id="passengers"
                min="1"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Tipo de Vehículo */}
            <div>
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Vehículo
              </label>
              <select
                name="vehicleType"
                id="vehicleType"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccione un vehículo</option>
                <option value="Duster 4 Pax">Duster 4 Pax</option>
                <option value="Van H1 8 Pax">Van H1 8 Pax</option>
                <option value="Van Master 15 Pax">Van Master 15 Pax</option>
                <option value="Van Sprinter 19 Pax">Van Sprinter 19 Pax</option>
                <option value="Bus 30 Pax">Bus 30 Pax</option>
                <option value="Bus 40 Pax">Bus 40 Pax</option>
              </select>
            </div>
          </div>

          {/* Tipo de Servicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Servicio
            </label>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="serviceType"
                  value="oneWay"
                  required
                  className="form-radio"
                />
                <span className="ml-2">Solo Ida</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="serviceType"
                  value="Ida y Regreso"
                  required
                  className="form-radio"
                />
                <span className="ml-2">Ida y Regreso</span>
              </label>
            </div>
          </div>

          {/* Espera en Destino */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="needsWaiting"
                className="form-checkbox"
              />
              <span className="ml-2">¿Disponibilidad del Vehiculo?</span>
            </label>
          </div>

          {/* Requisitos */}
          <div>
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-gray-700"
            >
              Informacion Adicional
            </label>
            <textarea
              name="requirements"
              id="requirements"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Cualquier requerimiento especial o información adicional del Servicio ..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Siguiente
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSecondStepSubmit}
          className="space-y-6 bg-white shadow-lg rounded-lg p-6"
        >
          {/* Datos Personales */}
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Empresa */}
          <div>
            <label
              htmlFor="empresa"
              className="block text-sm font-medium text-gray-700"
            >
              Empresa (opcional)
            </label>
            <input
              type="text"
              name="empresa"
              id="empresa"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Reservar Ahora
          </button>
        </form>
      )}
    </div>
  );
}
