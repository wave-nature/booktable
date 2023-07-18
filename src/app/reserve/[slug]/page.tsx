import type { Metadata } from "next";

import ReservationForm from "./components/RervationForm";
import ReservationHeader from "./components/ReservationHeader";

export const metadata: Metadata = {
  title: "Reserve | BookTable",
  description: "Reserve your table",
};

interface pageProps {}

export default function ({}) {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReservationHeader />
        <ReservationForm />
      </div>
    </div>
  );
}
