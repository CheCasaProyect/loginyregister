
"use client";
import React, { useState, useEffect } from 'react';
import DatePickerComponent from '@/components/Calendar';
import { accommodations } from '../../utilities/accommodations'; 
import PaymentButton from '@/components/PaymentButton';
import IAccommodation from '@/interfaces/Accomodation';
import dynamic from 'next/dynamic';


const Map = dynamic(() => import('../../map/cheMap'));


const AccommodationDetail = ({ params }: { params: { id: string } }) => {
  const [accommodation, setAccommodation] = useState<IAccommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch(`http://localhost:3002/properties/${params.id}`);
        if (!response.ok) {
          const errorMessage = await response.text(); // Registrar el mensaje de error
          throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }
        const data = await response.json();
        if (!data) {
          throw new Error('No se recibió ningún dato');
        }
        setAccommodation(data);
      } catch (err: unknown) { 
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchAccommodation();
  }, [params.id]);


interface Params {
  id: string;
}

  if (!accommodation) {
    return <p>No se encontró información de alojamiento.</p>;
  }
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{accommodation.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <img src={accommodation.photos} alt={accommodation.title} className="col-span-2 sm:col-span-2 lg:col-span-3 rounded-lg object-cover" />
        <img src={accommodation.photos} alt="secondary image" className="rounded-lg object-cover" />
        <img src={accommodation.photos} alt="secondary image" className="rounded-lg object-cover" />
        <img src={accommodation.photos} alt="secondary image" className="rounded-lg object-cover" />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <p className="text-lg text-gray-800 mb-4">{accommodation.description}</p>
          <p className="text-xl font-semibold text-blue-600">Precio: ${accommodation.price} / noche</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-lg font-medium">4.92</span>
          <span className="text-sm">(13 evaluaciones)</span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2x1 font-bold text-gray-900 mb-4"> Ubicación</h2>
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <Map latitude={accommodation.latitude} longitude={accommodation.longitude}/>
        </div>
      </div>     
      <div className="mt-6">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Reservar
        </button>
        <DatePickerComponent />
        <PaymentButton 
        propertyId={accommodation.id as number} 
        price={accommodation.price} 
        stripeProductId={accommodation.stripeProductId} 
        stripePriceId={accommodation.stripePriceId} /> {/* Asegúrate de pasar los props correctos */}
      </div>
    </div>
  );
};

export default AccommodationDetail;