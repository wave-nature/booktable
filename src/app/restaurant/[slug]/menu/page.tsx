import prisma from "@/utils/db";

interface pageProps {
  params: {
    slug: string;
  };
}

async function fetchItems(slug: string) {
  return prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
}

export default async function ({ params }: pageProps) {
  const restaurant = await fetchItems(params.slug);

  return (
    <>
      {/* MENU */}
      <main className="bg-white mt-5">
        <div>
          <div className="mt-4 pb-1 mb-1">
            <h1 className="font-bold text-4xl">Menu</h1>
          </div>
          <div className="flex flex-wrap justify-between">
            {/* MENU CARD */}
            {restaurant?.items.map((item) => (
              <div key={item.id} className=" border rounded p-3 w-[49%] mb-3">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="font-light mt-1 text-sm">{item.description}</p>
                <p className="mt-7">{item.price}</p>
              </div>
            ))}
            {/* MENU CARD */}
          </div>
        </div>
      </main>
      {/* MENU */}
    </>
  );
}
