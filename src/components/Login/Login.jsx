// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       router.push("/profile");
//     }
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); 
//     setError("");
//     setSuccessMessage("");

//     if (!email || !password) {
//       setError("Todos los campos son requeridos");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3002/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError("The credentials are incorrect. Please try again.");
//         } else {
//           throw new Error("Login failed. Please check your credentials.");
//         }
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       const userData = {
//         name: data.user.name,
//         email: data.user.email,
//         address: data.user.address,
//         phone: data.user.phone,
//       };
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(userData));

//       setSuccessMessage("Login successful!");
//       setError("");
//       setLoading(false);

//       router.push("/profile");
//     } catch (error) {
//       setError(error.message || "An unknown error occurred.");
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
//       <div className="w-full max-w-lg p-8 bg-[#0a0a0a] bg-opacity-80 border border-white/20 rounded-md shadow-lg space-y-6 ml-60">
//         <h2 className="text-2xl font-bold text-center tracking-wider">INICIAR SESIÓN</h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}
//         {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//             <label className="sr-only">Email</label>
//             <input
//               type="email"
//               className="w-full bg-transparent border-b border-gray-300 text-lg text-gray-300 placeholder-gray-500 focus:outline-none p-2"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="relative">
//             <label className="sr-only">Contraseña</label>
//             <input
//               type="password"
//               className="w-full bg-transparent border-b border-gray-300 text-lg text-gray-300 placeholder-gray-500 focus:outline-none p-2"
//               placeholder="Contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex justify-between mt-6 space-x-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex-1 border border-gray-400 text-gray-300 text-sm py-2 rounded-md hover:bg-gray-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               {loading ? "Cargando..." : "Iniciar sesión"}
//             </button>

//             <button
//               onClick={() => signIn("google")}
//               className="flex-1 border border-gray-400 text-gray-300 text-sm py-2 rounded-md hover:bg-gray-700 transition duration-300"
//             >
//               Iniciar sesión con Google
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

  
// };

// export default Login;
"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Email es obligatorio"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        "Debe contener entre 8 y 15 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
      )
      .required("Contraseña es obligatoria"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Formulario enviado con valores:", values);
    setSubmitting(false);
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("google", { redirect: false });
      
      if (result?.error) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: result.error,
        });
      } else {
        localStorage.setItem("accessToken", result?.url || "");
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "¡Bienvenido!",
        });
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Error desconocido:", error);
      Swal.fire({
        icon: "error",
        title: "Error desconocido",
        text: "Ha ocurrido un error inesperado.",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#fffefe] text-[#0a0a0a] pt-20 lg:pt-40 pb-20">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white bg-opacity-90 border border-[#0a0a0a] rounded-md shadow-lg space-y-6 lg:ml-20">
        <h2 className="text-xl sm:text-2xl font-bold text-center tracking-wider">
          Inicia sesión
        </h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Contraseña"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
                <button
                  type="button"
                  aria-label="Mostrar/Ocultar contraseña"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 bg-[#a6d2ff] rounded-md hover:bg-[#76bafe] transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Inicia Sesión"}
              </button>
            </Form>
          )}
        </Formik>

        <button onClick={signInWithGoogle} className="flex items-center justify-center w-full border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 bg-[#f8f9fa] rounded-md hover:bg-[#efefe9] transition duration-300">
          <Image src="https://i.postimg.cc/kX92B8Gx/images-Photoroom.png" alt="Google Logo" width={24} height={24} className="mr-2" />
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
