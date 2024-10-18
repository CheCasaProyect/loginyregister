export interface IUser {
    firstname: string;
    lastname: string;
    birthdate: string;
    phone: string;
    email: string;
  }
  
  export interface IAuthState {
    token: string | null;
    user: IUser | null;
    error: string;
    successMessage: string;
    setToken: (token: string) => void;
    setUser: (user: IUser) => void;
    setError: (error: string) => void;
    setSuccessMessage: (message: string) => void;
  }

  export interface IAccommodation {
    id?: number;  
    title: string;
    description: string;
    price: number;
    image: string;
  }