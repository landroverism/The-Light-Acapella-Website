import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

interface ServicesOfferedProps {
  onOpenModal: (modal: string) => void;
}

const services = [
  {
    id: 'wedding',
    title: 'Wedding Performances',
    description:
      'Transform your most sacred moment into an unforgettable experience. Our voices become part of your story, creating memories that echo through generations.',
    image: '/images/trio-1.png',
    featured: true,
  },
  {
    id: 'church',
    title: 'Church Services',
    description:
      'Elevate worship through the pure power of human voice. We minister through song, touching hearts and drawing souls closer to the divine.',
    image: '/images/church.jpg',
    featured: false,
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description:
      'Bring elegance and inspiration to your gatherings. Professional performances that honor your occasion with grace and excellence.',
    image: '/images/trio-2.png',
    featured: false,
  },
  {
    id: 'intimate',
    title: 'Intimate Gatherings',
    description:
      'For those moments that matter most. Anniversary dinners, proposals, celebrations where every note carries meaning.',
    image: '/images/initimate.jpg',
    featured: false,
  },
  {
    id: 'outdoor',
    title: 'Outdoor Celebrations',
    description:
      'Where voices meet the open sky. Community events, festivals, and gatherings where music becomes a shared experience.',
    image: '/images/outdoor.jpg',
    featured: false,
  },
];

// Service Card Component
const ServiceCard: React.FC<{
  service: typeof services[0];
  index: number;
  isMobile: boolean;
}> = ({ service, index, isMobile }) => {
  const isFeatured = service.featured && !isMobile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: isFeatured
            ? { md: 600, lg: 700 }
            : isMobile
            ? 400
            : { md: 450, lg: 500 },
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${service.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'background.paper',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)',
            },
          }}
        />

        {/* Content Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 4, md: isFeatured ? 6 : 4 },
            zIndex: 1,
          }}
        >
          <Typography
            variant={isFeatured ? 'h3' : 'h4'}
            sx={{
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              fontSize: {
                xs: '2rem',
                md: isFeatured ? '3rem' : '2.25rem',
              },
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.2)',
              transform: 'rotate(-0.5deg)',
              letterSpacing: '0.02em',
            }}
          >
            {service.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: isFeatured ? '1.2rem' : '1.05rem' },
              maxWidth: { xs: '100%', md: isFeatured ? '80%' : '100%' },
              textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            {service.description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const ServicesOffered: React.FC<ServicesOfferedProps> = ({ onOpenModal }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const weddingService = services.find((s) => s.id === 'wedding')!;
  const otherServices = services.filter((s) => s.id !== 'wedding');

  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: { xs: 8, md: 16 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h1"
              align="center"
              sx={{
                mb: 3,
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 300,
                letterSpacing: '-0.02em',
              }}
            >
              How We{' '}
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  fontFamily: '"Dancing Script", cursive',
                  fontWeight: 700,
                }}
              >
                Serve
              </Box>
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: 'text.secondary',
                maxWidth: 700,
                mx: 'auto',
                mb: { xs: 6, md: 10 },
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Every performance is a prayer, every song a ministry. We bring the gift of a cappella
              music to moments that matter.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Mobile View - Vertical Stack */}
        {isMobile && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isMobile={true}
              />
            ))}
          </Box>
        )}

        {/* Desktop/Tablet View - Asymmetric Layout */}
        {!isMobile && (
          <Box>
            {/* Featured Wedding Service */}
            <Box sx={{ mb: 4 }}>
              <ServiceCard
                service={weddingService}
                index={0}
                isMobile={false}
              />
            </Box>

            {/* Secondary Services - Asymmetric Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 4,
                gridAutoRows: 'minmax(450px, auto)',
              }}
            >
              {/* First row - 2 services on tablet, 3 on desktop */}
              {otherServices.slice(0, 2).map((service, index) => (
                <Box
                  key={service.id}
                  sx={{
                    gridColumn: isTablet && index === 1 ? 'span 1' : undefined,
                  }}
                >
                  <ServiceCard
                    service={service}
                    index={index + 1}
                    isMobile={false}
                  />
                </Box>
              ))}

              {/* Second row - remaining services with varied sizing */}
              {otherServices.slice(2).map((service, index) => (
                <Box
                  key={service.id}
                  sx={{
                    gridColumn: {
                      md: index === 0 ? 'span 2' : 'span 1',
                      lg: 'span 1',
                    },
                  }}
                >
                  <ServiceCard
                    service={service}
                    index={index + 3}
                    isMobile={false}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mt: { xs: 8, md: 12 },
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.15rem' },
                fontWeight: 300,
                fontStyle: 'italic',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Every event is unique. Every performance is crafted with intention. Let us create
              something beautiful for your occasion.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => onOpenModal('quotation')}
              sx={{
                px: { xs: 5, md: 7 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(255, 215, 0, 0.25)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(255, 215, 0, 0.35)',
                },
              }}
            >
              Request a Quote
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesOffered;
