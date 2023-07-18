import prisma from "@/utils/db";
import RestauarantCard from "@/components/RestauarantCard";
import Serachbar from "@/components/Serachbar";

import { PRICE, Cuisine, Location } from "@prisma/client";

export interface RestauarantCardType {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
}

async function fetchRestaurants(): Promise<RestauarantCardType[]> {
  return prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      price: true,
      cuisine: true,
      location: true,
      slug: true,
    },
  });
}

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
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
        {restaurants.map((restaurant) => (
          <RestauarantCard restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
// 7mMAEwNgtHitA4Sh
