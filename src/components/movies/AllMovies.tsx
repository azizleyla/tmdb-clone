import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import MovieItem from "../movie/MovieItem";
import MovieList from "../movie/MovieList";
import SearchInput from "../SearchInput";
import { MdLocalMovies, MdMovie } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { SlScreenDesktop } from "react-icons/sl";
import { useQuery } from "@tanstack/react-query";
import { ApiQueryKeys } from "../../constants/api.constants";
import { MovieApi } from "../../api/movieApi";
import { IMovie } from "../../types/types";
import Navbar from "../navbar/Navbar";

export type IBoolean = {
  isAbsolute: boolean;
};

const AllMovies = ({ isAbsolute }: IBoolean) => {
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: [ApiQueryKeys.movies, page],
    queryFn: ({ queryKey }) => MovieApi.getAllMovies(Number(queryKey[1])),
  });
  const moviesData = data?.results;
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    if (moviesData) {
      setMovies([...movies, ...data?.results]);
    }
  }, [moviesData]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
    <div className="container m-auto mt-10 px-4 md:p-2">
      <div className="flex  gap-0 md:gap-10">
     
        <div className="w-full pb-20">
          <SearchInput />

          <Title text="All Movies" />
          <MovieList movies={movies} isAbsolute={isAbsolute} />
          <div className="flex justify-center items-center my-10 ">
            <button
              className="hover:opacity-80 py-2 px-6 rounded-full bg-[#ccc]"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AllMovies;
