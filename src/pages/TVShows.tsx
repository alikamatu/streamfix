import { useState } from "react";
import { Search, Filter, Grid, List, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { tvShows } from "@/data/tvShowData";

const TVShows = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort TV shows
  const filteredShows = tvShows
    .filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "all" || show.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      const matchesYear = selectedYear === "all" || show.year === selectedYear;
      return matchesSearch && matchesGenre && matchesYear;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "year":
          return parseInt(b.year) - parseInt(a.year);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const genres = ["Action", "Romance", "Horror", "Sci-Fi", "Drama", "Comedy", "Medical", "Crime"];
  const years = ["2024", "2023", "2022", "2021", "2020"];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="pt-20">
        {/* Page Header */}
        <div className="bg-gradient-hero py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-foreground mb-4 animate-fade-in">
                TV Shows & Series
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Binge-watch the best series and TV shows
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="glass-dark rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search TV shows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-32 bg-card border-border">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-24 bg-card border-border">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 bg-card border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredShows.length} TV shows
            </p>
          </div>

          {/* TV Shows Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredShows.map((show, index) => (
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
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{show.title}</h3>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                          {show.year}
                        </Badge>
                        <span className="flex items-center">
                          <span className="text-gold mr-1">★</span>
                          {show.rating}
                        </span>
                      </div>
                      
                      <div className="text-gray-300 text-xs mb-2">
                        <p>{show.seasons}</p>
                        <p>{show.episodes}</p>
                      </div>
                      
                      <p className="text-gray-300 text-xs mb-3 line-clamp-1">{show.genre}</p>
                      
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Play className="h-3 w-3 mr-1" />
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredShows.map((show, index) => (
                <div
                  key={show.id}
                  className="glass-dark rounded-lg p-4 flex items-center space-x-4 hover-scale animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{show.title}</h3>
                    <p className="text-muted-foreground">{show.genre}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {show.year}
                      </span>
                      <span>{show.seasons}</span>
                      <span>{show.episodes}</span>
                      <span className="flex items-center">
                        <span className="text-gold mr-1">★</span>
                        {show.rating}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Now
                  </Button>
                </div>
              ))}
            </div>
          )}

          {filteredShows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No TV shows found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TVShows;