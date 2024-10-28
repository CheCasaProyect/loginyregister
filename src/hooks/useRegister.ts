import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const { setToken, setUser, setError, setSuccessMessage, clearMessages } = useAuthStore();
  const router = useRouter();
  const [localError, setLocalError] = useState("");

  const registerUser = async (values: any) => {
    setError("");
    setSuccessMessage("");
    clearMessages();
//cambiar ruta cuando este back
    try {
      const response = await fetch("https://proyectochecasa.onrender.com/auth/signup", {
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
    
      setToken(data.token);
      setUser(data.user); 
      setSuccessMessage("¡Registro exitoso!");

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Serás redirigido al login',
        confirmButtonColor: '#0a0a0a',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          router.push("/login");
        }
      });

    } catch (error) {
      if (error instanceof Error) {
        setLocalError(error.message);
        setError(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
          confirmButtonColor: '#0a0a0a',
        });
      } else {
        setLocalError("Un error desconocido ocurrió.");
        setError("Un error desconocido ocurrió.");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Un error desconocido ocurrió.',
          confirmButtonColor: '#0a0a0a',
        });
      }
    }
  };

  return { registerUser, localError };
};


