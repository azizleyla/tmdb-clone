import React from "react";
import { FiBookmark } from "react-icons/fi";
import { IBoolean } from "../movies/AllMovies";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { IMovie } from "../../types/types";

interface IProps {
  isAbsolute:boolean,
  movie:IMovie
}

const MovieItem = ({ isAbsolute, movie }: IProps) => {
  return (
    <Link to={`/movie/${movie.id}`}>
       <div className=" group rounded-lg transition-all relative cursor-pointer">
      <div className="w-[100%]  h-[320px] relative">
        <img
          className="w-full h-full  rounded-md"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />
        <div className="absolute group-hover:opacity-0 top-0 left-0 w-full h-full bg-black opacity-40"></div>
      </div>

      <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black opacity-60 flex items-center justify-center">
        <FiBookmark className="hover:text-white text-xl text-white" />
      </div>
      <div
        className={`${isAbsolute ? "absolute bottom-6 left-7" : "mt-3"}`}
      >
        <ul className="flex items-center  gap-2  text-white opacity-70 text-sm">
          <li>{new Date(movie.release_date).getFullYear()}</li>
          <span className="w-1 h-1 rounded-full bg-white"></span>
          <li className="flex items-center gap-1">
            <MdLocalMovies />
            <span>Movie</span>
          </li>
          <span className="w-1 h-1 rounded-full bg-white"></span>
          <li>PG</li>
        </ul>
        <h2 className="text-white text-xl  font-semibold mt-1">
          {movie?.original_title}
        </h2>
      </div>
    </div>
    </Link>
   
  );
};

export default MovieItem;
