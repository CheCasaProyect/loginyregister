"use client"
import React, { useState, useEffect } from 'react';
import CardAccommodation from './accommodations/CardAccommodation'; // Asegúrate de importar el componente adecuado
import Navbar from '@/components/Navbar'; // Asegúrate de importar el componente Navbar

export default function Home() {
  const [accommodations, setAccommodations] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch('http://localhost:3001/properties'); 
        const data = await response.json();
        setAccommodations(data); 
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
      }
    };

    fetchAccommodations();
  }, []);

  // Filtrar las propiedades según el término de búsqueda
  const filteredAccommodations = accommodations.filter(accommodation => 
    accommodation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    accommodation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} /> {/* Pasar la función setSearchTerm */}
      <div className="Home flex flex-wrap justify-center gap-5 p-8">
        {filteredAccommodations.map((accommodation) => (
          <CardAccommodation
            key={accommodation.id}
            id={accommodation.id}
            title={accommodation.title}
            description={accommodation.description}
            price={accommodation.price}
            photos={accommodation.photos}
            latitude={accommodation.latitude}
            longitude={accommodation.longitude}
            provincia={''}
            stripePriceId={undefined}
            stripeProductId={undefined}
          />
        ))}
      </div>
    </>
  );
}