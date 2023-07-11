import Navbar from "@/components/Navbar";
import ReservationForm from "./components/RervationForm";
import ReservationHeader from "./components/ReservationHeader";

interface pageProps {}

export default function ({}) {
  return (
    <main className="max-w-screen-2xl m-auto bg-white">
      <Navbar />
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <ReservationHeader />
          <ReservationForm />
        </div>
      </div>
    </main>
  );
}
