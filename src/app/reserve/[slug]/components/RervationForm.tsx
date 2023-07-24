"use client";
import useReserve from "@/hooks/useReserve";
import { Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface Inputs {
  bookerEmail: string;
  bookerPhone: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerOccasion: string;
  bookerRequest: string;
}

export default function ({
  slug,
  day,
  time,
  partySize,
}: {
  slug: string;
  day: string;
  time: string;
  partySize: number;
}) {
  const { loading, error, data, reserveBooking } = useReserve();
  const [inputs, setInputs] = useState<Inputs>({
    bookerEmail: "",
    bookerPhone: "",
    bookerFirstName: "",
    bookerLastName: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (Object.values(inputs).every((el) => el)) {
      setDisabled(false);
      return;
    } else setDisabled(true);
  }, [inputs]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        location.href = "/";
      }, 2000);
    }
  }, [data]);

  function onChangeHanlder(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onClickHandler() {
    const {
      bookerEmail,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerPhone,
      bookerRequest,
    } = inputs;
    await reserveBooking({
      slug,
      day,
      time,
      partySize,
      bookerEmail,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerPhone,
      bookerRequest,
    });
  }

  return (
    <>
      {data && (
        <Alert className="mt-5 w-1/2" severity="success">
          {data}
        </Alert>
      )}

      <div className="mt-10 flex flex-wrap justify-between w-[660px]">
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="First name"
          name="bookerFirstName"
          onChange={onChangeHanlder}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="Last name"
          name="bookerLastName"
          onChange={onChangeHanlder}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="Phone number"
          name="bookerPhone"
          onChange={onChangeHanlder}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="Email"
          name="bookerEmail"
          onChange={onChangeHanlder}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="Occasion "
          name="bookerOccasion"
          onChange={onChangeHanlder}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="Requests "
          name="bookerRequest"
          onChange={onChangeHanlder}
        />
        <button
          disabled={disabled || loading}
          onClick={onClickHandler}
          className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
        >
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            " Complete reservation"
          )}
        </button>
        <p className="mt-4 text-sm">
          By clicking “Complete reservation” you agree to the OpenTable Terms of
          Use and Privacy Policy. Standard text message rates may apply. You may
          opt out of receiving text messages at any time.
        </p>
      </div>
    </>
  );
}
