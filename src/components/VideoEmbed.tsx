import React, { useState } from 'react';

interface VideoEmbedProps {
  youtubeId: string;
  title: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ youtubeId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full pb-[56.25%] bg-gray-800 rounded-lg overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
