"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { deleteCookie } from "cookies-next";

export default function () {
  const { loading, data, setAuthState } = useContext(AuthContext);
  function logoutHandler() {
    deleteCookie("jwt");
    setAuthState({
      loading: false,
      data: null,
      error: null,
    });
  }
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        BookTable{" "}
      </Link>
      <div>
        {!data ? (
          <div className="flex">
            <AuthModal login={true} />
            <AuthModal login={false} />
          </div>
        ) : (
          <button
            className="bg-red-400 text-white border p-1 px-4 rounded mr-3"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
