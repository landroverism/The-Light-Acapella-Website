import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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
        overflow: 'hidden',
        backgroundColor: '#0a0a0a', // Deep dark, not flat black
      }}
    >
      {/* Background Layers - Light Emerging from Darkness */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* Optional Low-Opacity Worship Imagery */}
        <Box
          component="img"
          src="/images/hero-performance.jpg"
          alt=""
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15, // Very subtle
            filter: 'blur(2px)',
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Deep Dark Base with Texture */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(20, 15, 5, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 50%, rgba(10, 8, 5, 0.6) 0%, transparent 50%),
              linear-gradient(180deg, #0a0a0a 0%, #050505 50%, #0a0a0a 100%)
            `,
          }}
        />

        {/* Warm Gold Glow - Light Emerging */}
        <Box
          component={motion.div}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 60% at ${isMobile ? '50%' : '40%'} 50%, 
                rgba(255, 215, 0, 0.12) 0%, 
                rgba(255, 200, 0, 0.06) 30%, 
                transparent 70%
              )
            `,
          }}
        />

        {/* Secondary Gold Glow - Subtle */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 40% at ${isMobile ? '50%' : '35%'} 45%, 
                rgba(255, 215, 0, 0.08) 0%, 
                transparent 60%
              )
            `,
          }}
        />
      </Box>

      {/* Content Container */}
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          py: { xs: 6, md: 8, lg: 10 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start', lg: 'center' },
            justifyContent: { xs: 'center', md: 'flex-start', lg: 'space-between' },
            gap: { xs: 6, md: 8 },
            minHeight: { xs: 'calc(100vh - 120px)', md: 'calc(100vh - 160px)' },
          }}
        >
          {/* Left Content - Dominant on Desktop */}
          <Box
            sx={{
              flex: { xs: '0 0 auto', md: '0 0 55%', lg: '0 0 50%' },
              width: '100%',
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { xs: '100%', md: '600px', lg: '700px' },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Main Headline - Dominant */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '3rem',
                    sm: '4rem',
                    md: '5rem',
                    lg: '6.5rem',
                  },
                  fontWeight: 300,
                  lineHeight: 1.05,
                  mb: { xs: 3, md: 4 },
                  letterSpacing: { xs: '-0.02em', md: '-0.03em' },
                  color: '#FFFFFF',
                }}
              >
                The{' '}
                <Box
                  component="span"
                  sx={{
                    fontFamily: '"Dancing Script", cursive',
                    color: 'primary.main',
                    fontWeight: 700,
                    display: 'block',
                    fontSize: {
                      xs: '3.5rem',
                      sm: '4.5rem',
                      md: '5.5rem',
                      lg: '7rem',
                    },
                    textShadow: {
                      xs: '0 0 30px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)',
                      md: '0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.3)',
                    },
                    transform: 'rotate(-1deg)',
                    mt: { xs: 0.5, md: 1 },
                  }}
                >
                  Light
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    fontSize: {
                      xs: '2.5rem',
                      sm: '3rem',
                      md: '3.5rem',
                      lg: '4.5rem',
                    },
                    fontWeight: 200,
                    letterSpacing: '0.1em',
                    mt: { xs: 1, md: 1.5 },
                    opacity: 0.95,
                  }}
                >
                  Acapella
                </Box>
              </Typography>

              {/* Tagline - Reverent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    mb: { xs: 4, md: 5 },
                    fontWeight: 300,
                    fontSize: { xs: '1.1rem', md: '1.35rem', lg: '1.5rem' },
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    maxWidth: { xs: '100%', md: '90%' },
                  }}
                >
                  Touching and Changing Lives Through Music
                </Typography>
              </motion.div>

              {/* Church Affiliation - Subtle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    mb: { xs: 5, md: 6 },
                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                    fontWeight: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    gap: 1.5,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)',
                    }}
                  />
                  Syokimau Central SDA Church • Nairobi, Kenya
                </Typography>
              </motion.div>
            </motion.div>
          </Box>

          {/* Right Content - Music Player & CTA (Desktop) */}
          <Box
            sx={{
              flex: { xs: '0 0 auto', md: '0 0 40%', lg: '0 0 45%' },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-end', lg: 'center' },
              justifyContent: 'center',
              gap: { xs: 4, md: 5 },
            }}
          >
            {/* Featured Audio Player - Core Feature */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ width: '100%' }}
            >
              <Box sx={{ maxWidth: { xs: '100%', md: '480px' }, mx: 'auto' }}>
              <Box
                sx={{
                  mb: { xs: 2, md: 3 },
                  textAlign: { xs: 'center', md: 'left', lg: 'center' },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: 'primary.main',
                    letterSpacing: { xs: 2, md: 3 },
                    fontSize: { xs: '0.7rem', md: '0.75rem' },
                    fontWeight: 500,
                    opacity: 0.9,
                  }}
                >
                  Featured Song
                </Typography>
              </Box>
                <AudioPlayer
                  song={featuredSong}
                  currentlyPlaying={currentlyPlaying}
                  setCurrentlyPlaying={setCurrentlyPlaying}
                />
              </Box>
            </motion.div>

            {/* Single Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ width: '100%' }}
            >
              <Box sx={{ maxWidth: { xs: '100%', md: '480px' }, mx: 'auto' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<CalendarIcon />}
                onClick={() => onOpenModal('quotation')}
                fullWidth={isMobile}
                sx={{
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.75, md: 2 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(255, 215, 0, 0.4)',
                  },
                }}
              >
                Book Us for Your Event
              </Button>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Subtle Scroll Indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={scrollToGallery}
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 32 },
          left: { xs: '50%', md: '50%', lg: 'auto' },
          right: { lg: 48 },
          transform: { xs: 'translateX(-50%)', md: 'translateX(-50%)', lg: 'none' },
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
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontSize: '0.65rem',
            fontWeight: 300,
          }}
        >
          Scroll
        </Typography>
        <Box
          component={motion.div}
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            width: 1,
            height: 32,
            backgroundColor: 'rgba(255, 215, 0, 0.4)',
            borderRadius: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
