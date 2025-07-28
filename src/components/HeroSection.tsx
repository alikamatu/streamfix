import { useState, useEffect } from "react";
import { Play, Plus, Info, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";
import heroVideoPoster from "@/assets/hero-video-poster.jpg";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            className="w-full h-full object-cover"
            poster={heroVideoPoster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-3xl space-y-8 animate-fade-in">
          {/* Hero Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
            Quantum
            <span className="text-primary block md:inline"> Nexus</span>
          </h1>
          
          {/* Hero Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed" style={{ animationDelay: '0.2s' }}>
            In a world where reality bends to quantum mechanics, a brilliant scientist discovers 
            a portal to parallel dimensions. But each journey comes with a devastating cost.
          </p>
          
          {/* Movie Details */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground" style={{ animationDelay: '0.4s' }}>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              2024
            </span>
            <span className="text-lg">2h 18m</span>
            <span className="text-lg">Sci-Fi • Action</span>
            <div className="flex items-center">
              <span className="text-gold text-xl mr-1">★</span>
              <span className="text-lg font-semibold">8.4</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-lg hover-scale"
              onClick={() => setShowVideo(!showVideo)}
            >
              <Play className="mr-2 h-6 w-6" />
              {showVideo ? "Watch Trailer" : "Play Trailer"}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-foreground/20 text-foreground hover:bg-foreground/10 px-8 text-lg hover-scale backdrop-blur-sm"
            >
              <Plus className="mr-2 h-6 w-6" />
              Add to List
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-foreground/20 text-foreground hover:bg-foreground/10 px-8 text-lg hover-scale backdrop-blur-sm"
            >
              <Info className="mr-2 h-6 w-6" />
              More Info
            </Button>

            {/* Volume Control for Video */}
            {showVideo && (
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 text-foreground hover:bg-foreground/10 backdrop-blur-sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;