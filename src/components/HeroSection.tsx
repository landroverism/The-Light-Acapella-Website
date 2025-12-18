import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Favorite as FavoriteIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';
import { fadeInUp, staggerContainer } from '../utils/motion';

interface HeroSectionProps {
  onOpenModal: (modal: string) => void;
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenModal,
  currentlyPlaying,
  setCurrentlyPlaying,
}) => {
  const featuredSong = {
    id: 'featured-1',
    title: 'The Rock',
    duration: '4:32',
    audioUrl: '/audio/The Rock.mp3',
  };

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.5) 50%,
              rgba(0, 0, 0, 0.9) 100%
            )`,
            zIndex: 1,
          }}
        />
        {/* Background Image */}
        <Box
          component="img"
          src="/images/hero-performance.jpg"
          alt="The Light Acapella Performance"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.background =
                'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)';
            }
          }}
        />
        {/* Animated gradient overlay for visual interest */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(
              ellipse at 50% 50%,
              rgba(255, 215, 0, 0.03) 0%,
              transparent 70%
            )`,
            zIndex: 2,
          }}
        />
      </Box>

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          py: { xs: 8, md: 12 },
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.1,
              }}
            >
              The Light{' '}
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
                }}
              >
                Acapella
              </Box>
            </Typography>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 2,
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
              }}
            >
              Touching and Changing Lives Through Music
            </Typography>
          </motion.div>

          {/* Church Affiliation */}
          <motion.div variants={fadeInUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 6,
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                }}
              />
              Syokimau Central SDA Church • Nairobi, Kenya
            </Typography>
          </motion.div>

          {/* Featured Audio Player */}
          <motion.div variants={fadeInUp}>
            <Box
              sx={{
                maxWidth: 420,
                mx: 'auto',
                mb: 6,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  letterSpacing: 3,
                  mb: 2,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                ♪ Featured Song
              </Typography>
              <AudioPlayer
                song={featuredSong}
                currentlyPlaying={currentlyPlaying}
                setCurrentlyPlaying={setCurrentlyPlaying}
              />
            </Box>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div variants={fadeInUp}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<CalendarIcon />}
                onClick={() => onOpenModal('quotation')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  minWidth: { xs: '100%', sm: 'auto' },
                }}
              >
                Book Us for Your Event
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteIcon />}
                onClick={() => onOpenModal('donation')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  minWidth: { xs: '100%', sm: 'auto' },
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(255, 215, 0, 0.08)',
                  },
                }}
              >
                Support Our Ministry
              </Button>
            </Stack>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToGallery}
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 40 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          Scroll
        </Typography>
        <Box
          component={motion.div}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            width: 32,
            height: 52,
            border: 2,
            borderColor: 'primary.main',
            borderRadius: 16,
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 8,
              backgroundColor: 'primary.main',
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
