"use client";

import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useAuth from "@/hooks/useAuth";
import { AuthContext } from "@/context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export default function BasicModal({ login }: { login: boolean }) {
  const { signup, login: loginHandler } = useAuth();
  const { loading, data, error } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState<Inputs>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (login) {
      if (inputs.email && inputs.password) {
        setDisabled(false);
        return;
      }
    } else {
      if (Object.values(inputs).every((el) => el)) {
        setDisabled(false);
        return;
      }
    }
    setDisabled(true);
  }, [inputs]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAuth = () => {
    login
      ? loginHandler(
          { email: inputs.email, password: inputs.password },
          handleClose
        )
      : signup(
          {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            city: inputs.city,
            phone: inputs.phone,
            email: inputs.email,
            password: inputs.password,
          },
          handleClose
        );
  };

  function renderContent(loginContent: any, signupContent: any) {
    return login ? loginContent : signupContent;
  }

  return (
    <div>
      {login ? (
        <button
          className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
          onClick={handleOpen}
        >
          Sign in
        </button>
      ) : (
        <button className="border p-1 px-4 rounded" onClick={handleOpen}>
          Sign up
        </button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm">
                {renderContent("Sign In", "Create Account")}
              </p>
            </div>

            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent(
                  "Log Into Your Account",
                  "Create Your BookTable Account"
                )}
              </h2>
              <div>
                {error && (
                  <Alert severity="error" className="my-4">
                    {error}
                  </Alert>
                )}
                {data && (
                  <Alert severity="success">
                    {login ? "Logged in" : "Sign up"} successfully
                  </Alert>
                )}
                {!login && (
                  <div className="my-3 flex justify-between text-sm">
                    <input
                      type="text"
                      className="border rounded p-2 py-3 w-[49%]"
                      placeholder="First Name"
                      name="firstName"
                      value={inputs.firstName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="border rounded p-2 py-3 w-[49%]"
                      name="lastName"
                      value={inputs.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </div>
                )}
                <div className="my-3 flex justify-between text-sm">
                  <input
                    type="email"
                    className="border rounded p-2 py-3 w-full"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                {!login && (
                  <div className="my-3 flex justify-between text-sm">
                    <input
                      type="text"
                      className="border rounded p-2 py-3 w-[49%]"
                      name="phone"
                      value={inputs.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      className="border rounded p-2 py-3 w-[49%]"
                      name="city"
                      value={inputs.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                  </div>
                )}
                <div className="my-3 flex justify-between text-sm">
                  <input
                    type="password"
                    className="border rounded p-2 py-3 w-full"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                onClick={handleAuth}
                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-slate-400"
                disabled={loading || disabled}
              >
                {renderContent("Sign In", "Create Account")}
                {loading && (
                  <CircularProgress
                    size={20}
                    color="primary"
                    className="ml-2 text-white"
                  />
                )}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
