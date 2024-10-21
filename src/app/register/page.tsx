"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useState } from "react";
import Image from 'next/image';

const Register = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Nombre es obligatorio"),
    lastName: Yup.string().required("Apellido es obligatorio"),
    email: Yup.string().email("Formato de email inválido").required("Email es obligatorio"),
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Confirmación de contraseña es obligatoria'),
    address: Yup.string().required("Dirección es obligatoria"),
    phone: Yup.string().required("Teléfono es obligatorio"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    setError("");
    setSuccessMessage("");
//ver enrutado del back cuando este listo
    try {
      const response = await fetch("http://localhost:3002/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error al registrar. Intentá de nuevo.");
      }

      const data = await response.json();
      setSuccessMessage("¡Registro exitoso!");
      setError("");

      router.push("/login");
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
      <div className="flex-1 flex items-center justify-center max-w-md px-10">
        <Image
          src="/image/carpi.svg"
          alt="Carpi Bienvenida"
          width={256}
          height={256}
          className="object-cover mr-4" 
        />
        <div>
          <h2 className="text-6xl font-bold mb-4">Che! Registrate</h2>
          <p className="leading-relaxed mb-6">
          "Bienvenido a tu próxima aventura en Argentina. Registrate para descubrir los mejores alojamientos locales y viví una experiencia única en cada rincón del país."
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-full max-w-lg p-8 bg-white bg-opacity-90 border border-[#0a0a0a] rounded-md shadow-lg space-y-6 mr-20">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center tracking-wider">
            Crear una cuenta
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
                  <label className="sr-only">Nombre</label>
                  <Field
                    type="text"
                    name="firstName"
                    className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                    placeholder="Nombre"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="relative">
                  <label className="sr-only">Apellido</label>
                  <Field
                    type="text"
                    name="lastName"
                    className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                    placeholder="Apellido"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>

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
                  <label className="sr-only">Dirección</label>
                  <Field
                    type="text"
                    name="address"
                    className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                    placeholder="Dirección"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="relative">
                  <label className="sr-only">Teléfono</label>
                  <Field
                    type="text"
                    name="phone"
                    className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                    placeholder="Teléfono"
                  />
                  <ErrorMessage
                    name="phone"
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

                <div className="relative">
                  <label className="sr-only">Confirmar Contraseña</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                    placeholder="Confirmar Contraseña"
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
                    {isSubmitting ? "Registrando..." : "Registrar"}
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

export default Register;
