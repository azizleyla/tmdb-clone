import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MovieApi } from '../../api/movieApi';
import { ApiQueryKeys } from '../../constants/api.constants';
import { IMovie, IReview } from '../../types/types';
import MovieHeader from '../movie/MovieHeader';
import ReviewItem from './ReviewItem';

const AllReview = () => {
 const { id } = useParams<{ id: string }>();
 const navigate=  useNavigate()
  const { data: reviewsData } = useQuery({

    queryKey: ["reviews", id],
    queryFn: ({ queryKey }: any) =>
      MovieApi.getReviewsByMovieId(queryKey[1]),
  });
  const { data: movieItem } = useQuery<IMovie>({
    queryKey: [ApiQueryKeys.movies, id],
    queryFn: ({ queryKey }) =>
      MovieApi.getMovieById(queryKey[1] as string),
  });
  const handleNavigate = () =>{
    navigate(`/movie/${id}`, { replace: true });
  }

   const results = reviewsData?.results;


  return (
    <>
    <MovieHeader movieItem={movieItem} handleNavigate={handleNavigate} />
    <div className='flex gap-7 flex-col container m-auto my-10'>
        {results.map((result:IReview) =>(
           <ReviewItem result={result}/>
        ))}
      
    </div>
    </>
  )
}

export default AllReview