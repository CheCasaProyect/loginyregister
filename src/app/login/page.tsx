"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useState } from "react";
import Image from 'next/image';

const Login = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

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
    setError("");
    setSuccessMessage("");
    //cambiar enrutado a back cuando este
    try {
      const response = await fetch("http://localhost:3002/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Credenciales incorrectas. Intentá de nuevo");
        } else {
          throw new Error("Error al iniciar sesión. Intentá de nuevo.");
        }
        return;
      }

      const data = await response.json();
      const { token, name, email: userEmail, address, phone } = data.user;
      const userData = { name, email: userEmail, address, phone };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setSuccessMessage("Incio de sesión exitoso!");
      setError("");

      router.push("/profile"); //decidir a donde dirigir cuando se loguea
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Un error desconocido ocurrió.");
      }
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="flex items-center justify-between min-h-screen bg-[#fffefe] text-[#0a0a0a]">
      {/* Contenedor para la imagen y el texto */}
      <div className="flex-1 flex items-center justify-center max-w-md px-10">
        <Image
          src="/image/carpi.svg"
          alt="Carpi Bienvenida"
          width={256}
          height={256}
          className="object-cover mr-4" // Añadido un margen derecho para separar la imagen del texto
        />
        <div>
          <h2 className="text-6xl font-bold mb-4">Che! Volviste</h2>
          <p className="leading-relaxed mb-6">
            Bienvenido a la experiencia del turismo argentino. Desde la
            majestuosidad de la Patagonia hasta las vibrantes ciudades, estamos
            aquí para ayudarte a planificar tu próxima aventura.
          </p>
        </div>
      </div>
      {/* Contenedor para el formulario */}
      <div className="flex justify-center items-center w-full max-w-lg p-8 bg-white bg-opacity-90 border border-[#0a0a0a] rounded-md shadow-lg space-y-6 mr-20">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center tracking-wider">
            Inicia sesión
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

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
                    type="password"
                    name="password"
                    className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                    placeholder="Contraseña"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex justify-between mt-6 space-x-4">
                  <button
                    type="submit"
                    className="flex-1 border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 rounded-md hover:bg-gray-300 transition duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Iniciando sesión..." : "Inicia Sesión"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
