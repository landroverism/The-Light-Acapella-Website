import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Church as ChurchIcon,
  Celebration as CelebrationIcon,
  MusicNote as MusicIcon,
  Stadium as StadiumIcon,
  Restaurant as DinnerIcon,
  FlashOn as FlashIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

interface ServicesOfferedProps {
  onOpenModal: (modal: string) => void;
}

const services = [
  {
    title: 'Wedding Performances',
    shortTitle: 'Weddings',
    duration: '15-60 min',
    description:
      'Create unforgettable moments with surprise a cappella performances during your wedding ceremony or reception.',
    idealFor: ['Wedding Ceremonies', 'Reception Entrances', 'First Dance'],
    icon: CelebrationIcon,
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  },
  {
    title: 'Corporate & Private',
    shortTitle: 'Corporate',
    duration: '30-90 min',
    description:
      'Professional performances for corporate gatherings, private celebrations, and special occasions.',
    idealFor: ['Corporate Dinners', 'Anniversaries', 'Private Parties'],
    icon: MusicIcon,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Church Services',
    shortTitle: 'Church',
    duration: '20-45 min',
    description:
      'Uplifting worship experiences through a cappella ministry music for church services.',
    idealFor: ['Sunday Services', 'Revival Meetings', 'Conferences'],
    icon: ChurchIcon,
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    title: 'Outdoor Events',
    shortTitle: 'Outdoor',
    duration: '10-30 min',
    description:
      'Dynamic performances for outdoor events and community celebrations.',
    idealFor: ['Sports Events', 'Community Gatherings', 'Festivals'],
    icon: StadiumIcon,
    gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
  },
  {
    title: 'Dinner Performances',
    shortTitle: 'Dinners',
    duration: '45-75 min',
    description:
      'Elegant performances for intimate dining experiences and special occasions.',
    idealFor: ['Anniversary Dinners', 'Proposals', 'VIP Gatherings'],
    icon: DinnerIcon,
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
  },
  {
    title: 'Flash Mob',
    shortTitle: 'Flash Mob',
    duration: '5-15 min',
    description:
      'Surprise flash mob performances that create viral moments and unforgettable experiences.',
    idealFor: ['Public Proposals', 'Birthdays', 'Marketing Events'],
    icon: FlashIcon,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
];

// Mobile compact card component
const MobileServiceCard: React.FC<{
  service: typeof services[0];
  onOpenModal: (modal: string) => void;
}> = ({ service, onOpenModal }) => {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = service.icon;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          background: service.gradient,
          borderRadius: '16px 0 0 16px',
        },
      }}
    >
      <CardContent sx={{ py: 2, pl: 3 }}>
        {/* Header Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: service.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconComponent sx={{ fontSize: 22, color: 'white' }} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  lineHeight: 1.2,
                }}
              >
                {service.shortTitle}
              </Typography>
              <Chip
                label={service.duration}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  color: 'primary.main',
                }}
              />
            </Box>
          </Box>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
              color: 'primary.main',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        {/* Expandable Content */}
        <Collapse in={expanded}>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              {service.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {service.idealFor.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    height: 24,
                    borderColor: 'divider',
                    color: 'text.secondary',
                  }}
                />
              ))}
            </Box>
            <Button
              size="small"
              onClick={() => onOpenModal('quotation')}
              endIcon={<ArrowIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Get Quote
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

// Desktop card component
const DesktopServiceCard: React.FC<{
  service: typeof services[0];
  onOpenModal: (modal: string) => void;
}> = ({ service, onOpenModal }) => {
  const IconComponent = service.icon;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: service.gradient,
          borderRadius: '16px 16px 0 0',
        },
      }}
    >
      <CardContent sx={{ flex: 1, pt: 4 }}>
        {/* Icon */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            background: service.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <IconComponent sx={{ fontSize: 28, color: 'white' }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          {service.title}
        </Typography>

        {/* Duration Chip */}
        <Chip
          label={service.duration}
          size="small"
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            color: 'primary.main',
            fontWeight: 500,
          }}
        />

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          {service.description}
        </Typography>

        {/* Ideal For Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {service.idealFor.map((item, idx) => (
            <Chip
              key={idx}
              label={item}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '0.7rem',
                height: 24,
                borderColor: 'divider',
                color: 'text.secondary',
              }}
            />
          ))}
        </Box>
      </CardContent>

      <Box sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={() => onOpenModal('quotation')}
          endIcon={<ArrowIcon />}
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(255, 215, 0, 0.08)',
            },
          }}
        >
          Request Quote
        </Button>
      </Box>
    </Card>
  );
};

const ServicesOffered: React.FC<ServicesOfferedProps> = ({ onOpenModal }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: { xs: 6, md: 12 },
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
                mb: 1,
                fontSize: { xs: '1.75rem', md: '3rem' },
              }}
            >
              Our{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Services
              </Box>
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
                mb: { xs: 4, md: 8 },
                fontSize: { xs: '0.9rem', md: '1.1rem' },
              }}
            >
              From intimate gatherings to grand celebrations, we bring the power of a cappella music
              to your special events.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Services - Mobile View (Compact Expandable Cards) */}
        {isMobile && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MobileServiceCard service={service} onOpenModal={onOpenModal} />
              </motion.div>
            ))}
          </Box>
        )}

        {/* Services - Desktop View (Grid Cards) */}
        {!isMobile && (
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <DesktopServiceCard service={service} onOpenModal={onOpenModal} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mt: { xs: 5, md: 10 } }}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 3,
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Don't see your event type? We love creating custom experiences.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => onOpenModal('quotation')}
              sx={{
                px: { xs: 4, md: 5 },
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Get Custom Quote
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesOffered;
