import axios from "axios";
import { useState } from "react";

export default function () {
  const [error, setError] = useState();
  const [data, setData] = useState<{ time: string; available: boolean }[]>();
  const [loading, setLoading] = useState(false);

  async function fetchAvailability({
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
    setLoading(true);
    try {
      const res = await axios.get(`/api/restaurant/${slug}/availability`, {
        params: {
          day,
          time,
          partySize: String(partySize),
        },
      });

      setData(res.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }

  return { loading, error, data, fetchAvailability };
}
