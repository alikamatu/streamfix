import { useState } from "react";
import { Calendar, Clock, Trash2, Play, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavBar from "@/components/NavBar";
import { trendingMovies, popularMovies } from "@/data/movieData";

interface WatchHistoryItem {
  id: string;
  movieId: string;
  title: string;
  image: string;
  watchedAt: string;
  progress: number; // percentage watched
  duration: string;
  genre: string;
  rating: string;
  year: string;
}

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([
    {
      id: "1",
      movieId: "1",
      title: "Inferno Protocol",
      image: trendingMovies[0].image,
      watchedAt: "2024-01-20T14:30:00Z",
      progress: 85,
      duration: "2h 25m",
      genre: "Action • Thriller",
      rating: "8.7",
      year: "2024"
    },
    {
      id: "2",
      movieId: "2", 
      title: "Eternal Promises",
      image: trendingMovies[1].image,
      watchedAt: "2024-01-19T20:15:00Z",
      progress: 100,
      duration: "1h 58m",
      genre: "Romance • Drama",
      rating: "8.1",
      year: "2024"
    },
    {
      id: "3",
      movieId: "3",
      title: "Midnight Shadows",
      image: trendingMovies[2].image,
      watchedAt: "2024-01-18T16:45:00Z",
      progress: 45,
      duration: "1h 47m",
      genre: "Horror • Mystery",
      rating: "7.9",
      year: "2024"
    },
    {
      id: "4",
      movieId: "7",
      title: "Dark Covenant",
      image: popularMovies[0].image,
      watchedAt: "2024-01-17T19:20:00Z",
      progress: 67,
      duration: "2h 18m",
      genre: "Horror • Supernatural",
      rating: "8.5",
      year: "2024"
    },
    {
      id: "5",
      movieId: "8",
      title: "Stellar Warriors",
      image: popularMovies[1].image,
      watchedAt: "2024-01-16T21:10:00Z",
      progress: 100,
      duration: "2h 31m",
      genre: "Sci-Fi • Action", 
      rating: "8.9",
      year: "2024"
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const removeFromHistory = (id: string) => {
    setWatchHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    setWatchHistory([]);
  };

  const continueWatching = watchHistory.filter(item => item.progress < 100 && item.progress > 10);
  const completedMovies = watchHistory.filter(item => item.progress === 100);
  const recentlyStarted = watchHistory.filter(item => item.progress <= 10);

  const WatchHistoryCard = ({ item }: { item: WatchHistoryItem }) => (
    <div className="glass-dark rounded-lg p-4 hover-scale group">
      <div className="flex space-x-4">
        <div className="relative flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-32 h-20 object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4" />
            </Button>
          </div>
          {item.progress > 0 && (
            <div className="absolute bottom-1 left-1 right-1 bg-black/60 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground truncate">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.genre}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span>{item.year}</span>
                <span>{item.duration}</span>
                <span className="flex items-center">
                  <span className="text-gold mr-1">★</span>
                  {item.rating}
                </span>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border shadow-lg z-50">
                <DropdownMenuItem className="text-foreground hover:bg-accent cursor-pointer">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Watching
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive hover:bg-destructive/20 cursor-pointer"
                  onClick={() => removeFromHistory(item.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove from History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Watched {formatDate(item.watchedAt)}</span>
            </div>
            
            {item.progress < 100 && (
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {item.progress}% watched
              </Badge>
            )}
            {item.progress === 100 && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Completed
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="pt-20">
        {/* Page Header */}
        <div className="bg-gradient-hero py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold text-foreground mb-4 animate-fade-in">
                  Watch History
                </h1>
                <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Track your viewing journey and continue where you left off
                </p>
              </div>
              
              {watchHistory.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={clearAllHistory}
                  className="border-border text-foreground hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All History
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {watchHistory.length === 0 ? (
            <div className="text-center py-16">
              <Clock className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">No Watch History</h2>
              <p className="text-muted-foreground mb-8">Start watching movies and shows to see your history here</p>
              <Button className="bg-primary hover:bg-primary/90">
                Browse Movies
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Continue Watching */}
              {continueWatching.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Continue Watching</h2>
                  <div className="space-y-4">
                    {continueWatching.map((item) => (
                      <WatchHistoryCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              )}

              {/* Recently Started */}
              {recentlyStarted.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Recently Started</h2>
                  <div className="space-y-4">
                    {recentlyStarted.map((item) => (
                      <WatchHistoryCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              )}

              {/* Completed */}
              {completedMovies.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Completed</h2>
                  <div className="space-y-4">
                    {completedMovies.map((item) => (
                      <WatchHistoryCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WatchHistory;