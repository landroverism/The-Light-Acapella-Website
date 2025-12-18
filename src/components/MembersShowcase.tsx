import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  MobileStepper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { colors } from '../theme/theme';

const MembersShowcase: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const members = useQuery(api.members.list) || [];
  const [activeStep, setActiveStep] = useState(0);

  // The Light Acapella members
  const sampleMembers = [
    {
      name: 'Davis Rogoncho',
      voicePart: 'Lead',
      imageUrl: '/images/dav-ron.jpg',
      yearsWithGroup: 5,
      testimony: 'Music has been my way of connecting with God and sharing His love with others.',
    },
    {
      name: 'Ken Ogetii',
      voicePart: 'Tenor',
      imageUrl: '/images/ken-1.jpg',
      yearsWithGroup: 4,
      testimony: 'Through a cappella, I\'ve learned that harmony in music reflects harmony in life.',
    },
    {
      name: 'Ken',
      voicePart: 'Baritone',
      imageUrl: '/images/ken-2.jpg',
      yearsWithGroup: 6,
      testimony: 'Every performance is an opportunity to minister and touch someone\'s heart.',
    },
    {
      name: 'Sydney',
      voicePart: 'Soprano',
      imageUrl: '/images/sydney.jpg',
      yearsWithGroup: 3,
      testimony: 'The foundation of our music comes from the foundation of our faith.',
    },
    {
      name: 'Tenor Guy',
      voicePart: 'Tenor',
      imageUrl: '/images/tenor-guy.jpg',
      yearsWithGroup: 2,
      testimony: 'Singing praises lifts the soul and brings us closer to heaven.',
    },
    {
      name: 'Bass Man',
      voicePart: 'Bass',
      imageUrl: '/images/bass-man.jpg',
      yearsWithGroup: 4,
      testimony: 'The deep notes carry the weight of our worship and anchor our harmonies.',
    },
  ];

  const displayMembers = members.length > 0 ? members : sampleMembers;
  const maxSteps = displayMembers.length;

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + maxSteps) % maxSteps);
  };

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

  const MemberCard = ({ member, index }: { member: typeof sampleMembers[0]; index: number }) => (
    <motion.div variants={fadeInUp}>
      <Card
        sx={{
          height: '100%',
          textAlign: 'center',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <CardContent sx={{ pt: 5, pb: 4 }}>
          {/* Avatar */}
          <Avatar
            src={member.imageUrl}
            alt={member.name}
            sx={{
              width: { xs: 100, md: 120 },
              height: { xs: 100, md: 120 },
              mx: 'auto',
              mb: 3,
              border: 3,
              borderColor: voicePartColors[member.voicePart] || 'primary.main',
              fontSize: '2rem',
              backgroundColor: voicePartColors[member.voicePart] || 'primary.main',
            }}
          >
            {getInitials(member.name)}
          </Avatar>

          {/* Name */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            {member.name}
          </Typography>

          {/* Voice Part Chip */}
          <Chip
            label={member.voicePart}
            size="small"
            sx={{
              backgroundColor: `${voicePartColors[member.voicePart]}20`,
              color: voicePartColors[member.voicePart],
              fontWeight: 600,
              mb: 2,
            }}
          />

          {/* Years */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 3,
            }}
          >
            {member.yearsWithGroup} years with the group
          </Typography>

          {/* Testimony */}
          {member.testimony && (
            <Box
              sx={{
                position: 'relative',
                px: 2,
              }}
            >
              <QuoteIcon
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: 0,
                  fontSize: 24,
                  color: 'primary.main',
                  opacity: 0.5,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                }}
              >
                "{member.testimony}"
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box
      id="members"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
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
                mb: 8,
                fontWeight: 400,
              }}
            >
              Each voice brings a unique gift to our ministry, creating the harmony that defines The
              Light Acapella's sound and spirit.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Desktop Grid View */}
        {!isMobile && (
          <Grid container spacing={4}>
            {displayMembers.map((member, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <MemberCard member={member} index={index} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Mobile Carousel View */}
        {isMobile && (
          <Box sx={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ maxWidth: 350, mx: 'auto' }}>
                  <MemberCard member={displayMembers[activeStep]} index={activeStep} />
                </Box>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <IconButton
              onClick={handleBack}
              sx={{
                position: 'absolute',
                left: { xs: -8, sm: 0 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: { xs: -8, sm: 0 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <KeyboardArrowRight />
            </IconButton>

            {/* Stepper Dots */}
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                mt: 4,
                '& .MuiMobileStepper-dot': {
                  backgroundColor: 'text.secondary',
                  opacity: 0.3,
                },
                '& .MuiMobileStepper-dotActive': {
                  backgroundColor: 'primary.main',
                  opacity: 1,
                },
              }}
              nextButton={<Box />}
              backButton={<Box />}
            />
          </Box>
        )}

        {/* Voice Parts Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ mt: 10 }}>
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
      </Container>
    </Box>
  );
};

export default MembersShowcase;
