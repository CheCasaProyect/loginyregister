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

        
        <div
  className="relative flex"
  data-twe-input-wrapper-init
  data-twe-input-group-ref>
  <input
    type="search"
    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
    placeholder="Search"
    aria-label="Search"
    id="exampleFormControlInput"
    aria-describedby="basic-addon1" />
  <label
    htmlFor="exampleFormControlInput"
    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Search
  </label>
  <button
    className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
    type="button"
    id="button-addon1"
    data-twe-ripple-init
    data-twe-ripple-color="light">
    <span className="[&>svg]:h-5 [&>svg]:w-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </span>
  </button>
</div>

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