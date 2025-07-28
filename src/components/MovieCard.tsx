import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  year: string;
  rating: string;
  duration: string;
  genre: string;
  isLarge?: boolean;
}

const MovieCard = ({ id, title, image, year, rating, duration, genre, isLarge = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${
        isLarge ? 'w-72 h-96' : 'w-48 h-72'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/movie/${id}`)}
    >
      {/* Movie Poster */}
      <div className="relative w-full h-full rounded-lg overflow-hidden movie-card-hover">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Content */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          
          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-3">
            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-xs">{year}</span>
            <span>{duration}</span>
            <span className="flex items-center">
              <span className="text-gold mr-1">★</span>
              {rating}
            </span>
          </div>
          
          <p className="text-gray-300 text-xs mb-3 line-clamp-1">{genre}</p>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full">
              <Play className="h-3 w-3" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:text-primary p-2 rounded-full border border-white/30 hover:border-primary">
              <Plus className="h-3 w-3" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:text-primary p-2 rounded-full border border-white/30 hover:border-primary">
              <ThumbsUp className="h-3 w-3" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:text-primary p-2 rounded-full border border-white/30 hover:border-primary ml-auto">
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white rounded-full p-4 backdrop-blur-sm"
          >
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Enhanced Hover Effect - Expanded Card */}
      <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-card/20 rounded-xl shadow-2xl border border-border/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
    </div>
  );
};

export default MovieCard;