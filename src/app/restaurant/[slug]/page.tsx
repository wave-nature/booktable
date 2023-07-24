import prisma from "@/utils/db";
import { Location, Review } from "@prisma/client";
import { calcAvgRating } from "@/utils/helpers";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import ReviewCard from "./components/ReviewCard";

interface pageProps {
  params: {
    slug: string;
  };
}

export type ReviewType = Review;

export interface Restaurant {
  id: number;
  name: string;
  location: Location;
  images: string[];
  description: string;
  reviews: Review[];
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
      reviews: true,
    },
  });

  if (!restaurant) throw new Error("No Restaurant Found 🙄");

  return restaurant;
}

export default async function ({ params }: pageProps) {
  const restaurant = await fetchRestaurant(params.slug);
  const ratings = calcAvgRating(restaurant.reviews);
  return (
    <>
      <Title title={restaurant.name} />
      <Rating reviews={restaurant.reviews.length} ratings={ratings} />
      <Description description={restaurant.description} />
      <Images images={restaurant.images} />
      <div>
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          What {restaurant.reviews.length}{" "}
          {restaurant.reviews.length > 1 ? "people" : "person"}{" "}
          {restaurant.reviews.length > 1 ? "are" : "is"} saying
        </h1>
        <div>
          {restaurant.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </>
  );
}
