import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { ApiQueryKeys } from "../../constants/api.constants";
import { MovieApi } from "../../api/movieApi";
import { Link, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { IMoviePart } from "../../types/types";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import {AiFillCaretRight} from "react-icons/ai"

export interface IGenres{
  id:number,
  name:string
}
const CollectionDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const [activeFilterQuery, setActiveFilterQuery] = useState<string>("");
  const [parts, setParts] = useState<IMoviePart[]>([]);
  const[isShowDropDown,setIsShowDropdown] = useState<boolean>();
  const listRef=useRef<HTMLDivElement>(null)
  const { data } = useQuery({
    queryKey: [ApiQueryKeys.movies, id],
    queryFn: ({ queryKey }) =>
      MovieApi.getMovieByCollectionId(queryKey[1] || ""),
  });
  const movieParts = data?.parts;
  const location = useLocation();

  const movieItem = location?.state
   const tags = movieItem?.genres?.map((item:IGenres) => item.name);




  useEffect(() => {
    if (data?.parts) {
      if (activeFilterQuery === "") {
        setParts(data.parts);
      } else {
        const filterMovies = sortMovies(data.parts, activeFilterQuery);
        setParts(filterMovies);
      }
    }
  }, [data, activeFilterQuery]);

  const sortMovies = (movies: IMoviePart[], filter: string) => {
    switch (filter) {
      case "popularity-asc":
        return [...movies].sort(
          (a: IMoviePart, b: IMoviePart) => a.popularity - b.popularity,
        );
        case "popularity-desc":
          return [...movies].sort(
            (a: IMoviePart, b: IMoviePart) => b.popularity - a.popularity,
          );
      case "rating-asc":
        return [...movies].sort(
          (a: IMoviePart, b: IMoviePart) =>
            a.vote_average - b.vote_average,
        );
        case "rating-desc":
          return [...movies].sort(
            (a: IMoviePart, b: IMoviePart) =>
              b.vote_average - a.vote_average,
          );
      case "date-asc":
        return [...movies].sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime(),
        );
        case "date-desc":
          return [...movies].sort(
            (a: IMoviePart, b: IMoviePart) =>
              b.vote_average - a.vote_average,
          );
      default:
        return movies;
    }
  };
  const handleChange = (filterQuery: string) => {
    setActiveFilterQuery(filterQuery);
    setIsShowDropdown(false)
  };


  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if (listRef.current && !listRef.current?.contains(event.target as Node)) {
        setIsShowDropdown(false);
      }
    };

    const handleEscapeKey = (event:KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setIsShowDropdown]);

  return (
<>
       <div
        className={`my-10 bg-cover z-10  relative  `}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${data?.backdrop_path})`,
        }}
      >
        <div className="overlay absolute -z-[1] top-0 left-0 w-full h-full"></div>
        <div className="p-10 py-6  z-10 flex flex-col  md:flex-row   items-center  gap-10">
          <div className=" relative">
            <img
              className=" h-[500px]  rounded-md"
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt=""
            />
          </div>
          <div className="mt-3 flex-[2]">
            <div className="text-white text-2xl ">
              <h2>
                <Link to="" className="font-bold">
                {data?.name}
                </Link>
                <div className="before:w-1 before:h-1 ml-4 before:rounded-full before:bg-[#ccc] before:absolute relative before:top-[50%] before:-left-[10px]">
                {tags?.map((name: string, index: number) => (
                  <span className="text-base" key={index}>
                    {index > 0 && ", "}
                    {name}
                  </span>
                ))}
              </div>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="my-6 w-16 h-16">
                <CircularProgressbar
                    value={
                     30
                    }
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",

                    // Text size
                    textSize: "27px",
                   
                    // How long animation takes to go from one percentage to another, in seconds

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    textColor: "#fff",
                    trailColor: "#333",
                    backgroundColor: "#21d07a",
                  })}
                 
                
                />
              </div>
              <span className="text-white">User score</span>
            </div>

            <div className="flex text-white text-sm gap-[20px]">
              <span className="text-white">
               
              </span>
              <div className="before:w-1 before:h-1 ml-4 before:rounded-full before:bg-[#ccc] before:absolute relative before:top-[50%] before:-left-[10px]">
              
              </div>
              <span className="before:w-1 before:h-1 before:rounded-full before:bg-[#ccc] before:absolute ml-4 before:top-[50%] before:-left-[17px] relative">
              </span>
            </div>
            <div className="my-5 text-white">
              <span className="text-white opacity-70 italic mt-5">
              </span>
              <h4 className="mt-3  text-lg">Overview</h4>
              <p className="text-sm leading-6 text-white opacity-80">
                {data?.overview}
              </p>
              <p className="mt-4">Number of movies: {movieParts?.length}</p>

            </div>
            <ol className="flex flex-wrap text-white gap-y-4">
             
            </ol>
          </div>
        </div>
      </div>
    <div className="container m-auto">
      <section className="py-20">
      <div className="flex justify-between">
          <h3 className="text-white font-bold text-2xl">{parts?.length} movies</h3>
          <div onClick={() => setIsShowDropdown(!isShowDropDown)} className="cursor-pointer bg-white w-40 rounded-md p-2 relative">
            <button >Sort</button>
            <div ref={listRef} className={`cursor-pointer rounded-md absolute top-12 px-2 py-3 left-0  border-[1px] border-[#000] bg-white w-[100%] ${isShowDropDown ? 'block' : 'hidden'}`}>
            <ul  className="relative">
              <li className="hover:bg-[#00B4E4]  hover:text-white relative flex justify-between group w-full mb-2">Popularity
              <AiFillCaretRight/>
                <ul className=" rounded-md border-[1px] border-[#333] absolute py-2 px-3 group-hover:block left-[140px] top-0 hidden bg-white w-full ">
                  <li  className="hover:bg-[#00B4E4] text-[#333]  hover:text-white flex justify-between"  onClick={() =>handleChange('popularity-asc')}>Ascending
           
                  </li>
                  <li  className="hover:bg-[#00B4E4] text-[#333] hover:text-white  flex justify-between"  onClick={() =>handleChange('popularity-desc')}>Descending
                
                  </li>
                </ul>
              </li>
              <li className="hover:bg-[#00B4E4] text-[#333] hover:text-white  relative flex justify-between group w-full mb-2">Rating
              <AiFillCaretRight/>

              <ul className="hover:bg-[#00B4E4]  rounded-m border-[1px] rounded-md border-[#333]  absolute py-2  px-3 group-hover:block left-[140px] top-0 hidden bg-white w-full ">
                  <li className="hover:bg-[#00B4E4] text-[#333  hover:text-white flex justify-between" onClick={() =>handleChange('rating-asc')}>Ascending
                  </li>
                  <li  className="hover:bg-[#00B4E4] text-[#333]  hover:text-white  flex justify-between"  onClick={() =>handleChange('rating-desc')}>Descending
                  </li>
                </ul>
              </li>
              <li  className="relative hover:bg-[#00B4E4] hover:text-white flex justify-between group w-full mb-2s">Release date
              <AiFillCaretRight/>

              <ul className="rounded-md border-[1px] border-[#333] px-3 absolute py-2 group-hover:block left-[140px] top-0 hidden bg-white w-full ">
                  <li  className="flex hover:bg-[#00B4E4] text-[#333] hover:text-white  justify-between"  onClick={() =>handleChange('date-asc')}>Ascending
                  </li>
                  <li  className="flex hover:bg-[#00B4E4] text-[#333] hover:text-white  justify-between"  onClick={() =>handleChange('date-desc')}>Descending
              
                  </li>
                </ul>
              </li>
            </ul>
            </div>
          </div>
        </div>
        <div className="my-4">
          {parts?.map((part: IMoviePart) => (
            <div className="text-white mb-10 border-[#999]  bg-[#042541] gap-3 overflow-hidden flex-row flex rounded-md">
              <div className="w-24 h-36 min-w-24">
                <img
                  alt="movieImg"
                  className="w-full h-full"
                  src={`https://image.tmdb.org/t/p/w188_and_h282_bestv2${part?.poster_path}`}
                />
              </div>
              <div className="w-full flex  flex-wrap gap-2 py-3 px-3 flex-col">
                <div>
                  <h2 className="font-bold text-lg">
                    {part?.original_title}
                  </h2>
                  <span className="text-sm text-[#999]">
                    {moment(part?.release_date).format("MMMM D, YYYY")}
                  </span>
                </div>
                <div>
                  <p className="text-sm">{part?.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
};

export default CollectionDetail;
