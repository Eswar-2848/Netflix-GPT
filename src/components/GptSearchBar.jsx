import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants"
import { useRef, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const code= useSelector((store)=>store.config.lang);
  const searchText=useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  //Search movie in TMDB
  const searchMovieTMDB=async(movie)=>{
    const data=await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS);

    const json=await data.json();
    return json.results;
  }

  const handleGptSearchClick=async ()=>{
    //Make an API call to GPT API and get Movie Results
    if (loading) return;
    setLoading(true);
    try{
        const gptQuery="Act as a Movie Recommendation system and suggest some movies for the query:"+searchText.current.value+".only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Movie1, Movie2, Movie3, Movie4, Movie5";
        // const gptResults = await client.chat.completions.create({
        //   model: 'gpt-4o-mini',
        //   messages: [
        //     { role: 'user', content: gptQuery },
        //   ],
        // });
        // console.log(gptResults.choices);
        // const gptMovies=gptResults.choices?.[0]?.message?.content.split(",");
        const gptMovies="The Shawshank Redemption, The Godfather, The Dark Knight, Pulp Fiction, Forrest Gump".split(", ")

        //For each movie, search TMDB Api
        try {
          const tmdbResults = await Promise.all(gptMovies.map(movie => searchMovieTMDB(movie)));
          dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
        } catch (err) {
          console.error("Error fetching movies", err);
        }
    }
    catch(err){
      console.log("Error while fetching GPT Search Results", err);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type="text" className="p-4 m-4 bg-white col-span-9" placeholder={lang[code].gptSearchPlaceholder} />
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer' onClick={handleGptSearchClick}>{lang[code].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar