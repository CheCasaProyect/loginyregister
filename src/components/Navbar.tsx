"use client";
import React from 'react';
import Link from "next/link";

interface NavbarProps {
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>; // Hacer que sea opcional
}

const Navbar: React.FC<NavbarProps> = ({ setSearchTerm }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) { // Verificar si se proporcionó `setSearchTerm`
      setSearchTerm(e.target.value);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="https://gcdnb.pbrd.co/images/iTKeM8yxSMmq.png?o=1" 
              alt="Logo" 
              style={{ maxWidth: '120px', height: 'auto' }} 
            />
          </Link>
        </div>

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

        {/* Botones */}
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