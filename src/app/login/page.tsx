"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import Image from 'next/image';
import { useAuth, loginWithGoogle } from "../../hooks/useLogin"
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const {login, error, successMessage} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Email es obligatorio"),
    password: Yup.string().required("Contraseña es obligatoria"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    await login(values);
    setSubmitting(false);
  };
    
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#fffefe] text-[#0a0a0a] pt-20 lg:pt-40 pb-20">
  <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-2xl px-5 sm:px-10 mb-10 lg:mb-0">
    <Image
      src="https://i.postimg.cc/G3QXSw8Y/carpincho.png"
      alt="Carpi Bienvenida"
      width={300}
      height={300}
      className="object-cover w-48 h-48 sm:w-64 sm:h-64 mb-6 lg:mb-0 lg:mr-8"
    />
    <div className="text-center lg:text-left">
      <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
        Che! Volviste
      </h2>
      <p className="leading-relaxed text-base sm:text-lg lg:text-xl mb-6">
        Bienvenido a la experiencia del turismo argentino. Desde la majestuosidad de la Patagonia hasta las vibrantes ciudades, estamos aquí para ayudarte a planificar tu próxima aventura.
      </p>
    </div>
  </div>
  <div className="w-full max-w-lg p-6 sm:p-8 bg-white bg-opacity-90 border border-[#0a0a0a] rounded-md shadow-lg space-y-6 lg:ml-20">
    <h2 className="text-xl sm:text-2xl font-bold text-center tracking-wider">
      Inicia sesión
    </h2>

    {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="relative">
            <label className="sr-only">Email</label>
            <Field
              type="email"
              name="email"
              className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="relative">
                <label className="sr-only">Contraseña</label>
                <Field
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Contraseña"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="submit"
              className="flex-1 border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 bg-[#a6d2ff] rounded-md hover:bg-[#76bafe] transition duration-300"
              disabled={isSubmitting}
            >
            {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-[#0a0a0a]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Iniciando sesión...
                    </>
                  ) : (
                    "Inicia Sesión"
                  )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
    <button
  onClick={loginWithGoogle}
  className="flex items-center justify-center w-full border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 bg-[#f8f9fa] rounded-md hover:bg-[#efefe9] transition duration-300"
>
  <Image
    src="https://i.postimg.cc/kX92B8Gx/images-Photoroom.png"
    alt="Google Logo"
    width={24}
    height={24}
    className="mr-2"
  />
  Inicia sesión con Google
</button>
    <div className="text-center mt-4">
          <p className="text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/register">
              <span className="text-blue-600 hover:underline">Regístrate aquí</span>
            </Link>
          </p>
        </div>
  </div>
</div>
  );
};

export default Login;
