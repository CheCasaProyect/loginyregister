"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup"; 
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Formato de email inválido").required("Email es obligatorio"),
    password: Yup.string().required("Contraseña es obligatoria"),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
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

      setSuccessMessage("Login successful!");
      setError("");

      router.push("/collections");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setSubmitting(false); // Detiene el estado de envío de Formik
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
      <div className="w-full max-w-lg p-8 bg-[#0a0a0a] bg-opacity-80 border border-white/20 rounded-md shadow-lg space-y-6 ml-60">
        <h2 className="text-2xl font-bold text-center tracking-wider">SIGN IN</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

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
                  className="w-full bg-transparent border-b border-gray-300 text-lg text-gray-300 placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div className="relative">
                <label className="sr-only">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full bg-transparent border-b border-gray-300 text-lg text-gray-300 placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>

              <div className="flex justify-between mt-6 space-x-4">
                <button
                  type="submit"
                  className="flex-1 border border-gray-400 text-gray-300 text-sm py-2 rounded-md hover:bg-gray-700 transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="flex-1 text-center flex items-center justify-center">
        <div className="max-w-xs text-white">
          <h2 className="text-6xl font-bold mb-4">Welcome Back!</h2>
          <p className="leading-relaxed">
            Join our community of learners and access exclusive content tailored to enhance your journey. By logging in, you can manage your account, track your progress, and stay updated with the latest resources. Your success is just a few clicks away. Don't have an account? Register now and start exploring!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
