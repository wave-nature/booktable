import Link from "next/link";

export default function () {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={`/restaurant/some-name`} className="mr-7">
        {" "}
        Overview{" "}
      </Link>
      <Link href={`/restaurant/some-name/menu`} className="mr-7">
        {" "}
        Menu{" "}
      </Link>
    </nav>
  );
}
