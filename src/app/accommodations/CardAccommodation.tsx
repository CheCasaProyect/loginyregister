
"use client";
import { useRouter } from 'next/navigation';
import IAccommodation from "@/interfaces/Accomodation";
import React from 'react';

const CardAccommodation: React.FC<IAccommodation> = ({ id, title, description, price, image, latitude, longitude }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/accommodations/${id}`);
  };

  return (
    <div
      className="col w-60 h-80 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="container relative w-full h-full transition-transform duration-700 perspective-1000">
        <div
          className="front absolute inset-0 w-full h-full bg-cover rounded-3xl"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="title-overlay absolute bottom-0 w-full bg-gray-800 bg-opacity-60 p-2 rounded-b-3xl">
            <p className="text-white font-bold text-xl text-center">{title}</p>
          </div>
        </div>
        <div className="back absolute inset-0 w-full h-full bg-gray-800 text-white rounded-3xl transform rotateY-180">
          <div className="inner flex items-center justify-center h-full p-4">
            <p className="text-center">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAccommodation;