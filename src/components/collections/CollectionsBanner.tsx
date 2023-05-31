import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMovie } from "../../types/types";

const CollectionsBanner = ({ movieItem }: { movieItem?: IMovie }) => {
  const backgroundImage = {
    backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 1) 0%, rgba(3, 37, 65, 0.6) 100%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movieItem?.belongs_to_collection?.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const navigate = useNavigate()
  const handleNavigate = () =>{
    navigate(`/collection/${movieItem?.belongs_to_collection?.id}`,{replace:true,state:movieItem})
   
  }

  return (
    <div
      style={backgroundImage}
      className="flex flex-col  justify-center text-white d-flex items-start   my-10 align-middle   p-4 h-60 rounded-md"
    >
      <div>
        <h2 className="text-3xl mb-1">
          Part of the {movieItem?.belongs_to_collection?.name}
        </h2>
        <p>Includes Creed, Creed II, and Creed III</p>
      </div>
      <button
      onClick={handleNavigate}
        className="bg-[#20205e] text-white rounded-3xl py-2 cursor-pointer px-4 mt-10 inline-block uppercase text-lg"
      >
        View the collection
      </button>
    </div>
  );
};

export default CollectionsBanner;
