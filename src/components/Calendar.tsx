"use client";

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SelectorDeFechas = () => {
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState<Date[] | null>(null);
  const [fechasReservadas, setFechasReservadas] = useState<Date[]>([]);

  useEffect(() => {
    fetch('/api/obtener-fechas-reservadas')
      .then(res => res.json())
      .then(data => setFechasReservadas(data.fechasReservadas))
      .catch(err => console.error(err));
  }, []);

  const manejarCambioDeFecha = (dates: Date | Date[] | null) => {
    if (Array.isArray(dates)) {
      setFechasSeleccionadas(dates);
    } else {
      setFechasSeleccionadas(null);
    }
  };

  const manejarEnvioDeFecha = async () => {
    const respuesta = await fetch('/api/reservar-fechas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fechasSeleccionadas }),
    });
    if (respuesta.ok) {
      alert("¡Fechas reservadas con éxito!");
    } else {
      alert("Error al reservar fechas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <h1 className="text-3xl font-bold mb-4 animate-fadeIn">Reserva tus fechas</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full mb-6 transform transition duration-300 hover:scale-105">
        <Calendar
          selectRange
          onChange={manejarCambioDeFecha}
          tileDisabled={({ date }) => 
            fechasReservadas.some(
              fechaReservada => fechaReservada.getTime() === date.getTime()
            )
          }
          className="calendar-tailwind"
        />
      </div>
      
      <button 
        onClick={manejarEnvioDeFecha}
        className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-700 transition-transform duration-200 transform hover:scale-110 shadow-lg"
      >
        Reservar Fechas
      </button>
    </div>
  );
};

export default SelectorDeFechas;