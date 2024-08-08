import { StarIcon } from "@radix-ui/react-icons";

export const Bookshelf = ({ books }: { books: any }) => {
  return (
    <>
      {!books.length
        ? ""
        : books.map((book: any) => (
            <Book
              key={book["Book-Title"]}
              img={book["Image-URL-M"]}
              bookName={book["Book-Title"]}
              author={book["Book-Author"]}
              ratings={book["avg_rating"]}
              num_ratings={book["num_ratings"]}
            />
          ))}
    </>
  );
};

export const Book = ({
  img,
  bookName,
  author,
  ratings,
  num_ratings,
}: {
  img: string;
  bookName: string;
  ratings: number | null;
  num_ratings: number | null;
  author?: string;
}) => {
  return (
    <figure className="md:flex border bg-gray-100 rounded-xl p-8 md:p-3 shadow-2xl md:min-h-[350px]">
      <div className="pt-6 md:p-6 text-center md:text-left space-y-4">
        <img
          className="md:rounded-none rounded-full mx-auto object-contain w-32 h-32 md:h-auto md:w-48"
          src={img}
          alt={bookName}
        />
      </div>
      <div className="pt-6 md:p-6 text-center md:text-left space-y-4">
        <blockquote>
          <p className="text-lg font-semibold" title={bookName}>
            {bookName}
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600 pb-5 ">{author ? `${author}` : ""}</div>
        </figcaption>
        {ratings === null || num_ratings === null ? (
          <></>
        ) : (
          <p className="text-sm text-gray-500">
            <StarIcon className="inline-block w-4 h-4 mr-1 fill-current text-yellow-500" />
            {ratings.toFixed(1)}/10 ({num_ratings} ratings)
          </p>
        )}
      </div>
    </figure>
  );
};
