import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IActing, IRecommendation } from "../../types/types";

const Acting = ({ creditsData }: { creditsData: IActing }) => {
  const [data, setData] = useState<IActing[]>(creditsData?.cast);
  const[isShowDropDown,setIsShowDropdown] = useState(false)
  const actingLength = creditsData?.cast?.length;
  const productionLength = creditsData?.crew?.filter(
    (item) => item?.department === "Production"
  ).length;
  const writingLength = creditsData?.crew?.filter(
    (item) => item?.department === "Writing"
  ).length;

  const creatorLength = creditsData?.crew?.filter(
    (item) => item?.department === "Creator"
  ).length;

  const tvLength = creditsData?.cast?.filter(item => item.media_type === 'tv').length;
  const movieLength = creditsData?.cast?.filter(item => item.media_type === 'movie').length;

  useEffect(() => {
    setData(creditsData?.cast);
  }, [creditsData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if ((e.target as HTMLSelectElement).value === "Acting") {
      setData(creditsData?.cast);
    } else {
      setData(
        creditsData?.crew?.filter((item) => item.department === e.target.value)
      );
    }
  };
 const handleFilterType = (e:React.ChangeEvent<HTMLSelectElement>) =>{
  
    setData(
      creditsData?.cast?.filter((item) => item.media_type === e.target.value)
    );
  
 }
  return (
    <section className="my-10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl mb-6">Acting</h3>
          <div className="bg-[#161D2F] rounded-md p-3">
            {data?.map((item: any) => (
              <Link to={`/movie/${item.id}`} className="flex items-center mb-3 py-2 gap-7 border-b-[1px]">
                <span>
                  {item?.media_type === "tv"
                    ? parseInt(item?.first_air_date)
                    : parseInt(item?.release_date)}
                </span>
                <p className="text-md font-bold">
                  {" "}
                  {item?.media_type === "tv"
                    ? item?.original_name
                    : item?.original_title}
                  <span className="block pl-3 font-normal text-sm">
                    <small className="text-[13px]">as </small>
                    {item?.media_type === "tv" ? item?.job : item?.character}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-2">

          <select onChange={(e) => handleFilterType(e)}>
            <option value="movie">Movie {movieLength} </option>
            <option value="tv">TV {tvLength}</option>
          </select>
          <div className="relative cursor-pointer">
            <p onClick={() =>setIsShowDropdown(!isShowDropDown)} className="relative ">Department</p>
          <ul className={`bg-red-600  absolute ${isShowDropDown ? 'block' : "hidden"}`}>
            <li>Acting</li>
            <li>Production</li>
            <li>Writing</li>
            <li>Creator</li>
          </ul>
          </div>
          {/* <select placeholder="Department" onChange={(e) => handleChange(e)}>
            <option value="Acting">Acting {actingLength}</option>
            <option value="Production">Production {productionLength}</option>
            <option value="Writing">Writing {writingLength}</option>
            <option value="Creator">Creator {creatorLength}</option>
          </select> */}
        </div>
      </div>
    </section>
  );
};

export default Acting;
