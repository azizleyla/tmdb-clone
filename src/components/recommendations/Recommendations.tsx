import { useQuery } from "@tanstack/react-query";
import {  useNavigate, useParams } from "react-router-dom";
import { MovieApi } from "../../api/movieApi";
import {AiOutlineCalendar} from "react-icons/ai"
import moment from "moment";
import { IRecommendation } from "../../types/types";
import NotFound from "../../assets/img/not_found.jpeg"

const Recommendations = () => {
  const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: ({ queryKey }: any) => MovieApi.getRecommendations(queryKey[1]),
  });
  const recommendations = data?.results;

  const handleNavigate = (movieId:number) =>{
    navigate(`/movie/${movieId}`,{replace:true})
  }
  return (
    
    <section className="py-10">
      {recommendations?.length > 0 &&  <>
     <h1 className="text-white text-2xl">Recommendations</h1>
    <div className="mt-10 flex gap-4 overflow-x-scroll overflow-y-hidden">
      {recommendations?.map((recommendation:IRecommendation) => (
        <div onClick={() => handleNavigate(recommendation.id)} className="group min-w-[250px] w-[250px] cursor-pointer">
          <div className="relative">
          <img
          className={recommendation?.poster_path ? 'w-full h-full  rounded-md' : 'w-full h-[140px]'} 
          src={!recommendation?.poster_path ? NotFound : `https://image.tmdb.org/t/p/w500_and_h282_face/${recommendation?.poster_path}`}
          alt=""
        />
        <div className="absolute group-hover:flex hidden bottom-0 w-full gap-1 left-0 text-black h-8 px-4  items-center  bg-white opacity-90">
          <AiOutlineCalendar/>
          <span className="text-sm font-normal">{moment(recommendation?.release_date).format('MM/DD/YYYY')}</span>
        </div>
          </div>

          <div className="flex justify-between text-white mt-1">
            <h3 className="text-white my-1">{recommendation?.original_title}</h3>
            <p>{Math.trunc(recommendation?.vote_average * 10)}%</p>
          </div>
        </div>
      ))}
    </div> 
    </> 
    }
  
    </section>
  );
};

export default Recommendations;
