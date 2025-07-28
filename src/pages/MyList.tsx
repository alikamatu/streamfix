import { useState } from "react";
import { Heart, Play, Trash2, Download, Share, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { trendingMovies } from "@/data/movieData";
import { tvShows } from "@/data/tvShowData";

const MyList = () => {
  // Simulate user's saved content (in a real app, this would come from a database)
  const [savedMovies, setSavedMovies] = useState(trendingMovies.slice(0, 6));
  const [savedShows, setSavedShows] = useState(tvShows.slice(0, 4));
  const [recentlyWatched] = useState([
    ...trendingMovies.slice(2, 5),
    ...tvShows.slice(1, 3)
  ]);

  const removeFromList = (id: string, type: 'movie' | 'tv') => {
    if (type === 'movie') {
      setSavedMovies(savedMovies.filter(movie => movie.id !== id));
    } else {
      setSavedShows(savedShows.filter(show => show.id !== id));
    }
  };

  const allSaved = [
    ...savedMovies.map(movie => ({ ...movie, type: 'movie' })),
    ...savedShows.map(show => ({ ...show, type: 'tv', duration: show.seasons }))
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="pt-20">
        {/* Page Header */}
        <div className="bg-gradient-hero py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-foreground mb-4 animate-fade-in">
                My List
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Your personal collection of saved content
              </p>
              <div className="flex justify-center space-x-8 mt-6 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 text-primary mr-2" />
                  {allSaved.length} items saved
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {recentlyWatched.length} recently watched
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px] mx-auto mb-12">
              <TabsTrigger value="all">All ({allSaved.length})</TabsTrigger>
              <TabsTrigger value="movies">Movies ({savedMovies.length})</TabsTrigger>
              <TabsTrigger value="tv">TV Shows ({savedShows.length})</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {allSaved.length > 0 ? (
                <div className="space-y-4">
                  {allSaved.map((item, index) => (
                    <div
                      key={item.id}
                      className="glass-dark rounded-lg p-4 flex items-center space-x-4 hover-scale animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {item.type === 'movie' ? 'Movie' : 'TV Show'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{item.genre}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{item.year}</span>
                          <span>{item.duration}</span>
                          <span className="flex items-center">
                            <span className="text-gold mr-1">★</span>
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFromList(item.id, item.type as 'movie' | 'tv')}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Your list is empty.</p>
                  <p className="text-muted-foreground">Start adding movies and shows you want to watch!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="movies" className="space-y-8">
              {savedMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {savedMovies.map((movie, index) => (
                    <div
                      key={movie.id}
                      className="group cursor-pointer animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      <div className="relative w-full h-72 rounded-lg overflow-hidden movie-card-hover">
                        <img
                          src={movie.image}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        <div className="absolute top-2 right-2 z-20">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromList(movie.id, 'movie')}
                            className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-3">
                            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-xs">{movie.year}</span>
                            <span>{movie.duration}</span>
                            <span className="flex items-center">
                              <span className="text-gold mr-1">★</span>
                              {movie.rating}
                            </span>
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Play className="h-3 w-3 mr-1" />
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No movies in your list yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tv" className="space-y-8">
              {savedShows.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {savedShows.map((show, index) => (
                    <div
                      key={show.id}
                      className="group cursor-pointer animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      <div className="relative w-full h-72 rounded-lg overflow-hidden movie-card-hover">
                        <img
                          src={show.image}
                          alt={show.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        <div className="absolute top-2 right-2 z-20">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromList(show.id, 'tv')}
                            className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{show.title}</h3>
                          <div className="text-gray-300 text-xs mb-2">
                            <p>{show.seasons}</p>
                            <p>{show.episodes}</p>
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Play className="h-3 w-3 mr-1" />
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No TV shows in your list yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-8">
              <div className="space-y-4">
                {recentlyWatched.map((item, index) => (
                  <div
                    key={item.id}
                    className="glass-dark rounded-lg p-4 flex items-center space-x-4 hover-scale animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground mb-2">{item.genre}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{item.year}</span>
                        <span>{'duration' in item ? item.duration : item.seasons}</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Watched 2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyList;