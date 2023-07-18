import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import ReviewCard from "./components/ReviewCard";
import prisma from "@/utils/db";

interface pageProps {
  params: {
    slug: string;
  };
}

interface Restaurant {
  id: number;
  name: string;
  location: Location;
  images: string[];
  description: string;
}

async function fetchRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      location: true,
      images: true,
      description: true,
    },
  });

  if (!restaurant) throw new Error();

  return restaurant;
}

export default async function ({ params }: pageProps) {
  const restaurant = await fetchRestaurant(params.slug);
  return (
    <>
      <Title title={restaurant.name} />
      <Rating />
      <Description description={restaurant.description} />
      <Images images={restaurant.images} />
      <div>
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          What 100 people are saying
        </h1>
        <div>
          <ReviewCard />
        </div>
      </div>
    </>
  );
}
