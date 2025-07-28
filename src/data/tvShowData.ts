import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";

export interface TVShow {
  id: string;
  title: string;
  image: string;
  year: string;
  rating: string;
  seasons: string;
  genre: string;
  episodes?: string;
}

export const tvShows: TVShow[] = [
  {
    id: "tv1",
    title: "Cyber City Chronicles",
    image: movie4,
    year: "2024",
    rating: "9.1",
    seasons: "2 Seasons",
    episodes: "20 Episodes",
    genre: "Sci-Fi • Drama"
  },
  {
    id: "tv2",
    title: "Love in the Suburbs",
    image: movie2,
    year: "2023",
    rating: "8.5",
    seasons: "3 Seasons",
    episodes: "36 Episodes",
    genre: "Romance • Comedy"
  },
  {
    id: "tv3",
    title: "Nightmare Hospital",
    image: movie3,
    year: "2024",
    rating: "8.8",
    seasons: "1 Season",
    episodes: "10 Episodes",
    genre: "Horror • Medical"
  },
  {
    id: "tv4",
    title: "Elite Forces",
    image: movie1,
    year: "2023",
    rating: "8.3",
    seasons: "4 Seasons",
    episodes: "48 Episodes",
    genre: "Action • Military"
  },
  {
    id: "tv5",
    title: "Quantum Investigators",
    image: movie4,
    year: "2024",
    rating: "8.7",
    seasons: "2 Seasons",
    episodes: "24 Episodes",
    genre: "Sci-Fi • Mystery"
  },
  {
    id: "tv6",
    title: "Heart & Soul",
    image: movie2,
    year: "2022",
    rating: "8.0",
    seasons: "5 Seasons",
    episodes: "65 Episodes",
    genre: "Romance • Drama"
  },
  {
    id: "tv7",
    title: "The Haunting Tales",
    image: movie3,
    year: "2024",
    rating: "8.4",
    seasons: "3 Seasons",
    episodes: "30 Episodes",
    genre: "Horror • Anthology"
  },
  {
    id: "tv8",
    title: "Street Warriors",
    image: movie1,
    year: "2023",
    rating: "7.9",
    seasons: "2 Seasons",
    episodes: "20 Episodes",
    genre: "Action • Crime"
  },
  {
    id: "tv9",
    title: "Space Odyssey 2025",
    image: movie4,
    year: "2024",
    rating: "9.3",
    seasons: "1 Season",
    episodes: "12 Episodes",
    genre: "Sci-Fi • Adventure"
  },
  {
    id: "tv10",
    title: "Dating in Digital Age",
    image: movie2,
    year: "2023",
    rating: "7.7",
    seasons: "2 Seasons",
    episodes: "24 Episodes",
    genre: "Romance • Reality"
  },
  {
    id: "tv11",
    title: "Midnight Murders",
    image: movie3,
    year: "2024",
    rating: "8.6",
    seasons: "1 Season",
    episodes: "8 Episodes",
    genre: "Horror • Crime"
  },
  {
    id: "tv12",
    title: "Combat Zone",
    image: movie1,
    year: "2022",
    rating: "8.1",
    seasons: "3 Seasons",
    episodes: "39 Episodes",
    genre: "Action • War"
  }
];