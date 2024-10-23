import { accommodations } from '../../utilities/accommodations';
import IAccommodation from '@/interfaces/Accomodation';


export const generateStaticParams = async () => {
  return accommodations.map(accommodation => ({
    id: accommodation.id.toString(),
  }));
};


const AccommodationDetail = async ({ params }: { params: { id: string } }) => {
  const accommodation = accommodations.find(a => a.id === parseInt(params.id));

  if (!accommodation) {
    return <h2>Alojamiento no encontrado</h2>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-black">{accommodation.title}</h1>
      <img src={accommodation.image} alt={accommodation.title} className="my-4 rounded-lg" />
      <p className="text-lg text-black">{accommodation.description}</p>
      <p className="text-xl font-semibold text-blue-500">Precio: ${accommodation.price}</p>
    </div>
  );
};

export default AccommodationDetail;
