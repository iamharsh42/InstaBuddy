import { Suspense } from "react";
import Loading from "./loading";
import { StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Bookshelf } from "@/components/ui/Bookshelf";

export const metadata = {
  title: "Books - Instabuddy",
  description: "Page description",
};

export default async function BooksPage() {
  const books = await getTopBooks();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <TopBooks books={books} />
      </Suspense>
    </>
  );
}

function TopBooks({ books }: { books: any }) {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4">Top 50 books</h1>
            <p className="text-xl text-gray-600">
              Explore the top 50 books on Instabuddy. Get started by browsing
              the books below.
            </p>
          </div>
          {/* // recommend books button link */}
          <div className="my-5 w-max ml-auto">
            <Link
              href="/books/recommend"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Recommend Books
            </Link>
          </div>

          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {books && <Bookshelf books={books} />}
          </div>
        </div>
      </div>
    </section>
  );
}

async function getTopBooks(): Promise<any> {
  const res = await fetch(
    `${process.env.API_URL}/server2/api/books`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const json = await res.json();
  return json || [];
}

interface IBook {
  "Image-URL-M": string;
  "Book-Title": string;
  "Book-Author": string;
  avg_rating: number;
  num_ratings: number;
}
