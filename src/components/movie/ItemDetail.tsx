import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  buildStyles,
  CircularProgressbar,
} from "react-circular-progressbar";
import { Link, useParams } from "react-router-dom";

import { MovieApi } from "../../api/movieApi";
import { ApiQueryKeys } from "../../constants/api.constants";
import { IDirector, IMovie } from "../../types/types";
import Characters from "../characters/Characters";
import Keywords from "../keywords/Keywords";
import { formatNumber } from "../../utils/formatter";
import Reviews from "../reviews/Reviews";
import Recommendations from "../recommendations/Recommendations";
import CollectionsBanner from "../collections/CollectionsBanner";
import Media from "../media/Media";

type Language = {
  [key: string]: string;
};
let languages: Language = {
  en: "English",
  rus: "Russian",
};

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movieItem } = useQuery<IMovie>({
    queryKey: [ApiQueryKeys.movies, id],
    queryFn: ({ queryKey }) =>
      MovieApi.getMovieById(queryKey[1] as string),
  });

  const { data: directorsData } = useQuery<IDirector>({
    queryKey: ["directors", id],
    queryFn: ({ queryKey }: any) =>
      MovieApi.getDirectorsByMovieId(queryKey[1]),
  });

  //chat GBT
  const directors = directorsData?.crew.filter((item: IDirector) =>
    ["director", "writer", "screenplay", "story", "characters"].includes(
      item.job.toLocaleLowerCase(),
    ),
  );

  //collect same job

  const result = directors?.reduce(
    (acc: IDirector[], current: IDirector) => {
      const existing = acc.find(
        (item: IDirector) => item.name === current.name,
      );
      if (existing) {
        existing.job += `, ${current.job}`;
      } else {
        const newDirector: IDirector = {
          name: current.name,
          job: current.job,
          crew: [],
          cast: [],
        };
        acc.push(newDirector);
      }
      return acc;
    },
    [],
  );

  const tags = movieItem?.genres?.map((item) => item.name);
  const runTime: number | undefined | null = movieItem?.runtime;
  let totalTime = "";
  if (runTime !== undefined) {
    const runtimeNumber = Number(runTime); // Convert to number
    totalTime = `${Math.trunc(runtimeNumber / 60)}h ${
      runtimeNumber % 60
    }m`;
  }

  return (
    <>
      <div
        className={`my-10 bg-cover z-10  bg-position relative bg-center `}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieItem?.backdrop_path})`,
        }}
      >
        <div className="overlay absolute -z-[1] top-0 left-0 w-full h-full"></div>
        <div className="p-10 py-6  z-10 flex flex-col  md:flex-row   items-center  gap-10">
          <div className=" relative">
            <img
              className=" h-[500px]  rounded-md"
              src={`https://image.tmdb.org/t/p/w500/${movieItem?.poster_path}`}
              alt=""
            />
          </div>
          <div className="mt-3 flex-[2]">
            <div className="text-white text-2xl ">
              <h2>
                <Link to="" className="font-bold">
                  {movieItem?.original_title}
                </Link>
                <span className="font-normal opacity-80">
                  {" "}
                  ({movieItem?.release_date?.slice(0, 4)})
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="my-6 w-16 h-16">
                <CircularProgressbar
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",

                    // Text size
                    textSize: "27px",
                    pathColor: `rgba(38, 194, 129, ${
                      movieItem?.vote_average !== undefined
                        ? movieItem.vote_average
                          ? movieItem?.vote_average * 10
                          : ""
                        : 0
                    })`,
                    // How long animation takes to go from one percentage to another, in seconds

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    textColor: "#fff",
                    trailColor: "#333",
                    backgroundColor: "#21d07a",
                  })}
                  value={
                    movieItem?.vote_average
                      ? movieItem?.vote_average * 10
                      : 0
                  }
                  text={`${Math.trunc(
                    movieItem?.vote_average
                      ? movieItem?.vote_average * 10
                      : 0,
                  )}%`}
                />
              </div>
              <span className="text-white">User score</span>
            </div>

            <div className="flex text-white text-sm gap-[20px]">
              <span className="text-white">
                {movieItem?.release_date} (
                {movieItem?.original_language?.toUpperCase()})
              </span>
              <div className="before:w-1 before:h-1 ml-4 before:rounded-full before:bg-[#ccc] before:absolute relative before:top-[50%] before:-left-[10px]">
                {tags?.map((name: string, index: number) => (
                  <span key={index}>
                    {index > 0 && ", "}
                    {name}
                  </span>
                ))}
              </div>
              <span className="before:w-1 before:h-1 before:rounded-full before:bg-[#ccc] before:absolute ml-4 before:top-[50%] before:-left-[17px] relative">
                {totalTime}
              </span>
            </div>
            <div className="my-5 text-white">
              <span className="text-white opacity-70 italic mt-5">
                {movieItem?.tagline}
              </span>
              <h4 className="mt-3  text-lg">Overview</h4>
              <p className="text-sm leading-6 text-white opacity-80">
                {movieItem?.overview}
              </p>
            </div>
            <ol className="flex flex-wrap text-white gap-y-4">
              {result?.map((director: IDirector) => (
                <li className="basis-3/6 md:basis-4/12 w-[33%]   cursor-pointer">
                  <h4 className="font-semibold hover:opacity-80">
                    {director.name}
                  </h4>
                  <span className="text-[13px] opacity-80">
                    {director.job}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-[70%]">
            <div className="flex justify-between text-white mb-10 ">
              <h1>Top Billed Cast</h1>
              <Link to={`/movie/${id}/cast`} className="underline">
                View All
              </Link>
            </div>
            <div className="mt-10 flex gap-4 overflow-x-scroll overflow-y-hiddens">
              {directorsData?.cast?.slice(0, 9).map((director) => (
                <Characters director={director} />
              ))}
            </div>
            <Reviews movieItem={movieItem} />
            <Media />
            {movieItem?.belongs_to_collection && (
              <CollectionsBanner movieItem={movieItem} />
            )}

            <Recommendations />
          </div>

          <div>
            <div className="text-white flex flex-col gap-8">
              <p className="font-semild">
                <strong className="block">Status</strong>
                {movieItem?.status}
              </p>
              <p>
                <strong className="block">Orignal Language</strong>
                {movieItem && languages[movieItem?.original_language]}
              </p>
              <p>
                <strong className="block">Budget</strong>
                {movieItem?.budget ? formatNumber(movieItem?.budget) : "-"}
              </p>
              <p>
                <strong className="block">Revenue</strong>
                {movieItem?.revenue
                  ? formatNumber(movieItem?.revenue)
                  : "-"}
              </p>
            </div>
            <Keywords />
            <div className="">
              <p className="text-white my-3">Content Score</p>
              <div className="bg-[#ccc] px-4 py-2 h-full rounded-sm">
                100
              </div>
              <span className="text-white text-sm">Yes,Looking Code</span>
            </div>
          </div>
        </div>
      </div>
      <h1>New Casrs</h1>
    </>
  );
};

export default ItemDetail;
