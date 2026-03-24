export const USER_AVATAR = "/images/user-avatar.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780";

export const TYPE_TO_STATE_KEY = {
  now_playing: "nowPlayingMovies",
  popular: "popularMovies",
  top_rated: "topRatedMovies",
  upcoming: "upcomingMovies",
};

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hindi", name: "Hindi" },
  { code: "spanish", name: "Spanish" },
];

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;
