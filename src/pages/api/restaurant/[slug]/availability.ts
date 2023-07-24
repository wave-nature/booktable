import { times } from "@/data";
import { createResponse } from "@/middlewares/helpers";
import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return createResponse(res, 400, { message: "Invalid query passed" });
  }

  const serachTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!serachTimes)
    return createResponse(res, 400, { message: "Invalid time passed" });

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${serachTimes[0]}`),
        lte: new Date(`${day}T${serachTimes[serachTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTableObj: {
    [key: string]: {
      [key: number]: true;
    };
  } = {};
  bookings.forEach((booking) => {
    bookingTableObj[booking.booking_time.toISOString()] = booking.tables.reduce(
      (acc, table) => ({ ...acc, [table.table_id]: true }),
      {}
    );
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant)
    return createResponse(res, 404, { message: "Restaurant Not Found" });

  const tables = restaurant.tables;

  const serachTimeWithTables = serachTimes.map((time) => ({
    date: new Date(`${day}T${time}`),
    time,
    tables,
  }));

  // available tables at particular time
  serachTimeWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTableObj[t.date.toISOString()]) {
        if (bookingTableObj[t.date.toISOString()][table.id]) {
          return false;
        }
      }
      return true;
    });
  });

  // available table for partysize at that time
  const availabilities = serachTimeWithTables
    .map((t) => {
      const totalSeats = t.tables.reduce((sum, cur) => sum + cur.seats, 0);
      return {
        time: t.time,
        available: totalSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const openingHoursAfter =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);
      const closingHoursBefore =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);
      return openingHoursAfter && closingHoursBefore;
    });

  return createResponse(res, 200, availabilities);
}
