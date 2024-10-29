"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

const DatePickerComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(null); 
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      setError("Por favor, selecciona ambas fechas.");
      return;
    }

    setError(""); 
    setSuccessMessage(""); 

    try {
      const response = await fetch("http://localhost:3002/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }), 
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Fechas enviadas exitosamente.");
      } else {
        throw new Error("Error al enviar las fechas.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Check In</label>
          <DatePicker
            selected={startDate ?? undefined}  
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={new Date()}
            className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Selecciona una fecha"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Check Out</label>
          <DatePicker
            selected={endDate ?? undefined} 
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={startDate ? addDays(startDate, 1) : new Date()}
            className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Selecciona una fecha"
          />
        </div>
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Enviar Fechas
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
    </div>
  );
};

export default DatePickerComponent;