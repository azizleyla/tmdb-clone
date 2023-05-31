import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieApi } from "../../api/movieApi";
import { IMovie, IReview } from "../../types/types";
import ReviewItem from "./ReviewItem";

const Reviews = ({ movieItem }: { movieItem?: IMovie }) => {
  const { id } = useParams<{ id: string }>();
  const { data: reviewsData } = useQuery({
    queryKey: ["reviews", id],
    queryFn: ({ queryKey }: any) =>
      MovieApi.getReviewsByMovieId(queryKey[1]),
  });
  const results = reviewsData?.results;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/movie/${id}/all-reviews`, { replace: true });
  };
  return (
    <div className="flex gap-5 flex-col items-start  my-10">
      <h2 className="text-2xl text-white">Review({results?.length})</h2>

      <div>
        {results?.length > 0 ? (
          results
            ?.slice(0, 1)
            ?.map((result: IReview) => <ReviewItem result={result} />)
        ) : (
          <p className="text-white border-b-[1px]">
            We don't have any reviews for {movieItem?.original_title}
          </p>
        )}
        {results?.length > 0 && (
          <button
            onClick={handleNavigate}
            className="text-white underline"
          >
            Read All Reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default Reviews;
