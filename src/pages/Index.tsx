import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import { trendingMovies, popularMovies, actionMovies, horrorMovies } from "@/data/movieData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Movie Sections */}
        <div className="space-y-8 py-8">
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
            isLarge={true}
          />
          
          <MovieRow
            title="Popular Movies"
            movies={popularMovies}
          />
          
          <MovieRow
            title="Action & Adventure"
            movies={actionMovies}
          />
          
          <MovieRow
            title="Horror & Thriller"
            movies={horrorMovies}
          />
        </div>
        
        {/* Footer */}
        <footer className="bg-card/50 backdrop-blur-sm border-t border-border/20 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">StreamFlix</h3>
              <p className="text-muted-foreground mb-6">
                Your ultimate destination for premium entertainment
              </p>
              <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">About</a>
                <a href="#" className="hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
