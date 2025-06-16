import { useSelector } from "react-redux";
import VideoTitle from "./VIdeoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer=()=>{
    const movies=useSelector((store)=>store.movies.nowPlayingMovies)

    const mainMovie=movies[0];
    console.log(mainMovie);
    
    return(
        <div>
            <VideoTitle />
            <VideoBackground />
        </div>
    )
}
export default MainContainer;