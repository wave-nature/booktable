import Navbar from "@/components/Navbar";
import Serachbar from "@/components/Serachbar";
import Sidebar from "./components/Sidebar";
import RestauarantCard from "./components/RestaurantCard";

interface pageProps {}

export default function <pageProps>({}) {
  return (
    <main className="max-w-screen-2xl m-auto bg-white">
      <Navbar />
      <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
        <Serachbar />
      </div>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <Sidebar />
        <div className="w-5/6">
          <RestauarantCard />
        </div>
      </div>
    </main>
  );
}
