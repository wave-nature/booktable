import Link from "next/link";
import prisma from "@/utils/db";
import { PRICE } from "@prisma/client";

async function fetchRegions() {
  const regions = await prisma.location.findMany();
  return regions;
}
async function fetchCuisins() {
  const cuisins = await prisma.cuisine.findMany();
  return cuisins;
}

interface pageProps {
  searchParams: {
    city?: string;
    cuisine?: string;
    price?: PRICE;
  };
}

export default async function ({ searchParams }: pageProps) {
  const [regions, cuisins] = await Promise.all([
    fetchRegions(),
    fetchCuisins(),
  ]);

  // const regions = await fetchRegions();
  // const cuisins = await fetchCuisins();

  return (
    <div className="w-1/5 mr-3">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {regions.map((region) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: region.name,
              },
            }}
            key={region.id}
            className="font-light text-reg capitalize block"
          >
            {region.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisins.map((cuisin) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisin.name,
              },
            }}
            key={cuisin.id}
            className="block font-light text-reg capitalize"
          >
            {cuisin.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.CHEAP,
              },
            }}
            className="border w-full text-reg font-light rounded-l p-2"
          >
            $
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.REGULAR,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.EXPENSIVE,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}
