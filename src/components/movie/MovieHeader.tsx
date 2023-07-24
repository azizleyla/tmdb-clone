import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMovie } from "../../types/types";



const MovieHeader = ({ movieItem }:{movieItem:IMovie| undefined}) => {
  const navigate = useNavigate();

  const handleNavigateMovieById = () =>{
    navigate(-1)
  }

  return (
    <div className="bg-[#202060]  text-white p-5 ">
      <div className="container m-auto">
        <div className="flex items-center gap-5">
          <div>
            <img
              className=" h-[90px]  rounded-md"
              src={`https://image.tmdb.org/t/p/w500/${movieItem?.poster_path}`}
              alt=""
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-3xl">
              <Link to={`/movie/${movieItem?.id}`} className="font-bold">
                {movieItem?.original_title}
              </Link>
              <span className="font-normal opacity-80">
                {" "}
                ({movieItem?.release_date?.slice(0, 4)})
              </span>
            </h2>
            <button onClick={handleNavigateMovieById}>Back to main</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
