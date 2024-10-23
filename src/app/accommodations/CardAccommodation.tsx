"use client"
import { useRouter } from 'next/navigation';
import IAccommodation from "@/interfaces/Accomodation";

const CardAccommodation: React.FC<IAccommodation> = ({ id, title, description, price, image }) => {
  const router = useRouter();

  // Función para manejar el clic
  const handleCardClick = () => {
    router.push(`/accommodations/${id}`); 
  };

  return (
    <div 
      className="card bg-white shadow-lg p-4 rounded-lg cursor-pointer" 
      onClick={handleCardClick} 
    >
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg text-black font-bold mt-2">{title}</h2>
      <p className="text-sm text-black">{description}</p>
      <p className="text-lg font-semibold text-blue-600">${price} por noche</p>
    </div>
  );
};

export default CardAccommodation;
