import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  AttachMoney as MoneyIcon,
  MusicNote as MusicIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

interface BookingCTAProps {
  onOpenModal: (modal: string) => void;
}

const features = [
  {
    icon: PhoneIcon,
    title: 'Quick Response',
    description: 'We respond to all inquiries within 24 hours',
  },
  {
    icon: MoneyIcon,
    title: 'Fair Pricing',
    description: 'Competitive rates for professional quality',
  },
  {
    icon: MusicIcon,
    title: 'Custom Arrangements',
    description: 'Personalized song selections for your event',
  },
];

const BookingCTA: React.FC<BookingCTAProps> = ({ onOpenModal }) => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FFB300 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 50%, rgba(0,0,0,0.05) 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Main Heading */}
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: 'black',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
              }}
            >
              Ready to Book The Light Acapella?
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: 'rgba(0, 0, 0, 0.7)',
                maxWidth: 600,
                mx: 'auto',
                mb: 6,
                fontWeight: 400,
              }}
            >
              Let us create an unforgettable musical experience for your special event
            </Typography>
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeInUp}>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 28, color: 'black' }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'black',
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>

          {/* CTA Buttons */}
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
                onClick={() => onOpenModal('quotation')}
                sx={{
                  backgroundColor: 'black',
                  color: 'primary.main',
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  },
                  minWidth: { xs: '100%', sm: 'auto' },
                }}
              >
                Get Your Quote Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="tel:+254700000000"
                sx={{
                  borderColor: 'black',
                  borderWidth: 2,
                  color: 'black',
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: 'black',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  minWidth: { xs: '100%', sm: 'auto' },
                }}
              >
                Call Us Directly
              </Button>
            </Stack>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BookingCTA;
