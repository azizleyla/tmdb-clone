import React from 'react'
import { FaStar } from 'react-icons/fa'
import { IReview } from '../../types/types'

const ReviewItem = ({result}:{result:IReview}) => {

  const avatarPath = result?.author_details?.avatar_path;
 const formattedPath = avatarPath && !avatarPath?.startsWith("/https")
 ? `https://www.themoviedb.org/t/p/w128_and_h128_face/${avatarPath}`
 : `${avatarPath?.split('').slice(1).join('')}`

  
  return (
    <div className='p-5 bg-[#151d2f] mb-3 text-white shadow-md rounded-md'>
    <div className='my-3 gap-5 flex items-center'>
    <div>
    <img className='rounded-full' src={formattedPath} alt="Avatar" />
    </div>
    <div className='w-full'>
        <div className='flex  items-center gap-3'>
        <h3 className='font-bold text-xl'>A review by {result.author}</h3>
        {result?.author_details?.rating &&      <div className='bg-[#000] text-sm text-white rounded-lg mb-2 p-1 px-3 flex items-center gap-2 '>
          <FaStar/>
          {result.author_details.rating?.toFixed(1) }</div>
 }
        </div>
        <h5 className='text-sm'>Written by <span className='font-bold'>{result.author}</span> on 19 April 2023</h5>
  
   <div className='my-4'>
       <p className='font-italic'>{result.content.slice(0,400)}   </p>
   </div>
   </div>
   </div>
       </div>
  )
}

export default ReviewItem