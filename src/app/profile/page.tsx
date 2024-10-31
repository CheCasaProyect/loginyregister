"use client";
import { useEffect, useState } from "react";
import { reservas } from "../utilities/reservas";
import { useAuthStore } from "@/store/authStore";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("perfil");
  const { user, setUser, token } = useAuthStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && user) {
        try {
          const response = await fetch(`/users/${user.id}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
          }

          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token, user, setUser]);

  return (
    <div className="flex min-h-screen bg-[#f2f2f2] text-[#0a0a0a]">
      <aside className="w-full md:w-1/4 text-[#0a0a0a] p-3 space-y-2 ">
        <nav className="space-y-4 mt-24">
          <div className="w-60">
            <button
              onClick={() => setActiveSection("perfil")}
              className="block w-60 text-left py-2 px-4 rounded-md bg-[#efefef] shadow-[0px_1px_3px_rgba(0,0,0,0.1)] hover:bg-[#e6e6e6] transition-colors duration-200"
            >
              Mi Perfil
            </button>
          </div>
          <div className="w-60">
            <button
              onClick={() => setActiveSection("propiedades")}
              className="block w-60 text-left py-2 px-4 rounded-md bg-[#efefef] shadow-[0px_1px_3px_rgba(0,0,0,0.1)] hover:bg-[#e6e6e6] transition-colors duration-200"
            >
              Mis Propiedades
            </button>
          </div>
          <div className="w-60">
            <button
              onClick={() => setActiveSection("reservas")}
              className="block w-60 text-left py-2 px-4 rounded-md bg-[#efefef] shadow-[0px_1px_3px_rgba(0,0,0,0.1)] hover:bg-[#e6e6e6] transition-colors duration-200"
            >
              Mis Reservas
            </button>
          </div>
        </nav>
      </aside>

      <main className="w-3/4 p-8 mt-1">
        {activeSection === "perfil" && (
          <section className="bg-white p-6 rounded-md shadow-md mb-8 flex items-center space-x-6">
            <img
              src="https://i.postimg.cc/G3QXSw8Y/carpincho.png"
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover shadow-sm"
            />
            <div>
              <h3 className="text-xl font-bold mb-4">Mi Perfil</h3>
              {user ? (
                <div className="mb-4">
                  <p><span className="font-semibold">Nombre:</span> {user.firstname} {user.lastname}</p>
                  <p><span className="font-semibold">Correo electrónico:</span> {user.email}</p>
                  {/* <p><span className="font-semibold">Dirección:</span> {user.addres}</p> */}
                  <p><span className="font-semibold">Teléfono:</span> {user.phone}</p>
                </div>
              ) : (
                <p>Cargando información del usuario...</p>
              )}
            </div>
          </section>
        )}
        {activeSection === "propiedades" && (
          <section className="bg-white p-6 rounded-md shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Mis Propiedades</h3>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Agregar propiedad
              </button>
            </div>
            <table className="w-full text-left border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Nombre del inmueble</th>
                  <th className="px-4 py-2 border">Fechas reservadas</th>
                  <th className="px-4 py-2 border">Precio</th>
                  <th className="px-4 py-2 border">Dirección</th>
                  <th className="px-4 py-2 border">Imágenes</th>
                  <th className="px-4 py-2 border">Capacidad</th>
                  <th className="px-4 py-2 border">No. Cuartos</th>
                  <th className="px-4 py-2 border">Baños</th>
                  <th className="px-4 py-2 border">Adicionales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Propiedad 1</td>
                  <td className="px-4 py-2 border">Fecha 1</td>
                  <td className="px-4 py-2 border">$100</td>
                  <td className="px-4 py-2 border">Dirección 1</td>
                  <td className="px-4 py-2 border">Imagen</td>
                  <td className="px-4 py-2 border">4</td>
                  <td className="px-4 py-2 border">2</td>
                  <td className="px-4 py-2 border">1</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:underline">
                        Editar
                      </button>
                      <button className="text-red-500 hover:underline">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
        {activeSection === "reservas" && (
          <section className="bg-white p-6 rounded-md shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Mis Reservas</h3>
            {reservas.map((reserva) => (
              <div key={reserva.id} className="mb-4 border-b border-gray-200 pb-4">
                <p><span className="font-semibold">Propiedad:</span> {reserva.propiedad}</p>
                <p><span className="font-semibold">Ubicación:</span> {reserva.ubicacion}</p>
                <p><span className="font-semibold">Check-in:</span> {reserva.checkIn}</p>
                <p><span className="font-semibold">Check-out:</span> {reserva.checkOut}</p>
                <p><span className="font-semibold">Huéspedes:</span> {reserva.huespedes}</p>
                <p><span className="font-semibold">Estado:</span> {reserva.estado}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
