import { useContext } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext } from "@/context/AuthContext";

const useAuth = () => {
  const { setAuthState } = useContext(AuthContext);
  async function login(
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      setAuthState({
        loading: false,
        data: res.data.user,
        error: null,
      });
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string };
      setAuthState({
        loading: false,
        data: null,
        error: data.message,
      });
    }
  }

  async function signup(
    {
      firstName,
      lastName,
      city,
      email,
      phone,
      password,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const res = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        city,
        email,
        phone,
        password,
      });
      setAuthState({
        loading: false,
        data: res.data.user,
        error: null,
      });
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string };
      setAuthState({
        loading: false,
        data: null,
        error: data.message,
      });
    }
  }

  return {
    login,
    signup,
  };
};

export default useAuth;
