export const USER_AVATAR = "/images/user-avatar.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmUzNzBjZGUwMzA5ZmY3ZmU5Y2Q5Zjg4MjEzNjJhMiIsIm5iZiI6MTc0OTgwMjg1MC41ODMwMDAyLCJzdWIiOiI2ODRiZGY2MjUxMTYxMzcyNTMzZmRhYjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kGWb8NOBeA1K9xfPAHzEY2sgIDxEzR0X3_-13YVVd3o",
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780";

export const TYPE_TO_STATE_KEY = {
  now_playing: "nowPlayingMovies",
  popular: "popularMovies",
  top_rated: "topRatedMovies",
  upcoming: "upcomingMovies",
};
