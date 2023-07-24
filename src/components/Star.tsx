import Image from "next/image";
import { FC } from "react";

interface StarProps {
  ratings: number;
}

function FullStar() {
  return <Image src="/icons/full-star.png" height={15} width={15} alt="full" />;
}
function HalfStar() {
  return <Image src="/icons/half-star.png" height={15} width={15} alt="half" />;
}
function EmptyStar() {
  return (
    <Image src="/icons/empty-star.png" height={15} width={15} alt="empty" />
  );
}

const Star: FC<StarProps> = ({ ratings }) => {
  const remaining = Math.floor(5 - ratings);
  const decimal = ratings % 1;

  return (
    <>
      {Array.from({ length: Math.floor(ratings) }, () => (
        <FullStar />
      ))}
      {decimal > 0 ? decimal <= 0.5 ? <HalfStar /> : <FullStar /> : null}
      {Array.from({ length: remaining }, () => (
        <EmptyStar />
      ))}
    </>
  );
};

export default Star;
