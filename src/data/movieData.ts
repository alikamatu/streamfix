import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import infernoProtocol from "@/assets/inferno-protocol.jpg";
import eternalPromises from "@/assets/eternal-promises.jpg";
import midnightShadows from "@/assets/midnight-shadows.jpg";
import galacticOdyssey from "@/assets/galactic-odyssey.jpg";
import urbanLegends from "@/assets/urban-legends.jpg";
import loveInParis from "@/assets/love-in-paris.jpg";

export interface Movie {
  id: string;
  title: string;
  image: string;
  year: string;
  rating: string;
  duration: string;
  genre: string;
}

export const trendingMovies: Movie[] = [
  {
    id: "1",
    title: "Inferno Protocol",
    image: infernoProtocol,
    year: "2024",
    rating: "8.7",
    duration: "2h 25m",
    genre: "Action • Thriller"
  },
  {
    id: "2",
    title: "Eternal Promises",
    image: eternalPromises,
    year: "2024",
    rating: "8.1",
    duration: "1h 58m",
    genre: "Romance • Drama"
  },
  {
    id: "3",
    title: "Midnight Shadows",
    image: midnightShadows,
    year: "2024",
    rating: "7.9",
    duration: "1h 47m",
    genre: "Horror • Mystery"
  },
  {
    id: "4",
    title: "Galactic Odyssey",
    image: galacticOdyssey,
    year: "2024",
    rating: "9.2",
    duration: "2h 44m",
    genre: "Sci-Fi • Adventure"
  },
  {
    id: "5",
    title: "Urban Legends",
    image: urbanLegends,
    year: "2023",
    rating: "7.6",
    duration: "2h 12m",
    genre: "Action • Crime"
  },
  {
    id: "6",
    title: "Love in Paris",
    image: loveInParis,
    year: "2023",
    rating: "8.3",
    duration: "1h 42m",
    genre: "Romance • Comedy"
  }
];

export const popularMovies: Movie[] = [
  {
    id: "7",
    title: "Dark Covenant",
    image: movie3,
    year: "2024",
    rating: "8.5",
    duration: "2h 18m",
    genre: "Horror • Supernatural"
  },
  {
    id: "8",
    title: "Stellar Warriors",
    image: movie4,
    year: "2024",
    rating: "8.9",
    duration: "2h 31m",
    genre: "Sci-Fi • Action"
  },
  {
    id: "9",
    title: "Silent Storm",
    image: movie1,
    year: "2023",
    rating: "7.8",
    duration: "1h 56m",
    genre: "Thriller • Drama"
  },
  {
    id: "10",
    title: "Golden Hearts",
    image: movie2,
    year: "2023",
    rating: "8.0",
    duration: "2h 04m",
    genre: "Romance • Musical"
  },
  {
    id: "11",
    title: "Phantom Manor",
    image: movie3,
    year: "2024",
    rating: "7.7",
    duration: "1h 39m",
    genre: "Horror • Mystery"
  },
  {
    id: "12",
    title: "Cosmic Journey",
    image: movie4,
    year: "2024",
    rating: "8.8",
    duration: "2h 28m",
    genre: "Sci-Fi • Fantasy"
  }
];

export const actionMovies: Movie[] = [
  {
    id: "13",
    title: "Vengeance Rising",
    image: movie1,
    year: "2024",
    rating: "8.4",
    duration: "2h 15m",
    genre: "Action • Thriller"
  },
  {
    id: "14",
    title: "Speed Demon",
    image: movie1,
    year: "2023",
    rating: "7.9",
    duration: "1h 48m",
    genre: "Action • Crime"
  },
  {
    id: "15",
    title: "Iron Battalion",
    image: movie1,
    year: "2024",
    rating: "8.6",
    duration: "2h 22m",
    genre: "Action • War"
  },
  {
    id: "16",
    title: "Night Assassin",
    image: movie1,
    year: "2023",
    rating: "8.1",
    duration: "1h 52m",
    genre: "Action • Spy"
  },
  {
    id: "17",
    title: "Urban Justice",
    image: movie1,
    year: "2024",
    rating: "7.7",
    duration: "2h 08m",
    genre: "Action • Crime"
  },
  {
    id: "18",
    title: "Final Strike",
    image: movie1,
    year: "2024",
    rating: "8.3",
    duration: "2h 11m",
    genre: "Action • Military"
  }
];

export const horrorMovies: Movie[] = [
  {
    id: "19",
    title: "The Haunting Hour",
    image: movie3,
    year: "2024",
    rating: "8.2",
    duration: "1h 44m",
    genre: "Horror • Supernatural"
  },
  {
    id: "20",
    title: "Cursed Legacy",
    image: movie3,
    year: "2023",
    rating: "7.8",
    duration: "1h 38m",
    genre: "Horror • Mystery"
  },
  {
    id: "21",
    title: "Blood Moon Rising",
    image: movie3,
    year: "2024",
    rating: "8.0",
    duration: "1h 51m",
    genre: "Horror • Thriller"
  },
  {
    id: "22",
    title: "Sinister Whispers",
    image: movie3,
    year: "2023",
    rating: "7.5",
    duration: "1h 42m",
    genre: "Horror • Psychological"
  },
  {
    id: "23",
    title: "The Possession",
    image: movie3,
    year: "2024",
    rating: "8.1",
    duration: "1h 47m",
    genre: "Horror • Supernatural"
  },
  {
    id: "24",
    title: "Dark Ritual",
    image: movie3,
    year: "2024",
    rating: "7.9",
    duration: "1h 55m",
    genre: "Horror • Occult"
  }
];