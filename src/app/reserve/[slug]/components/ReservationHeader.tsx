import { Time, convertToDisplayTime } from "@/data";
import { Restaurant } from "@prisma/client";

export default function ({
  restaurant,
  day,
  time,
  partySize,
}: {
  restaurant: Restaurant;
  day: string;
  time: string;
  partySize: string;
}) {
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={restaurant.main_image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{day}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{partySize} people</p>
          </div>
        </div>
      </div>
    </div>
  );
}
