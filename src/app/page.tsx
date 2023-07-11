import Navbar from "@/components/Navbar";
import RestauarantCard from "@/components/RestauarantCard";
import Serachbar from "@/components/Serachbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-screen-2xl m-auto bg-white">
      <Navbar />
      <main>
        <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
          <div className="text-center mt-10">
            <h1 className="text-white text-5xl font-bold mb-2">
              Find your table for any occasion
            </h1>
            <Serachbar />
          </div>
        </div>
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-start">
          <RestauarantCard />
          <RestauarantCard />
          <RestauarantCard />
          <RestauarantCard />
          <RestauarantCard />
        </div>
      </main>
    </main>
  );
}
