import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieApi } from '../../api/movieApi';
import { IPerson, IRecommendation } from '../../types/types';
import NotFound from "../../assets/img/not_found.jpeg"
import Acting from '../Acting/Acting';


interface IPersonObj {
    [key:string]:string
}
let PersonObj:IPersonObj ={
    '1':'Female',
    '2':'Male'
}

const Person = () => {
    const {id} = useParams();
    
    const { data: personData } = useQuery<IPerson>({
        queryKey: ["person",id],
        queryFn: ({ queryKey }: any) => MovieApi.getPersonById(queryKey[1]),
      });
      const { data: creditsData } = useQuery<any>({
        queryKey: ["credits",id],
        queryFn: ({ queryKey }: any) => MovieApi.getCreditsCountByPersonId(queryKey[1]),
      });
      const knowForMovies = creditsData?.cast?.filter((item: { media_type: string }) => item.media_type === 'movie');
console.log(knowForMovies)
    
      const calculateAge = () =>{
        const currentYear = new Date().getFullYear();
        const birthYear = parseInt(personData?.birthday ?? '0');
        return `(${currentYear - birthYear} years old)`
      }
      const navigate = useNavigate()

      const handleNavigate = (movieId:number) =>{
        navigate(`/movie/${movieId}`,{replace:true})
      }
  return (
    <div className='container m-auto'>
        <section className='py-20'>
            <div className='flex gap-8'>
                <div>
                <div className='max-w-[300px] rounded-xl overflow-hidden'>
                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${personData?.profile_path}`}></img>
                </div>
                <div className='text-white my-10'>
                <h3 className='text-xl mb-4'>Personal Info</h3>
                <p className='mb-3'>
                    <strong>
                        <bdi>Known for</bdi>
                    </strong>
                    {personData?.known_for_department}
                </p>
                <p className='mb-3'>
                    <strong>
                        <bdi>Known  credits</bdi>
                    </strong>

{creditsData && creditsData?.cast?.length}
                </p>
                <p className='mb-3'>
                    <strong>
                        <bdi>Gender</bdi>
                    </strong>
                    {personData?.gender && PersonObj[personData?.gender]}
                </p>
                <p className='mb-3'>
                    <strong>
                        <bdi>Birtdate</bdi>
                    </strong>
                    {personData?.birthday ?? 'N/A'} {personData?.birthday && calculateAge()}
                </p>
                <p className='mb-3'>
                    <strong>
                        <bdi>Place of Birth</bdi>
                    </strong>
                    {personData?.place_of_birth}
                </p>
                <p>
                    <strong>
                        <bdi>Also known as</bdi>
                    </strong>
                    { personData?.also_known_as && Array.isArray(personData?.also_known_as)  && personData?.also_known_as.length > 0 ? (
              <ul>
                {personData?.also_known_as?.map((x: string) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p className='text-white'>No known aliases</p>
            )}
                </p>
           
                </div>
             
                </div>
                <div className='text-white w-[80%]'>
           <h2 className='font-bold text-2xl my-2'>{personData?.name}</h2>
           <div className='my-6'>
           <h3 className='my-2 font-semibold text-lg'>Biography</h3>
           <p>{personData?.biography}</p>
           <div className="my-10">
            <h1 className="text-white text-xl mb-3">Known for</h1>
    <div className=" flex gap-4 overflow-x-scroll overflow-y-hiddens">
      {knowForMovies?.slice(0,10)?.map((recommendation:IRecommendation) => (
        <div onClick={() => handleNavigate(recommendation.id)} className="group min-w-[250px] w-[250px] cursor-pointer">
          <div className="relative">
          <img
          className={recommendation?.poster_path ? 'w-full h-full  rounded-md' : 'w-full h-[140px]'} 
          src={!recommendation?.poster_path ? NotFound : `https://image.tmdb.org/t/p/w500_and_h282_face/${recommendation?.poster_path}`}
          alt=""
        />
     
          </div>

          <div className=" text-white mt-1">
            <h3 className="text-white my-1">{recommendation?.original_title}</h3>
          
          </div>
        </div>
      ))}
    </div>
    <Acting creditsData={creditsData}/>
    </div>
                </div>
            </div>
            </div>
    
        </section>
    </div>
  )
}

export default Person