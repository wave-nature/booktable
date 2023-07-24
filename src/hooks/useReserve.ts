import axios from "axios";
import { useState } from "react";

export default function () {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  async function reserveBooking({
    slug,
    day,
    time,
    partySize,
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: number;
    bookerEmail: string;
    bookerPhone: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerOccasion: string;
    bookerRequest: string;
  }) {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/restaurant/${slug}/reserve`,
        {
          bookerEmail,
          bookerPhone,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize: String(partySize),
          },
        }
      );
      setData(res.data.message);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setData("");
      setError(error.response.data.message);
    }
  }

  return { loading, error, data, reserveBooking };
}
