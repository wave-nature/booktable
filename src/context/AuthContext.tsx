"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";

type User = {
  id: number;
  firstName: number;
  lastName: number;
  city: string;
  email: string;
  phone: string;
};

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>;
}

export const AuthContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const token = getCookie("jwt");
    if (!token) {
      return setAuthState({
        loading: false,
        data: null,
        error: null,
      });
    }
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await axios.post("/api/auth/me");
      setAuthState({
        loading: false,
        data: res.data.user,
        error: null,
      });
    } catch (err: any) {
      console.log(err);
      const data = err.response?.data as { message: string };
      setAuthState({
        loading: false,
        data: null,
        error: data.message,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
