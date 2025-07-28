import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Plus, ThumbsUp, Share2, Clock, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import MovieRow from "@/components/MovieRow";
import { trendingMovies, popularMovies, actionMovies, horrorMovies } from "@/data/movieData";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find movie from all collections
  const allMovies = [...trendingMovies, ...popularMovies, ...actionMovies, ...horrorMovies];
  const movie = allMovies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Mock additional data for detail page
  const movieDetails = {
    ...movie,
    description: "An epic tale of adventure, mystery, and unforgettable characters that will keep you on the edge of your seat. This masterpiece combines stunning visuals with compelling storytelling to create an unforgettable cinematic experience.",
    director: "Christopher Nolan",
    cast: ["Ryan Gosling", "Emma Stone", "John Krasinski", "Margot Robbie"],
    languages: ["English", "Spanish"],
    quality: "4K Ultra HD",
    releaseDate: "December 15, 2024",
    trailerUrl: "https://example.com/trailer.mp4"
  };

  const similarMovies = allMovies.filter(m => 
    m.id !== movie.id && 
    m.genre.split(" • ").some(g => movie.genre.includes(g))
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-8 text-foreground hover:bg-card/50"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              {/* Movie Info */}
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                    {movieDetails.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-gold fill-current" />
                      <span className="text-foreground font-semibold">{movieDetails.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{movieDetails.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{movieDetails.duration}</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {movieDetails.quality}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {movieDetails.genre.split(" • ").map((genre) => (
                      <Badge key={genre} variant="outline" className="border-border text-foreground">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {movieDetails.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <span className="text-foreground font-semibold mr-2">Director:</span>
                    <span className="text-muted-foreground">{movieDetails.director}</span>
                  </div>
                  <div>
                    <span className="text-foreground font-semibold mr-2">Cast:</span>
                    <span className="text-muted-foreground">{movieDetails.cast.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-foreground font-semibold mr-2">Languages:</span>
                    <span className="text-muted-foreground">{movieDetails.languages.join(", ")}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-card">
                    <Plus className="mr-2 h-5 w-5" />
                    Add to List
                  </Button>
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-card">
                    <ThumbsUp className="mr-2 h-5 w-5" />
                    Like
                  </Button>
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-card">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Movie Poster */}
              <div className="lg:flex lg:justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative group">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full max-w-md mx-auto rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MovieRow
              title="More Like This"
              movies={similarMovies}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;