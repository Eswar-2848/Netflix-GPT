import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';

const Browse = () => {
  //Fetch Data from TMDB API and update store
  useNowPlayingMovies()
  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  )
}

export default Browse