import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Church as ChurchIcon,
  Celebration as CelebrationIcon,
  MusicNote as MusicIcon,
  Stadium as StadiumIcon,
  Restaurant as DinnerIcon,
  FlashOn as FlashIcon,
  Circle as CircleIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerContainerSlow } from '../utils/motion';

interface ServicesOfferedProps {
  onOpenModal: (modal: string) => void;
}

const services = [
  {
    title: 'Wedding Surprise Performances',
    duration: '15-60 minutes',
    description:
      'Create unforgettable moments with surprise a cappella performances during your wedding ceremony or reception.',
    idealFor: ['Wedding Ceremonies', 'Reception Entrances', 'First Dance Accompaniment'],
    icon: CelebrationIcon,
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  },
  {
    title: 'Corporate & Private Events',
    duration: '30-90 minutes',
    description:
      'Professional performances for corporate gatherings, private celebrations, and special occasions.',
    idealFor: ['Corporate Dinners', 'Anniversary Celebrations', 'Private Parties'],
    icon: MusicIcon,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Church & Religious Services',
    duration: '20-45 minutes',
    description:
      'Uplifting worship experiences through a cappella ministry music for church services and religious gatherings.',
    idealFor: ['Sunday Services', 'Revival Meetings', 'Prayer Conferences'],
    icon: ChurchIcon,
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    title: 'Outdoor & Sports Events',
    duration: '10-30 minutes',
    description:
      'Dynamic performances for outdoor events, sports gatherings, and community celebrations without amplification needs.',
    idealFor: ['Sports Events', 'Community Gatherings', 'Outdoor Festivals'],
    icon: StadiumIcon,
    gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
  },
  {
    title: 'Intimate Dinner Performances',
    duration: '45-75 minutes',
    description:
      'Elegant background and featured performances for intimate dining experiences and special occasions.',
    idealFor: ['Anniversary Dinners', 'Proposal Events', 'VIP Gatherings'],
    icon: DinnerIcon,
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
  },
  {
    title: 'Flash Mob Performances',
    duration: '5-15 minutes',
    description:
      'Surprise flash mob performances that create viral moments and unforgettable experiences for your guests.',
    idealFor: ['Public Proposals', 'Birthday Surprises', 'Marketing Events'],
    icon: FlashIcon,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
];

const ServicesOffered: React.FC<ServicesOfferedProps> = ({ onOpenModal }) => {
  return (
    <Box
      id="services"
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
              Our{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Services
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
              From intimate gatherings to grand celebrations, we bring the power of a cappella music
              to touch hearts and create lasting memories at your special events.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Grid container spacing={4}>
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <motion.div variants={fadeInUp}>
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
                            width: 60,
                            height: 60,
                            borderRadius: 3,
                            background: service.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                          }}
                        >
                          <IconComponent sx={{ fontSize: 32, color: 'white' }} />
                        </Box>

                        {/* Title */}
                        <Typography
                          variant="h5"
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
                          label={`Duration: ${service.duration}`}
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
                            mb: 3,
                            lineHeight: 1.7,
                          }}
                        >
                          {service.description}
                        </Typography>

                        {/* Ideal For List */}
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'text.primary',
                            mb: 1,
                            fontWeight: 600,
                          }}
                        >
                          Perfect for:
                        </Typography>
                        <List dense disablePadding>
                          {service.idealFor.map((item, idx) => (
                            <ListItem key={idx} disablePadding sx={{ py: 0.25 }}>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                <CircleIcon
                                  sx={{
                                    fontSize: 8,
                                    color: 'primary.main',
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={item}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  color: 'text.secondary',
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>

                      <CardActions sx={{ px: 3, pb: 3 }}>
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
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontWeight: 400,
              }}
            >
              Don't see your event type? We're flexible and love creating custom experiences.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => onOpenModal('quotation')}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
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
