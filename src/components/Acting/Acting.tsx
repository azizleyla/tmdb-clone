import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IActing } from "../../types/types";


interface DepartmentCounts {
  [key: string]: number;
}

const Acting = ({ creditsData }: { creditsData: IActing }) => {
  const [data, setData] = useState<IActing[]>(creditsData?.cast);
  const[isShowDropDown,setIsShowDropdown] = useState(false)
  const[isShowDropDownType,setIsShowDropDownType] = useState(false)
  const actingLength = creditsData?.cast?.length;
const[filterType,setFilterType] = useState('All')

  const[activeFilter,setActiveFilter] = useState('Department')
  const tvLength = creditsData?.cast?.filter(item => item.media_type === 'tv').length;
  const movieLength = creditsData?.cast?.filter(item => item.media_type === 'movie').length;

  useEffect(() => {
    setData(creditsData?.cast);
  }, [creditsData]);

 
  
  const departmentCounts:DepartmentCounts = {};
  
  creditsData?.crew?.forEach(item => {
    const department = item.department;
    if (departmentCounts.hasOwnProperty(department)) {
      departmentCounts[department] += 1;
    } else {
      departmentCounts[department] = 1;
    }
  });


  const handleChange = (filterQuery:string) => {
    setActiveFilter(filterQuery)
    if (filterQuery=== "Acting") {
      setData(creditsData?.cast);
    } else {
      setData(
        creditsData?.crew?.filter((item) => item.department === filterQuery)
      );
    }

    setIsShowDropDownType(false)
  };
 const handleFilterType = (filterType:string) =>{
  setFilterType(filterType)
    setData(
      creditsData?.cast?.filter((item) => item.media_type === filterType)
    );
    setIsShowDropDownType(false);
    setIsShowDropdown(false)
  
 }
 const sortedData = data?.sort((a: any, b: any) => {
  const aDate = a?.media_type === "tv" ? a?.first_air_date : a?.release_date;
  const bDate = b?.media_type === "tv" ? b?.first_air_date : b?.release_date;
  return parseInt(bDate) - parseInt(aDate);
});
 
  return (
    <section className="my-10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl mb-6">Acting</h3>
          <div className="bg-[#161D2F] rounded-md p-3">
            {sortedData?.map((item: any) => (
              <Link to={`/movie/${item.id}`} className="flex items-center mb-3 py-2 gap-7 border-b-[1px]">
                <span>
                  {item?.media_type === "tv"
                    ? parseInt(item?.first_air_date) || "—"
                    : parseInt(item?.release_date) || "-"}
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

        <div className="relative cursor-pointer w-40">
            <p  className="relative capitalizes " onClick={() => setIsShowDropDownType(!isShowDropDownType)}>{filterType}</p>
          <ul className={`bg-white w-full mt-1 text-[#000] rounded-md p-4 absolute ${isShowDropDownType ? 'block' : "hidden"}`}>
           <li onClick={() => handleFilterType('movie')}>Movie {movieLength}</li>
           <li onClick={() => handleFilterType('tv')}>Tv {tvLength}</li>
          </ul>
          </div>
          <div className="relative cursor-pointer w-40">
            <p onClick={() =>setIsShowDropdown(!isShowDropDown)} className="relative ">{activeFilter}</p>
          <ul className={`bg-white w-full mt-1 text-[#000] rounded-md p-4 absolute ${isShowDropDown ? 'block' : "hidden"}`}>
            <li   onClick={() => handleChange('Acting')}>Acting {actingLength}</li>
           {Object.entries(departmentCounts)?.map(([department,count]) =>(
            <li className="my-1" onClick={() =>{
              handleChange(department)
            }}>{department} {count}</li>
           ))}
          </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Acting;
