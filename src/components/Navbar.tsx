'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import  useAuthStore  from '@/store/authStore';

interface NavbarProps {
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
}

interface IUserSession {
  user: {
    email: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ setSearchTerm }) => {
  const router = useRouter();
  const { user, resetForm } = useAuthStore();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search submitted!');
  };

  const handleLogout = () => {
    resetForm();
    setUserData(null);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="https://gcdnb.pbrd.co/images/iTKeM8yxSMmq.png?o=1" 
              alt="Logo" 
              className="h-10 w-20 md:h-15 md:w-20 mr-2"
            />
          </Link>
        </div>

        <form className="relative flex w-full md:w-auto mt-3 md:mt-0" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="peer block w-full md:w-72 lg:w-96 rounded-full border-2 border-gray-300 bg-gray-100 text-gray-800 px-4 py-2 md:py-3 leading-6 outline-none transition-all duration-300 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:bg-white shadow-sm"
            placeholder="Buscar"
            aria-label="Buscar"
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="absolute right-0 top-1 mt-1 mr-2 px-3 md:px-4 py-2 bg-indigo-500 text-white font-medium text-xs md:text-sm lg:text-base rounded-full shadow-lg hover:bg-indigo-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Buscar
          </button>
        </form>

        <div className="flex space-x-2 md:space-x-4 mt-3 md:mt-0">
          {userData ? (
            <button
              onClick={handleLogout}
              className="px-3 md:px-4 py-2 bg-red-500 text-white font-medium text-xs md:text-sm lg:text-base rounded-md shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="px-3 md:px-4 py-2 bg-indigo-500 text-white font-medium text-xs md:text-sm lg:text-base rounded-md shadow-lg hover:bg-indigo-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
                  Iniciar Sesión
                </button>
              </Link>
              <Link href="/register">
                <button className="px-3 md:px-4 py-2 bg-gray-200 text-gray-800 font-medium text-xs md:text-sm lg:text-base rounded-md shadow-lg hover:bg-gray-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;