import React, { useState } from 'react';
import { Box, Skeleton, IconButton } from '@mui/material';
import { PlayCircle as PlayCircleIcon } from '@mui/icons-material';

interface VideoEmbedProps {
  youtubeId: string;
  title: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ youtubeId, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube thumbnail URL (maxresdefault for best quality, fallback to hqdefault)
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        cursor: isPlaying ? 'default' : 'pointer',
        '&:hover .play-overlay': {
          opacity: isPlaying ? 0 : 1,
        },
      }}
      onClick={!isPlaying ? handlePlay : undefined}
    >
      {!isPlaying ? (
        // Thumbnail Preview with Play Button
        <>
          <Box
            component="img"
            src={thumbnailUrl}
            alt={title}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // Fallback to lower quality thumbnail if maxresdefault fails
              if (e.currentTarget.src !== fallbackThumbnailUrl) {
                e.currentTarget.src = fallbackThumbnailUrl;
              }
            }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Play Button Overlay */}
          <Box
            className="play-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
            }}
          >
            <IconButton
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'rgba(255, 0, 0, 0.9)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <PlayCircleIcon sx={{ fontSize: 60 }} />
            </IconButton>
          </Box>
        </>
      ) : (
        // YouTube Embed
        <>
          {isLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )}
          <Box
            component="iframe"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default VideoEmbed;
