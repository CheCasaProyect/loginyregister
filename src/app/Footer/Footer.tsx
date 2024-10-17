const Footer = () => {
    return (
      <div className="bg-gray-100 w-full"> {/* Fondo blanco apagado */}
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
              <div>
                <p className="font-medium tracking-wide text-black">Category</p> {/* Texto negro */}
                <ul className="mt-2 space-y-2">
                  <li>
                    <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                      World
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                      Games
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                      References
                    </a>
                  </li>
                </ul>
              </div>
              {/* Otros bloques similares aquí */}
            </div>
            <div className="md:max-w-md lg:col-span-2">
              <span className="text-base font-medium tracking-wide text-black">Subscribe for updates</span> {/* Texto negro */}
              <form className="flex flex-col mt-4 md:flex-row">
                <input
                  placeholder="Email"
                  type="text"
                  className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-gray-500 focus:outline-none focus:shadow-outline"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-600">
                Bacon ipsum dolor amet short ribs pig sausage prosciuto chicken spare ribs salami.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-300 sm:flex-row">
            <p className="text-sm text-gray-600">© Copyright 2020 Lorem Inc. All rights reserved.</p>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              {/* Iconos de redes sociales */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;