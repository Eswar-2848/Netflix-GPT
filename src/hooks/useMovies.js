import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { API_OPTIONS, TYPE_TO_STATE_KEY } from "../utils/constants";
import { addMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
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
    categories.forEach((category) => {
      const stateKey = TYPE_TO_STATE_KEY[category];

      // Only fetch if this category is not already in the store
      if (!movies[stateKey]?.length) {
        getNowPlayingMovies(category);
      }
    });
  }, [movies]);
};

export default useMovies;
