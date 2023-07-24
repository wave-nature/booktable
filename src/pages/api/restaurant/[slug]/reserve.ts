import { times } from "@/data";
import { createResponse } from "@/middlewares/helpers";
import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const {
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
    } = req.body;

    if (!slug || !day || !time || !partySize)
      return createResponse(res, 400, { message: "Invalid query" });

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
        id: true,
      },
    });

    if (!restaurant)
      return createResponse(res, 400, { message: "No Restaurant Found" });

    if (
      new Date(`${day}T${time}`) >
        new Date(`${day}T${restaurant.close_time}`) ||
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`)
    ) {
      return createResponse(res, 400, { message: "Restaurant Closed" });
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
        id: true,
      },
    });

    const bookingTableObj: {
      [key: string]: {
        [key: number]: true;
      };
    } = {};
    bookings.forEach((booking) => {
      bookingTableObj[booking.booking_time.toISOString()] =
        booking.tables.reduce(
          (acc, table) => ({ ...acc, [table.table_id]: true }),
          {}
        );
    });

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

    const serachTimeWithTable = serachTimeWithTables.find(
      (t) =>
        new Date(t.date).toISOString() ===
        new Date(`${day}T${time}`).toISOString()
    );

    if (!serachTimeWithTable)
      return createResponse(res, 400, {
        message: "Cannot find table for this time!",
      });

    // 2 seater and 4 seater table
    const tableCount: { 2: number[]; 4: number[] } = {
      2: [],
      4: [],
    };

    serachTimeWithTable.tables.forEach((table) => {
      if (table.seats === 2) {
        tableCount[2].push(table.id);
      } else tableCount[4].push(table.id);
    });

    const tablesToBook: number[] = [];

    let seatRemaining = parseInt(partySize);

    while (seatRemaining > 0) {
      if (seatRemaining >= 3) {
        if (tableCount[4].length) {
          tablesToBook.push(tableCount[4][0]);
          tableCount[4].shift();
          seatRemaining -= 4;
        } else {
          tablesToBook.push(tableCount[2][0]);
          tableCount[2].shift();
          seatRemaining -= 2;
        }
      } else {
        if (tableCount[2].length) {
          tablesToBook.push(tableCount[2][0]);
          tableCount[2].shift();
          seatRemaining -= 2;
        } else {
          tablesToBook.push(tableCount[4][0]);
          tableCount[4].shift();
          seatRemaining -= 4;
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_occasion: bookerOccasion,
        booker_request: bookerRequest,
        restaurant_id: restaurant.id,
      },
    });

    const bookingsOnTablesData = tablesToBook.map((table_id) => ({
      table_id,
      booking_id: booking.id,
    }));
    await prisma.bookingsOnTables.createMany({
      data: bookingsOnTablesData,
    });

    createResponse(res, 200, {
      message: "booking created successfully",
    });
  }
}
