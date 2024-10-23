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
    // Aquí puedes manejar la lógica de búsqueda si es necesario
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
        {setSearchTerm && (
          <form className="relative flex" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              className="peer block min-h-[auto] w-full rounded border-2 border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchChange}
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 mt-2 mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              Buscar
            </button>
          </form>
        )}

        {/* Barra de búsqueda (Solo si `setSearchTerm` está presente) */}
        {setSearchTerm && (
          <div className="relative flex">
            <input
              type="search"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchChange}
            />
            <button type="button" className="ml-2">
              Buscar
            </button>
          </div>
        )}

        <div className="flex space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 bg-indigo-500 text-gray-800 rounded-md hover:bg-indigo-600 transition">
              Log In
            </button>
          </Link>
          <Link href="/register">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            Register
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;