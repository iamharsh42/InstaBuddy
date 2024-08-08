export default function MovieCard({
  name,
  poster,
}: {
  name: string;
  poster: string;
}) {
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md bg-white border border-slate-400">
      <div className="relative mx-4 -mt-6 h-auto overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img src={poster} alt="movie" className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {name}
        </h5>
      </div>
    </div>
  );
}
