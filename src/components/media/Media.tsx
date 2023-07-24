import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setEnvironmentData } from "worker_threads";
import { MovieApi } from "../../api/movieApi";
import { ApiQueryKeys } from "../../constants/api.constants";
import { IMovie } from "../../types/types";

const tabs = [
  {
    id: 0,
    label: "Most Popular",
    value: "popular",
  },
  {
    id: 1,
    label: "Videos",
    value: "videos",
  },
  {
    id: 2,
    label: "Backdrops",
    value: "backdrops",
  },
  {
    id: 3,
    label: "Posters",
    value: "posters",
  },
];

interface IMediaObj {
  [key:string]:number
}

const Media = () => {
  const {id} = useParams()
  const [activeTab, setActiveTab] = useState<string>();
  const[media,setMedia] = useState([])
  const { data: mediaData } = useQuery<any>({
    queryKey: ['posters',id],
    queryFn: ({ queryKey }) =>
      MovieApi.getPostesByMovieId(queryKey[1] as string),
  });
  const { data: videosData } = useQuery<any>({
    queryKey: ['videos',id],
    queryFn: ({ queryKey }) =>
      MovieApi.getVideosByMovieId(queryKey[1] as string),
  });
  const videos = videosData?.results;
  useEffect(() =>{
    if(activeTab === 'posters'){
      setMedia(mediaData?.posters)
    }else if(activeTab=='backdrops'){
      setMedia(mediaData?.backdrops)
    }
  },[activeTab])

 
const obj:IMediaObj = {
  'posters': mediaData?.posters?.length,
  'backdrops':mediaData?.backdrops?.length,
  'videos':videos?.length

}

  return (
    <section>
      <div className="text-white  flex w-full items-baseline">
        <h3 className="mr-12 text-xl">Media</h3>
        <ul className="flex text-sm gap-5">
          {tabs.map((tab) => (
            <li
              style={{
                borderBottom: `${
                  activeTab === tab.value
                    ? "4px solid #fff"
                    : "4px solid transparent"
                }`,
              }}
              onClick={() => setActiveTab(tab.value)}
              className="flex text-lg gap-1 items-center cursor-pointer pb-1"
            >
              {tab.label} 
              <span className="text-base opacity-80">{obj[tab.value]}</span>
            </li>
          ))}
        </ul>
     
      </div>
      <div className="mt-10 flex overflow-x-scroll overflow-y-hiddens">
      {media?.map((data:any) => (
        <div className="group min-w-[200px] h-[300px] w-[200px] cursor-pointer">
         
      <img  className="w-[200px] h-[300px]" src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2/${data?.file_path}`} alt=""/>
        </div>
      ))}
    </div> 
    </section>
  );
};

export default Media;
