import Star from "@/components/Star";

export default function ({
  reviews,
  ratings,
}: {
  reviews: number;
  ratings: number;
}) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        {<Star ratings={ratings} />}
        <p className="text-reg ml-3">{ratings.toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews} Review{reviews > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
