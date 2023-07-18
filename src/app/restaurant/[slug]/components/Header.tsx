export default function ({ slug }: { slug: string }) {
  function slugToName() {
    const arrName = slug.split("-");
    const name = `${arrName.slice(0, -1).join(" ")} (${
      arrName[arrName.length - 1]
    })`;
    return name;
  }
  return (
    <div className="h-96 overflow-hidden ">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white captitalize text-shadow text-center uppercase">
          {slugToName()}
        </h1>
      </div>
    </div>
  );
}
