import React from "react";
import { Link } from "react-router-dom";
import { Car, Calendar, MapPin, Users } from "lucide-react";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Logo centrado 
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2  ">
          <img
            src={logo}
            alt="Service TouristWorld Logo"
            className="h-40 w-auto"
          />
        </div>
        */}

        {/* Contenido del texto */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Transporte Especial a su Servicio
            </h1>
            <p className="text-xl mb-8">
              Viaje con comodidad y seguridad a cualquier destino
            </p>
            <Link
              to="/book"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Reservar Ahora
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Vehículos Modernos</h3>
              <p className="text-gray-600">
                Flota actualizada y bien mantenida
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Disponibilidad 24/7</h3>
              <p className="text-gray-600">
                Servicio todo el día, todos los días
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Cualquier Destino</h3>
              <p className="text-gray-600">Viajes locales y nacionales</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Grupos Grandes</h3>
              <p className="text-gray-600">
                Capacidad para cualquier tamaño de grupo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Types */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tipos de Vehículos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://motormagazine.com.ar/wp-content/uploads/2024/04/nuevo-renault-duster-2024-argentina-1.jpg"
                alt="Duster"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Duster 4x4</h3>
                <p className="text-gray-600">Perfecto para 1-4 pasajeros</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://www.carmaxrentacar.com/guayaquil/wp-content/uploads/2020/01/hyundai-carmax-geo.jpg"
                alt="van H1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Van H1</h3>
                <p className="text-gray-600">Ideal para 5-8 pasajeros</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://acnews.blob.core.windows.net/imgnews/large/NAZ_8c5098783eb742cabacefdcc65adb834.jpg"
                alt="Van Master"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Van Master</h3>
                <p className="text-gray-600">Capacidad para 9-15 pasajeros</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80"
                alt="Van Sprinter"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Van Sprinter</h3>
                <p className="text-gray-600">Capacidad para 16-19 pasajeros</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80"
                alt="Bus 30 Pax"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Bus 30 Pax</h3>
                <p className="text-gray-600">Capacidad para 20-30 pasajeros</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80"
                alt="Bus 40 Pax"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Bus 40 Pax</h3>
                <p className="text-gray-600">Capacidad para 31-40 pasajeros</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para Viajar?
          </h2>
          <p className="text-white text-lg mb-8">
            Reserve su servicio de transporte ahora
          </p>
          <Link
            to="/book"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Hacer Reserva
          </Link>
        </div>
      </div>
    </div>
  );
}
