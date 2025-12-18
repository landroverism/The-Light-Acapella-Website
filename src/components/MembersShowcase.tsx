import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { colors } from '../theme/theme';

const MembersShowcase: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const members = useQuery(api.members.list) || [];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMemberRef = useRef<HTMLDivElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // The Light Acapella members
  const sampleMembers = [
    {
      name: 'Davis Rogoncho',
      voicePart: 'Lead',
      imageUrl: '/images/dav-ron-rg.png',
      yearsWithGroup: 5,
      testimony: 'Music has been my way of connecting with God and sharing His love with others.',
    },
    {
      name: 'Ken Ogetii',
      voicePart: 'Tenor',
      imageUrl: '/images/ken-1-rg.png',
      yearsWithGroup: 4,
      testimony: 'Through a cappella, I\'ve learned that harmony in music reflects harmony in life.',
    },
    {
      name: 'Ken',
      voicePart: 'Baritone',
      imageUrl: '/images/ken-2-rg.png',
      yearsWithGroup: 6,
      testimony: 'Every performance is an opportunity to minister and touch someone\'s heart.',
    },
    {
      name: 'Sydney',
      voicePart: 'Soprano',
      imageUrl: '/images/sydney-rg.png',
      yearsWithGroup: 3,
      testimony: 'The foundation of our music comes from the foundation of our faith.',
    },
    {
      name: 'Tenor Guy',
      voicePart: 'Tenor',
      imageUrl: '/images/tenor-guy-rg.png',
      yearsWithGroup: 2,
      testimony: 'Singing praises lifts the soul and brings us closer to heaven.',
    },
    {
      name: 'Bass Man',
      voicePart: 'Bass',
      imageUrl: '/images/bass-man-rg.png',
      yearsWithGroup: 4,
      testimony: 'The deep notes carry the weight of our worship and anchor our harmonies.',
    },
  ];

  const displayMembers = members.length > 0 ? members : sampleMembers;
  const totalMembers = displayMembers.length;

  const voicePartColors: Record<string, string> = {
    Lead: colors.voiceParts.lead,
    Tenor: colors.voiceParts.tenor,
    Baritone: colors.voiceParts.baritone,
    Bass: colors.voiceParts.bass,
    Soprano: colors.voiceParts.soprano,
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  // Intersection Observer to detect when last member is visible
  useEffect(() => {
    if (!lastMemberRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCanScrollDown(true);
          }
        });
      },
      {
        threshold: 0.7, // Trigger when 70% of last member is visible
      }
    );

    observer.observe(lastMemberRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Prevent vertical scrolling when section is in view and not all members seen
  useEffect(() => {
    const section = document.getElementById('members');
    if (!section) return;

    let isSectionInView = false;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSectionInView = entry.isIntersecting;
        });
      },
      {
        threshold: 0.3,
      }
    );

    sectionObserver.observe(section);

    // Prevent vertical scroll with wheel events
    const handleWheel = (e: WheelEvent) => {
      // Always allow scrolling if all members have been viewed
      if (canScrollDown) {
        return; // Don't prevent anything, allow normal scrolling
      }

      // If section is not in view, allow normal scrolling
      if (!isSectionInView) {
        return;
      }

      const container = scrollContainerRef.current;
      if (!container) return;

      // Check if we're at the end of horizontal scroll (all members viewed)
      const isAtEnd =
        container.scrollLeft >= container.scrollWidth - container.clientWidth - 10; // 10px tolerance

      // If at the end, allow vertical scrolling
      if (isAtEnd) {
        return;
      }

      // Check if horizontal scroll is possible
      const canScrollLeft = container.scrollLeft > 0;
      const canScrollRight =
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10;

      // If vertical scroll attempted and horizontal scroll is still available, convert it
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY > 0) {
        // Only prevent downward scroll if we can still scroll right
        if (canScrollRight) {
          e.preventDefault();
          // Convert vertical scroll to horizontal
          container.scrollBy({
            left: e.deltaY * 0.5, // Scale down for smoother scrolling
            behavior: 'smooth',
          });
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('wheel', handleWheel);
    };
  }, [canScrollDown]);

  // Track scroll position for navigation arrows and detect end of scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.clientWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);

      // Check if we've reached the end (all members viewed)
      const isAtEnd =
        scrollLeft >= container.scrollWidth - container.clientWidth - 20; // 20px tolerance
      
      if (isAtEnd && !canScrollDown) {
        setCanScrollDown(true);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [canScrollDown]);

  const scrollToMember = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    if (currentIndex < totalMembers - 1) {
      scrollToMember(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      scrollToMember(currentIndex - 1);
    }
  };

  const MemberCard = ({ member, index, isLast }: { member: typeof sampleMembers[0] | { name: string; voicePart: string; imageUrl: string; yearsWithGroup: number; testimony?: string }; index: number; isLast: boolean }) => (
    <Box
      ref={isLast ? lastMemberRef : null}
      sx={{
        minWidth: '100%',
        width: '100%',
        flexShrink: 0,
        px: { xs: 1, md: 2 },
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: { xs: '90%', md: 600 },
          width: '100%',
          borderRadius: 3,
          backgroundColor: 'transparent',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Full Image Background */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '70vh', md: '80vh' },
            minHeight: { xs: 500, md: 600 },
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={member.imageUrl}
            alt={member.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          
          {/* Gradient Overlay for Text Readability */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
            }}
          />
        </Box>

        {/* Content Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 3, md: 4 },
            textAlign: 'center',
          }}
        >
          {/* Name with Handwritten Font */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 700,
              color: 'primary.main',
              mb: 1,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.3)',
              transform: 'rotate(-1deg)',
              letterSpacing: '0.05em',
            }}
          >
            {member.name}
          </Typography>

          {/* Voice Part Chip */}
          <Chip
            label={member.voicePart}
            size="medium"
            sx={{
              backgroundColor: `${voicePartColors[member.voicePart]}30`,
              color: voicePartColors[member.voicePart],
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '0.9rem', md: '1rem' },
              height: { xs: 32, md: 36 },
              border: `2px solid ${voicePartColors[member.voicePart]}`,
              boxShadow: `0 0 10px ${voicePartColors[member.voicePart]}40`,
            }}
          />

          {/* Years */}
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 2,
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 500,
            }}
          >
            {member.yearsWithGroup} years with the group
          </Typography>

          {/* Testimony */}
          {member.testimony ? (
            <Box
              sx={{
                position: 'relative',
                px: { xs: 2, md: 3 },
                mt: 2,
              }}
            >
              <QuoteIcon
                sx={{
                  position: 'absolute',
                  top: -8,
                  left: { xs: 8, md: 16 },
                  fontSize: 32,
                  color: 'primary.main',
                  opacity: 0.6,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                }}
              >
                "{member.testimony}"
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Card>
    </Box>
  );

  return (
    <Box
      id="members"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Meet Our{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Members
              </Box>
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: 'text.secondary',
                maxWidth: 700,
                mx: 'auto',
                mb: 4,
                fontWeight: 400,
              }}
            >
              Scroll horizontally to view all members. Continue scrolling down after viewing everyone.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Horizontal Scroll Carousel */}
        <Box
          sx={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            mb: 4,
          }}
        >
          {/* Left Navigation Arrow */}
          {currentIndex > 0 && (
            <IconButton
              onClick={handleBack}
              sx={{
                position: 'absolute',
                left: { xs: 0, md: -20 },
                zIndex: 10,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                boxShadow: 3,
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          )}

          {/* Scroll Container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              width: '100%',
              gap: 0,
              '&::-webkit-scrollbar': {
                height: 8,
                display: { xs: 'none', md: 'block' },
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'primary.main',
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'primary.dark',
              },
              // Hide scrollbar on mobile
              scrollbarWidth: { xs: 'none', md: 'thin' },
            }}
          >
            {displayMembers.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                index={index}
                isLast={index === totalMembers - 1}
              />
            ))}
          </Box>

          {/* Right Navigation Arrow */}
          {currentIndex < totalMembers - 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: { xs: 0, md: -20 },
                zIndex: 10,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                boxShadow: 3,
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          )}
        </Box>

        {/* Progress Indicator */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 1,
            }}
          >
            {currentIndex + 1} of {totalMembers}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {displayMembers.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentIndex
                      ? 'primary.main'
                      : index < currentIndex
                      ? 'primary.main'
                      : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  opacity: index === currentIndex ? 1 : index < currentIndex ? 0.5 : 0.3,
                }}
              />
            ))}
          </Box>
          
          {/* Scroll Down Indicator */}
          {canScrollDown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  mt: 2,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <KeyboardArrowRight sx={{ transform: 'rotate(90deg)' }} />
                Scroll down to continue
                <KeyboardArrowRight sx={{ transform: 'rotate(90deg)' }} />
              </Typography>
            </motion.div>
          )}
        </Box>

        {/* Voice Parts Legend */}
        {canScrollDown && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  mb: 4,
                  fontWeight: 600,
                }}
              >
                Voice Parts
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {[
                  { part: 'Lead', color: colors.voiceParts.lead, desc: 'Melody & Harmony Lead' },
                  { part: 'Soprano', color: colors.voiceParts.soprano, desc: 'Highest Voice' },
                  { part: 'Tenor', color: colors.voiceParts.tenor, desc: 'High Harmony' },
                  { part: 'Baritone', color: colors.voiceParts.baritone, desc: 'Mid-Range Harmony' },
                  { part: 'Bass', color: colors.voiceParts.bass, desc: 'Foundation & Rhythm' },
                ].map((item) => (
                  <Grid size={{ xs: 6, sm: 3 }} key={item.part}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: item.color,
                          mx: 'auto',
                          mb: 1,
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: item.color,
                        }}
                      >
                        {item.part}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default MembersShowcase;
