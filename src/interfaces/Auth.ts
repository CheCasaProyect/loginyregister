import IUser from "../interfaces/Iuser"

export default interface IAuthState {
    token: string | null;
    user: IUser | null;
    error: string;
    successMessage: string;
    setToken: (token: string) => void;
    setUser: (user: IUser) => void;
    setError: (error: string) => void;
    setSuccessMessage: (message: string) => void;
  }