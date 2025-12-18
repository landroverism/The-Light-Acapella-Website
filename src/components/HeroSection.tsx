import React from 'react';
import AudioPlayer from './AudioPlayer';

interface HeroSectionProps {
  onOpenModal: (modal: string) => void;
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenModal, 
  currentlyPlaying, 
  setCurrentlyPlaying 
}) => {
  const featuredSong = {
    id: 'featured-1',
    title: 'The Rock',
    duration: '4:32',
    audioUrl: '/audio/The Rock.mp3'
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img 
          src="/images/hero-performance.jpg" 
          alt="The Light Acapella Performance"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient background if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
            The Light <span className="text-gold">Acapella</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl mb-8 text-gray-300 fade-in">
            Touching and Changing Lives Through Music
          </p>
          
          {/* Church Affiliation */}
          <p className="text-lg mb-12 text-gray-400 fade-in">
            Syokimau Central SDA Church • Nairobi, Kenya
          </p>

          {/* Featured Audio Player */}
          <div className="max-w-md mx-auto mb-12 fade-in">
            <h3 className="text-lg font-semibold mb-4 text-gold">Featured Song</h3>
            <AudioPlayer 
              song={featuredSong}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
            />
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <button 
              onClick={() => onOpenModal('quotation')}
              className="btn-primary text-lg px-8 py-4"
            >
              Book Us for Your Event
            </button>
            <button 
              onClick={() => onOpenModal('donation')}
              className="btn-secondary text-lg px-8 py-4"
            >
              Support Our Ministry
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in">
          <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
