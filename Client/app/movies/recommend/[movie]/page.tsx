import MovieCard from "@/components/ui/MovieCard";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "../../loading";

const SearchBarComponent = dynamic(() => import("@/components/ui/SearchBar"), {
  ssr: false,
});

function decodeUrl(url: string) {
  return decodeURIComponent(url);
}

export default async function Page({ params }: { params: { movie: string } }) {
  const movies = await getRecommendMovies(params.movie);
  const options = await getOptions();
  return (
    <section className="relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20 mb-24">
          <div className="max-w-3xl mx-auto text-center pb-5 md:pb-6">
            <span className="text-sm font-semibold text-indigo-500 uppercase tracking-wide block my-4">
              Your recommend movies for
            </span>
            <h1 className="h1 mb-4">{decodeUrl(params.movie)}</h1>
          </div>
          <Suspense fallback={<Loading />}>
            <SearchBarComponent entityType="movie" />
          </Suspense>
        </div>
        {!movies?.names && (
          <p className="text-center w-full h-24 align-middle flex justify-center items-center">
            No movies found
          </p>
        )}
        <div className="max-w-sm mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none mt-12">
          {movies &&
            movies?.names?.map((movie: any, index: number) => {
              return (
                <MovieCard
                  key={index}
                  name={movie}
                  poster={movies?.posters?.[index]}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

// fetch using params
async function getRecommendMovies(param: string) {
  const res = await fetch(
    `${process.env.API_URL}/server1/recommend?movie=${param}`
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getOptions(): Promise<string[]> {
  const res = await fetch(`${process.env.API_URL}/server1/movies`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const json = await res.json();
  return json?.movies || [];
}
