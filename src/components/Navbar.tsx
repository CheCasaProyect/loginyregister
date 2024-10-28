"use client";

import React from 'react';
import Link from "next/link";

interface NavbarProps {
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchTerm }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario
    console.log("Search submitted!");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="https://gcdnb.pbrd.co/images/iTKeM8yxSMmq.png?o=1" 
              alt="Logo" 
              style={{ maxWidth: '200px', height: 'auto' }}
              className="h-15 w-20 mr-2"
            />
          </Link>
        </div>

        {/* Barra de búsqueda estilizada */}
        <form className="relative flex" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="peer block w-72 md:w-96 rounded-full border-2 border-gray-300 bg-gray-100 text-gray-800 px-4 py-3 leading-[1.6] outline-none transition-all duration-300 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:bg-white shadow-sm"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchChange}
          />
          <button
  type="submit"
  className="absolute right-0 top-1 mt-1 mr-2 px-4 py-2 bg-indigo-500 text-white font-medium text-sm md:text-base rounded-full shadow-lg hover:bg-indigo-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
>
  Buscar
</button>
        </form>

        {/* Botones */}
        <div className="flex space-x-4">
  <Link href="/login">
    <button className="px-4 py-2 bg-indigo-500 text-white font-medium text-sm md:text-base rounded-md shadow-lg hover:bg-indigo-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
      Iniciar Sesión
    </button>
  </Link>
  <Link href="/register">
    <button className="px-4 py-2 bg-gray-200 text-gray-800 font-medium text-sm md:text-base rounded-md shadow-lg hover:bg-gray-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
      Registrarse
    </button>
  </Link>
</div>
      </div>
    </nav>
  );
}

export default Navbar;