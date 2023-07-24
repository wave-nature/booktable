import Link from "next/link";
import { calcAvgRating } from "@/utils/helpers";
import Star from "@/components/Star";
import { Restaurant } from "../page";

export default function ({ restaurant }: { restaurant: Restaurant }) {
  const ratings = calcAvgRating(restaurant.reviews);
  const ratingBehaviour =
    ratings > 4
      ? "Awesome"
      : ratings > 3
      ? "Average"
      : ratings > 2
      ? "Good"
      : "";
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="border-b flex pb-5"
    >
      <img src={restaurant.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-center">
          {<Star ratings={ratings} />}
          <p className="ml-2 text-sm">{ratingBehaviour}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <p className="mr-4">{restaurant.price}</p>
            <p className="mr-4">{restaurant.cuisine.name}</p>
            <p className="mr-4">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <a href="">View more information</a>
        </div>
      </div>
    </Link>
  );
}
