import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovies = () => {
  const dispatch = useDispatch();
  const categories = ["now_playing", "popular", "top_rated", "upcoming"];
  const getNowPlayingMovies = async (category) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      API_OPTIONS,
    );
    const json = await data.json();
    dispatch(addMovies({ type: category, movies: json.results }));
  };

  useEffect(() => {
    for (let category of categories) {
      getNowPlayingMovies(category);
    }
  }, []);
};

export default useMovies;
