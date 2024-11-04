import React from 'react';
import DatePickerComponent from '@/components/Calendar';
import { accommodations } from '../../utilities/accommodations'; 
import PaymentButton from '@/components/PaymentButton';
import IAccommodation from '@/interfaces/Accomodation';
import dynamic from 'next/dynamic';


const Map = dynamic(() => import('../../map/cheMap'));

export const generateStaticParams = async () => {
  return accommodations.map(accommodation => ({
    id: accommodation.id.toString(),
  }));
};

interface Params {
  id: string;
}


const AccommodationDetail = async ({ params }: { params: Params  }) => {

  const accommodationId = parseInt(params.id);
  const accommodation = accommodations.find(a => a.id === accommodationId);

  if (!accommodation) {
    return <h2>Alojamiento no encontrado</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{accommodation.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <img src={accommodation.image} alt={accommodation.title} className="col-span-2 sm:col-span-2 lg:col-span-3 rounded-lg object-cover" />
        <img src={accommodation.image} alt="secondary image" className="rounded-lg object-cover" />
        <img src={accommodation.image} alt="secondary image" className="rounded-lg object-cover" />
        <img src={accommodation.image} alt="secondary image" className="rounded-lg object-cover" />
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
        <PaymentButton propertyId={accommodation.id} price={accommodation.price} stripeProductId={accommodation.stripeProductId} stripePriceId={accommodation.stripePriceId} /> {/* Asegúrate de pasar los props correctos */}
      </div>
    </div>
  );
};

export default AccommodationDetail;