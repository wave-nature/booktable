"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function () {
  const [location, setLocation] = useState<string>("");
  const router = useRouter();

  const searchHandler = useCallback(() => {
    console.log(location);
    if (location === "banana") return;
    router.push(`/search/${location}`);
  }, [location]);

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />
      <button
        onClick={searchHandler}
        className="rounded bg-red-600 px-9 py-2 text-white"
      >
        Let's go
      </button>
    </div>
  );
}
