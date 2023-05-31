import React from "react";
import MovieItem from "./MovieItem";
import { IMovie } from "../../types/types";

interface IProps {
  isAbsolute: boolean;
  movies: IMovie[];
}

const MovieList = ({ isAbsolute, movies }: IProps) => {
  return (
    <div className="grid">
      {movies?.map((movie: any) => (
        <MovieItem movie={movie} isAbsolute={isAbsolute} />
      ))}
    </div>
  );
};

export default MovieList;
