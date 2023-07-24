import { baseApi } from "./baseApi";

export const MovieApi = {
  async getAllMovies(page: number) {
    const response = await baseApi.get(
      `discover/movie?api_key=4faf715e4beccd69d65cf8aa0f91cc5a&page=${page}`,
    );
    return response.data;
  },
  async getMovieById(id: string) {
    const response = await baseApi.get(
      `movie/${id}?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  },
  async getDirectorsByMovieId(id: number) {
    const response = await baseApi.get(
      `movie/${id}/credits?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );

    return response.data;
  },
  async getReviewsByMovieId(id: string) {
    const response = await baseApi.get(
      `movie/${id}/reviews?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );

    return response.data;
  },
  async getCharactersByMovieId(id: number) {
    const response = await baseApi.get(
      `movie/${id}/credits?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  },
  async getKeywordsByMovieId(id: string) {
    const response = await baseApi.get(
      `movie/${id}/keywords?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  },
  async getRecommendations(id: string) {
    const response = await baseApi.get(
      `movie/${id}/recommendations?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  },
  async getMovieByCollectionId(id: string) {
    const response = await baseApi.get(
      `/collection/${id}?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  },
  async getPersonById(id:string){
    const response = await baseApi.get(
      `/person/${id}?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;

  },
  async getCreditsCountByPersonId(id:string){
    const response = await baseApi.get(
      `/person/${id}/combined_credits?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  },
  async getPostesByMovieId(id:string){
    const response = await baseApi.get(
      `/movie/${id}/images?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  },
  async getVideosByMovieId(id:string){
    const response = await baseApi.get(
      `/movie/${id}/videos?api_key=4faf715e4beccd69d65cf8aa0f91cc5a`,
    );
    return response.data;
  }
  
};
