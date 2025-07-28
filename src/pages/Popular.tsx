import { useState } from "react";
import { TrendingUp, Star, Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import MovieRow from "@/components/MovieRow";
import { trendingMovies, popularMovies, actionMovies } from "@/data/movieData";
import { tvShows } from "@/data/tvShowData";

const Popular = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Get top-rated content
  const topMovies = [...trendingMovies, ...popularMovies, ...actionMovies]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 12);

  const topTVShows = [...tvShows]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 12);

  const allContent = [
    ...topMovies.map(movie => ({ ...movie, type: 'movie' })),
    ...topTVShows.map(show => ({ ...show, type: 'tv', duration: show.seasons }))
  ].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  const featuredContent = allContent[0];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="pt-20">
        {/* Featured Popular Content */}
        <div className="relative h-96 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${featuredContent.image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
          
          <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  #1 Most Popular
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
                {featuredContent.title}
              </h1>
              
              <div className="flex items-center space-x-6 mb-6 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Star className="h-4 w-4 text-gold mr-1" />
                  {featuredContent.rating}/10
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {featuredContent.year}
                </span>
                <span>{featuredContent.duration}</span>
                <span>{featuredContent.genre}</span>
              </div>
              
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Play className="mr-2 h-5 w-5" />
                Watch Now
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">What's Popular</h2>
            <p className="text-xl text-muted-foreground">
              Discover the most watched and highest-rated content
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-96 mx-auto mb-12">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="tv">TV Shows</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-12">
              {/* Top Rated Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {allContent.slice(0, 18).map((item, index) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="relative w-full h-64 rounded-lg overflow-hidden movie-card-hover">
                      {/* Ranking Badge */}
                      <div className="absolute top-2 left-2 z-20">
                        <Badge 
                          className={`${
                            index < 3 
                              ? 'bg-gold text-black' 
                              : index < 10 
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          } font-bold`}
                        >
                          #{index + 1}
                        </Badge>
                      </div>

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{item.title}</h3>
                        <div className="flex items-center space-x-1 text-xs text-gray-300 mb-2">
                          <Star className="h-3 w-3 text-gold" />
                          <span>{item.rating}</span>
                          <span>•</span>
                          <span>{item.year}</span>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="movies" className="space-y-8">
              <MovieRow
                title="Top Rated Movies"
                movies={topMovies}
              />
            </TabsContent>

            <TabsContent value="tv" className="space-y-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 px-4 sm:px-6 lg:px-8">
                  Top Rated TV Shows
                </h2>
                
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {topTVShows.map((show, index) => (
                      <div
                        key={show.id}
                        className="group cursor-pointer animate-fade-in"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: 'both'
                        }}
                      >
                        <div className="relative w-48 h-72 rounded-lg overflow-hidden movie-card-hover">
                          <img
                            src={show.image}
                            alt={show.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{show.title}</h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
                              <span className="flex items-center">
                                <Star className="h-3 w-3 text-gold mr-1" />
                                {show.rating}
                              </span>
                              <span>•</span>
                              <span>{show.year}</span>
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
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Popular;