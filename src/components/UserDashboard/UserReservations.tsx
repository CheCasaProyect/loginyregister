// import React from 'react';
// import { IReserva } from '../../interfaces/Reservations';

// const MyReservations: React.FC = () => {
//   const reservations: IReserva[] = [
//     { id: '1' , property: 'Apartamento en la playa', checkIn: '2024-12-01', checkOut: '2024-12-20', location: 'Mar del Plata', guests: 3, state: 'Activa', imageUrl: "https://a0.muscache.com/im/pictures/miso/Hosting-43403945/original/02fd85af-475d-44d8-a585-c1cc9b02df7a.jpeg?im_w=1200" },
//     { id: '2', property: 'Cabaña en la montaña', checkIn: '2024-12-15', checkOut: '2024-12-29', location: 'Buenos Aires', guests: 2, state: 'Cancelada', imageUrl: "https://a0.muscache.com/im/pictures/miso/Hosting-771088465922817191/original/6df092b3-e3d2-40fa-b623-dc70d1ddcdf4.jpeg?im_w=1200" }
//   ];

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
//       <ul className="space-y-4">
//         {reservations.map(reservation => (
//           <li
//             key={reservation.id}
//             className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
//           >
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold">{reservation.property}</h3>
//                 <p className="text-gray-600">Ubicación: {reservation.location}</p>
//                 <p className="font-medium">
//                   Fecha de entrada: <span className="text-blue-500">{reservation.checkIn}</span>
//                 </p>
//                 <p className="font-medium">
//                   Fecha de salida: <span className="text-blue-500">{reservation.checkOut}</span>
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Huéspedes: {reservation.guests}, Estado: <span className={`font-semibold ${reservation.state === 'Activa' ? 'text-green-500' : 'text-red-500'}`}>{reservation.state}</span>
//                 </p>
//               </div>
//               <img
//               src={reservation.imageUrl}
//               alt={reservation.property}
//               className="w-32 h-20 object-cover ml-4 rounded-md"
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyReservations;

import React, { useEffect, useState } from "react";
import { IReservationDetail } from "../../interfaces/ReservationDetail";
import useFetchUser from "@/hooks/useFetchUser";

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<IReservationDetail[]>([]);
  const { user, loading, error } = useFetchUser();

  useEffect(() => {
    if (user?.reservations && Array.isArray(user.reservations)) {
      setReservations(user.reservations as unknown as IReservationDetail[]);
    }
  }, [user]);
  

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
      <ul className="space-y-4">
        {reservations.map((reservationDetail) => (
          <li
            key={reservationDetail.id}
            className="flex items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {reservationDetail.property}
              </h3>
              <p className="text-gray-600">
                Fecha de entrada:{" "}
                <span className="text-blue-500">
                  {reservationDetail.checkIn}
                </span>
              </p>
              <p className="text-gray-600">
                Fecha de salida:{" "}
                <span className="text-blue-500">
                  {reservationDetail.checkOut}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Huéspedes: {reservationDetail.pax}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReservations;
