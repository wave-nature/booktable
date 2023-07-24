"use client";
import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Time,
  convertToDisplayTime,
  partySize as partySizes,
  times,
} from "../../../../data/index";
import ReactDatePicker from "react-datepicker";
import useAvailability from "@/hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

export default function () {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const slug = pathname?.split("/").at(-1);
  const openTime = searchParams?.get("openTime");
  const closeTime = searchParams?.get("closeTime");
  const { loading, data, error, fetchAvailability } = useAvailability();
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(() => openTime);
  const [partySize, setPartySize] = useState(2);
  const [selectDate, setSelectDate] = useState<Date | null>(new Date());

  function getFilterdTimes() {
    const newTimes: (typeof times)[0][] = [];
    let inWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) inWindow = true;

      if (inWindow) newTimes.push(time);

      if (time.time === closeTime) inWindow = false;
    });

    return newTimes;
  }

  function dateChangeHanlder(date: Date | null) {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectDate(date);
    } else setSelectDate(null);
  }

  function findAvailibilty() {
    if (slug && time && partySize)
      fetchAvailability({
        slug,
        day,
        time,
        partySize,
      });
  }

  return (
    <div className="fixed w-[20%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          onChange={(e) => {
            return setPartySize(parseInt(e.target.value));
          }}
          value={partySize}
        >
          {partySizes.map((table) => (
            <option key={table.value} value={table.value}>
              {table.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <ReactDatePicker
            selected={selectDate}
            onChange={dateChangeHanlder}
            dateFormat="MMMM d"
            className="py-3 border-b font-light w-28"
            wrapperClassName="w=[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            onChange={(e) => setTime(e.target.value)}
            value={time || getFilterdTimes()[0].time}
          >
            {getFilterdTimes().map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={findAvailibilty}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-12"
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>

        {data && data.length && (
          <div>
            <p className="font-semibold">Select Time</p>

            <div className="flex flex-wrap items-center gap-1">
              {data.map((time) =>
                time.available ? (
                  <Link
                    className="px-2 py-2 bg-red-600 text-white"
                    href={`/reserve/${slug}?day=${day}&time=${time.time}&partySize=${partySize}`}
                  >
                    {convertToDisplayTime(time.time as Time)}
                  </Link>
                ) : (
                  <div className="bg-slate-400 px-4 py-4"></div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
