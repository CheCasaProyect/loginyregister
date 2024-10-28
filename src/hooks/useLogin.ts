import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";

interface LoginValues {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();

  const login = async (values: LoginValues) => {
    setError(null);
    setSuccessMessage(null);
    
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Credenciales incorrectas. Intentá de nuevo",
          });
        } else {
          throw new Error("Error al iniciar sesión. Intentá de nuevo.");
        }
        return;
      }

      const data = await response.json();
      const { token, firstname, lastname, birthdate, email: userEmail, address, phone } = data.user;
      const userData = { firstname, lastname, birthdate, email: userEmail, address, phone };

      setToken(data.token);
      setUser(userData);

      setSuccessMessage("Inicio de sesión exitoso!");
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso!",
        text: "Serás redirigido al perfil.",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          router.push("/profile");
        }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Un error desconocido ocurrió.";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };
  
  return { login, error, successMessage };
};

export const loginWithGoogle = async () => {
   try { //cambiar ruta cuando este en back 
     const response = await fetch("/api/auth/google", {
       method: "POST",
       credentials: "include", 
     });
     if (response.ok) {
       console.log("Inicio de sesión con Google exitoso");
     } else {
       console.error("Error en el inicio de sesión con Google");
     }
   } catch (error) {
     console.error("Error al iniciar sesión con Google", error);
   }
 };
