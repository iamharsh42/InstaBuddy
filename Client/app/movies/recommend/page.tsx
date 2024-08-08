import { Suspense } from "react";

import dynamic from "next/dynamic";
import Loading from "../loading";

const SearchBarComponent = dynamic(() => import("@/components/ui/SearchBar"), {
  ssr: false,
});

export const metadata = {
  title: "Books - Instabuddy",
  description: "Page description",
};

export default function BooksPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SearchMovies />
      </Suspense>
    </>
  );
}

async function SearchMovies() {
  return (
    <section className="relative min-h-screen pt-52">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4">Movie Recommender</h1>
            <p className="text-xl text-gray-600">
            Explore movies based on your interests.
            </p>
          </div>
          <SearchBarComponent entityType="movie"/>
        </div>
      </div>
    </section>
  );
}

