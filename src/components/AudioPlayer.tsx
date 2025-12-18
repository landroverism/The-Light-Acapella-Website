import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Slider,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Song {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
}

interface AudioPlayerProps {
  song: Song;
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  song,
  currentlyPlaying,
  setCurrentlyPlaying,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isCurrentlyPlaying = currentlyPlaying === song.id;

  useEffect(() => {
    if (currentlyPlaying !== song.id && isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [currentlyPlaying, song.id, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setCurrentlyPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(song.id);
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const newTime = newValue as number;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper
      component={motion.div}
      whileHover={{ scale: 1.01 }}
      elevation={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, md: 2 },
        p: { xs: 1.5, md: 2 },
        borderRadius: 3,
        backgroundColor: 'background.paper',
        border: isCurrentlyPlaying && isPlaying ? 1 : 0,
        borderColor: 'primary.main',
        transition: 'all 0.3s ease',
      }}
    >
      <audio ref={audioRef} src={song.audioUrl} preload="metadata" />

      {/* Play/Pause Button */}
      <IconButton
        onClick={togglePlay}
        disabled={isLoading}
        sx={{
          width: compact ? 44 : 52,
          height: compact ? 44 : 52,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
            transform: 'scale(1.05)',
          },
          '&:disabled': {
            backgroundColor: 'primary.main',
          },
          transition: 'all 0.2s ease',
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: 'primary.contrastText' }} />
        ) : isPlaying && isCurrentlyPlaying ? (
          <PauseIcon sx={{ fontSize: compact ? 24 : 28 }} />
        ) : (
          <PlayIcon sx={{ fontSize: compact ? 24 : 28, ml: 0.3 }} />
        )}
      </IconButton>

      {/* Song Info and Progress */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 0.5,
          }}
        >
          <Typography
            variant={compact ? 'body2' : 'subtitle1'}
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              pr: 1,
            }}
          >
            {song.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              flexShrink: 0,
              fontFamily: 'monospace',
            }}
          >
            {formatTime(currentTime)} / {formatTime(duration) || song.duration}
          </Typography>
        </Box>

        {/* Progress Slider */}
        <Slider
          value={currentTime}
          max={duration || 100}
          onChange={handleSliderChange}
          size="small"
          sx={{
            height: 4,
            padding: '8px 0',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
              transition: 'all 0.2s ease',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(255, 215, 0, 0.16)',
              },
              '&:before': {
                display: 'none',
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.3,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default AudioPlayer;
