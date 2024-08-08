import { Book, Bookshelf } from "@/components/ui/Bookshelf";
import dynamic from "next/dynamic";
const SearchBarComponent = dynamic(() => import("@/components/ui/SearchBar"), {
  ssr: false,
});

function decodeUrl(url: string) {
  return decodeURIComponent(url);
}

export default async function Page({ params }: { params: { book: string } }) {
  const books = await getRecommendBooks(params.book);
  return (
    <section className="relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <span className="text-sm font-semibold text-indigo-500 uppercase tracking-wide block my-4">
              Your recommend books for
            </span>
            <h1 className="h1 mb-4">{decodeUrl(params.book)}</h1>
          </div>
          <SearchBarComponent entityType="book" />
        </div>
        {!books && (
          <p className="text-center w-full h-24 align-middle flex justify-center items-center">
            No books found
          </p>
        )}
        <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none  mt-12">
          {books &&
            books.map((book: any, index: number) => {
              return (
                <Book
                  key={book["title"]}
                  img={book["image_url"]}
                  bookName={book["title"]}
                  ratings={null}
                  num_ratings={null}
                  author={book["author"] || ""}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

// fetch using params
async function getRecommendBooks(param: string) {
  const res = await fetch(
    `${process.env.API_URL}/server2/api/recommend?book=${param}`
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
