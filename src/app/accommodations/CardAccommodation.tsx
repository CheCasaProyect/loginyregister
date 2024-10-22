import IAccommodation from "@/interfaces/Accomodation"  
  
  const CardAccommodation: React.FC<IAccommodation> = ({ title, description, price, image }) => {
    return (
      <div className="card bg-white shadow-lg p-4 rounded-lg">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-lg  text-gray-500 font-bold mt-2">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-lg font-semibold text-blue-600">${price} por noche</p>
      </div>
    );
  };
  
  export default CardAccommodation;