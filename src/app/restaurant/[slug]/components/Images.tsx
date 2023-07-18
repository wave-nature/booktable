export default function ({ images }: { images: string[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} photo{images.length > 0 ? "s" : ""}
      </h1>
      <div className="flex flex-wrap">
        {images.map((img) => (
          <img
            key={img}
            className="w-56 h-44 mr-1 mb-1 hover:scale-95 transition ease-in-out"
            src={img}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
