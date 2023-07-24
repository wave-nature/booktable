"use client";

import Image from "next/image";

export default function ({ error }: { error: Error }) {
  return (
    <div className="bg-slate-200 flex flex-col items-center justify-center h-screen ">
      <Image src="/icons/error.png" alt="error" height={100} width={100} />

      <div className="bg-white shadow-sm rounded px-12 mt-12 py-12">
        <h2 className="text-2xl">Embarrasing! That should not be happen</h2>
        <p className=" font-medium">{error.message}</p>
        <p>Error Status: 400</p>

        <button
          onClick={() => (location.href = "/")}
          className=" bg-green-400 p-2 mt-4 inline-block rounded "
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
