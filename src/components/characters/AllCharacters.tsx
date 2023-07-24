import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MovieApi } from "../../api/movieApi";
import { ApiQueryKeys } from "../../constants/api.constants";
import { ICharacters, IDirector, IMovie } from "../../types/types";
import MovieHeader from "../movie/MovieHeader";

const AllCharacters = () => {
    const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { data: directorsData } = useQuery<IDirector>({
    queryKey: ["directors", id],
    queryFn: ({ queryKey }: any) => MovieApi.getDirectorsByMovieId(queryKey[1]),
  });
  const { data: movieItem } = useQuery<IMovie>({
    queryKey: [ApiQueryKeys.movies, id],
    queryFn: ({ queryKey }) =>
      MovieApi.getMovieById(queryKey[1] as string),
  });
  const handleNavigate = (personId:number) =>{
   
      navigate(`/person/${personId}`,{replace:true})
    
  }

  const castData = directorsData?.cast;
  const crewData = directorsData?.crew;
  console.log(castData)

  return (
    <>
    <MovieHeader  movieItem={movieItem}/>
    <div className="container m-auto">
        <div className="flex flex-col md:flex-row gap-10">
        <div>
      <h1 className="text-white text-2xl my-4">Cast {castData?.length}</h1>
      <div className="flex flex-col gap-5">
        {castData?.map((item:ICharacters) => (
       
          <div onClick={() =>handleNavigate(item.id)}className="cursor-pointer text-white gap-2 flex items-center">
            <div>
              <img className="w-16 h-16 object-cover rounded-sm" src={`https://www.themoviedb.org/t/p/w276_and_h350_face/${item.profile_path}`} />
            </div>
            <div className="">
            <p className="font-bold text-md">{item.name}</p>
            <p className="opacity-90 text-sm">{item.character}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div>
      <h1 className="text-white text-2xl my-4">Crew {crewData?.length}</h1>
      <div className="flex flex-col gap-5 text-white">
      {crewData?.map((item:ICharacters) => (
        <>
          <div className="text-white gap-2 flex items-center">
            <div>
              <img className="w-16 h-16 object-cover rounded-sm" src={`https://www.themoviedb.org/t/p/w276_and_h350_face/${item.profile_path}`} />
            </div>
            <div className="">
            <p className="font-bold text-md">{item.name}</p>
            <p className="opacity-90 text-sm">{item.character}</p>
            </div>
          </div>
    
          </>
        ))}
        </div>
      </div>
      </div>
    </div>

    </>
  );
};

export default AllCharacters;
