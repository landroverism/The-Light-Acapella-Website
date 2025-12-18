import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { fadeInUp, staggerContainer, staggerContainerSlow } from '../utils/motion';
import { colors } from '../theme/theme';

const UpcomingEvents: React.FC = () => {
  const events = useQuery(api.events.list) || [];

  // Sample events for demonstration
  const sampleEvents = [
    {
      title: 'Sunday Morning Worship',
      date: '2024-03-17',
      time: '10:00 AM',
      location: 'Syokimau Central SDA Church',
      type: 'Church Service',
      status: 'confirmed',
      description: 'Join us for uplifting worship through a cappella ministry music.',
    },
    {
      title: 'Wedding Ceremony Performance',
      date: '2024-03-23',
      time: '2:00 PM',
      location: 'Nairobi Wedding Gardens',
      type: 'Private Event',
      status: 'confirmed',
      description: "Special performance for Sarah & Michael's wedding ceremony.",
    },
    {
      title: 'Youth Conference 2024',
      date: '2024-04-05',
      time: '7:00 PM',
      location: 'Adventist University of Africa',
      type: 'Conference',
      status: 'tentative',
      description: 'Inspiring young hearts through gospel a cappella music.',
    },
    {
      title: 'Corporate Dinner Event',
      date: '2024-04-12',
      time: '6:30 PM',
      location: 'Serena Hotel, Nairobi',
      type: 'Corporate Event',
      status: 'confirmed',
      description: 'Professional performance for annual company celebration.',
    },
  ];

  const displayEvents = events.length > 0 ? events : sampleEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'church service':
        return colors.eventTypes.church;
      case 'private event':
        return colors.eventTypes.private;
      case 'conference':
        return colors.eventTypes.conference;
      case 'corporate event':
        return colors.eventTypes.corporate;
      default:
        return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return colors.status.confirmed;
      case 'tentative':
        return colors.status.tentative;
      case 'past':
        return colors.status.past;
      default:
        return '#FFFFFF';
    }
  };

  // Filter upcoming events
  const upcomingEvents = displayEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .slice(0, 4);

  return (
    <Box
      id="events"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
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
              Upcoming{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Events
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
              Join us at our upcoming performances and experience the power of live a cappella
              worship. Each event is an opportunity to connect, worship, and be inspired.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Events Grid */}
        {upcomingEvents.length > 0 ? (
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <Grid container spacing={4}>
              {upcomingEvents.map((event, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        height: '100%',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: 4,
                          height: '100%',
                          backgroundColor: getEventTypeColor(event.type),
                          borderRadius: '16px 0 0 16px',
                        },
                      }}
                    >
                      <CardContent sx={{ pl: 4 }}>
                        {/* Header */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                            flexWrap: 'wrap',
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              flex: 1,
                              minWidth: 200,
                            }}
                          >
                            {event.title}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={event.type}
                              size="small"
                              sx={{
                                backgroundColor: `${getEventTypeColor(event.type)}20`,
                                color: getEventTypeColor(event.type),
                                fontWeight: 500,
                              }}
                            />
                            <Chip
                              label={event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              size="small"
                              sx={{
                                backgroundColor: `${getStatusColor(event.status)}20`,
                                color: getStatusColor(event.status),
                                fontWeight: 500,
                              }}
                            />
                          </Stack>
                        </Box>

                        {/* Event Details */}
                        <Stack spacing={1.5} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <CalendarIcon
                              sx={{ fontSize: 20, color: 'primary.main' }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(event.date)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <TimeIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                            <Typography variant="body2" color="text.secondary">
                              {event.time}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <LocationIcon
                              sx={{ fontSize: 20, color: 'primary.main' }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {event.location}
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Description */}
                        {event.description && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              mb: 2,
                              lineHeight: 1.7,
                            }}
                          >
                            {event.description}
                          </Typography>
                        )}

                        {/* Action Button */}
                        {event.type.toLowerCase() !== 'private event' && (
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: 'primary.main',
                              color: 'primary.main',
                              '&:hover': {
                                borderColor: 'primary.main',
                                backgroundColor: 'rgba(255, 215, 0, 0.08)',
                              },
                            }}
                          >
                            Learn More
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h1" sx={{ fontSize: '4rem', mb: 3 }}>
                🎵
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                No Upcoming Events
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                }}
              >
                We're currently planning our next performances. Stay tuned for updates!
              </Typography>
              <Button
                variant="outlined"
                startIcon={<InstagramIcon />}
                href="https://instagram.com/thelightacapella"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow for Updates
              </Button>
            </Box>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
              Want us to perform at your event?
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Book Us Now
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default UpcomingEvents;
