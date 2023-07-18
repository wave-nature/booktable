import { ReactNode } from "react";
import type { Metadata } from "next";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ReservationCard from "./components/ReservationCard";

export const metadata: Metadata = {
  title: "Name | BookTable",
};

export default function ({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return (
    <>
      <Header slug={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <Navbar slug={params.slug} />
          {/* RESAURANT NAVBAR */}
          {children}
        </div>
        <div className="w-[25%] relative text-reg">
          <ReservationCard />
        </div>
      </div>
    </>
  );
}
