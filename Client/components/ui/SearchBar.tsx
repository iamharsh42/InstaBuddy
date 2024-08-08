"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({
  entityType = "movie",
}: {
  entityType: "movie" | "book";
}) => {
  const router = useRouter();
  const [entity, setEntity] = useState("");

  return (
    <div>
      <form
        className="flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();

          router.push(`/${entityType}s/recommend/${entity}`);
        }}
      >
        <input
          className="rounded-full py-3 px-6 outline-none focus:ring-2 focus:ring-gray-400 border-2 border-gray-300"
          style={{ width: "50%" }}
          placeholder={`Search a ${entityType} that you like`}
          value={entity}
          onInput={(e: any) => setEntity(e.target.value)}
        />
        <button
          className="rounded-full mx-3 p-3 bg-white items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-400 border-2 border-gray-300"
          type="submit"
        >
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30px"
            height="30px"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
