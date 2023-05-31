export interface ITitle {
  text: string;
}
interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number | null;
  vote_count: number;
}
export interface IDirector {
  crew: [];
  cast: [];
  name: string;
  job: string;
}
export interface IKeyword {
  id: number;
  name: string;
}

export interface IKeywords {
  id: number;
  keywords: [];
}
export interface ICharacters {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}
export interface IReview {
  author: string;
  author_details: {
    avatar_path: string;
    rating: number;
  };
  content: string;
}
export interface IRecommendation {
  id: number;
  poster_path: string;
  release_date: string;
  original_title: string;
  vote_average: number;
}

export interface IMoviePart {
  poster_path: string;
  original_title: string;
  release_date: string;
  overview: string;
  popularity: number;
  vote_average: number;
}

export interface IPerson{
  id:number,
  name:string,
  biography:string,
  birthday:string,
  profile_path:string,
  known_for_department:string,
  gender:string,
  popularity:string,
  place_of_birth:string,
  also_known_as:string


}