import { Review } from "@prisma/client";

export function calcAvgRating(reviews: Review[]) {
  if (reviews.length === 0) return 0;
  return reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;
}
