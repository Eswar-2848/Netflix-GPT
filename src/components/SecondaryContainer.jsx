import MovieList from "./MovieList"
import { useSelector } from "react-redux"

const SecondaryContainer = () => {
  const movies=useSelector((state)=>state?.movies)
  const categories=["Now Playing", "Popular", "Top Rated", "Upcoming"];
  const movieKeys = ["nowPlayingMovies", "popularMovies", "topRatedMovies","upcomingMovies"];
  return (
    movies && (
      <div className="bg-black">
        <div className="-mt-52 pl-12 relative z-20">
          {
            categories.map((category, index)=><MovieList key={category} title={category} movies={movies?.[movieKeys[index]]}/>)
          }
        </div>
    </div>
    )
  )
}

export default SecondaryContainer