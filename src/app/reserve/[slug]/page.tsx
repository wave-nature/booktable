import type { Metadata } from "next";

import ReservationForm from "./components/RervationForm";
import ReservationHeader from "./components/ReservationHeader";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Reserve | BookTable",
  description: "Reserve your table",
};

interface pageProps {
  params: {
    slug: string;
  };
  searchParams: {
    day: string;
    time: string;
    partySize: string;
  };
}
async function fetchRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });
  if (!restaurant) notFound();
  return restaurant;
}
export default async function ({ params, searchParams }: pageProps) {
  const { slug } = params;
  const { day, time, partySize } = searchParams;
  const restaurant = await fetchRestaurant(slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReservationHeader
          restaurant={restaurant}
          day={day}
          time={time}
          partySize={partySize}
        />
        <ReservationForm
          slug={slug}
          day={day}
          time={time}
          partySize={parseInt(partySize)}
        />
      </div>
    </div>
  );
}
