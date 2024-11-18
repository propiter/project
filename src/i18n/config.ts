import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'es',
  lng: 'es',
  resources: {
    es: {
      translations: {
        'nav.home': 'Inicio',
        'nav.book': 'Reservar',
        'nav.blog': 'Blog',
        'nav.language': 'English',
        'booking.title': 'Reserva tu Servicio de Transporte',
        'booking.origin': 'Lugar de Recogida',
        'booking.destination': 'Destino',
        'booking.date': 'Fecha',
        'booking.time': 'Hora',
        'booking.passengers': 'Número de Pasajeros',
        'booking.vehicleType': 'Tipo de Vehículo',
        'booking.serviceType': 'Tipo de Servicio',
        'booking.oneWay': 'Solo Ida',
        'booking.roundTrip': 'Ida y Vuelta',
        'booking.waiting': 'Necesito que el vehículo espere en el lugar',
        'booking.requirements': 'Requisitos Especiales',
        'booking.submit': 'Reservar Ahora',
        'booking.personalInfo': 'Información Personal',
        'booking.name': 'Nombre Completo',
        'booking.phone': 'Teléfono',
        'booking.email': 'Correo Electrónico',
        'booking.company': 'Empresa (Opcional)'
      }
    },
    en: {
      translations: {
        'nav.home': 'Home',
        'nav.book': 'Book',
        'nav.blog': 'Blog',
        'nav.language': 'Español',
        'booking.title': 'Book Your Transport Service',
        'booking.origin': 'Pick-up Location',
        'booking.destination': 'Destination',
        'booking.date': 'Date',
        'booking.time': 'Time',
        'booking.passengers': 'Number of Passengers',
        'booking.vehicleType': 'Vehicle Type',
        'booking.serviceType': 'Service Type',
        'booking.oneWay': 'One Way',
        'booking.roundTrip': 'Round Trip',
        'booking.waiting': 'Need vehicle to wait at location',
        'booking.requirements': 'Special Requirements',
        'booking.submit': 'Book Now',
        'booking.personalInfo': 'Personal Information',
        'booking.name': 'Full Name',
        'booking.phone': 'Phone',
        'booking.email': 'Email',
        'booking.company': 'Company (Optional)'
      }
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

export default i18n;