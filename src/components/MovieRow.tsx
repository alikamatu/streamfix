import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  image: string;
  year: string;
  rating: string;
  duration: string;
  genre: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLarge?: boolean;
}

const MovieRow = ({ title, movies, isLarge = false }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.8;
      
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Update button visibility
      setTimeout(() => {
        if (rowRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
          setShowLeftButton(scrollLeft > 0);
          setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 100);
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-8 group">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-foreground mb-4 px-4 sm:px-6 lg:px-8 hover:text-primary transition-colors duration-300">
        {title}
      </h2>
      
      {/* Movies Container */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Left Scroll Button */}
        {showLeftButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        
        {/* Right Scroll Button */}
        {showRightButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
        
        {/* Movies Scroll Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`flex-shrink-0 animate-fade-in`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
                year={movie.year}
                rating={movie.rating}
                duration={movie.duration}
                genre={movie.genre}
                isLarge={isLarge}
              />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default MovieRow;