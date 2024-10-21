import React from 'react';
import CardAccommodation from './accommodations/CardAccommodation';
import { accommodations } from './utilities/accommodations';

export default function Home() {
  return (
    <>
      <div className="Home grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {accommodations.map((accommodation) => (
          <CardAccommodation
            key={accommodation.id}
            id={accommodation.id}
            title={accommodation.title}
            description={accommodation.description}
            price={accommodation.price}
            image={accommodation.image}
          />
        ))}
      </div>
    </>
  );
}