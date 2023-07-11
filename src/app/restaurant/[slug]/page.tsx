import MainNavbar from "@/components/Navbar";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import ReviewCard from "./components/ReviewCard";
import ReservationCard from "./components/ReservationCard";
import Header from "./components/Header";

interface pageProps {}

export default function <pageProps>({}) {
  return (
    <main className="max-w-screen-2xl m-auto bg-white">
      {/* NAVBAR */}
      <MainNavbar />
      <Header />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          {/* RESAURANT NAVBAR */}
          <Navbar />
          <Title />
          <Rating />
          <Description />
          <Images />
          <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
              What 100 people are saying
            </h1>
            <div>
              <ReviewCard />
            </div>
          </div>
        </div>
        <ReservationCard />
      </div>
    </main>
  );
}
