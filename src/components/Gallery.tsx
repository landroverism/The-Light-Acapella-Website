import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';
import {
  MusicNote as MusicIcon,
  Mic as MicIcon,
  Favorite as FavoriteIcon,
  YouTube as YouTubeIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import AudioPlayer from './AudioPlayer';
import VideoEmbed from './VideoEmbed';
import { fadeInUp, staggerContainer, tabContentVariants } from '../utils/motion';

interface GalleryProps {
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <AnimatePresence mode="wait">
      {value === index && (
        <motion.div
          key={index}
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Box sx={{ pt: 4 }}>{children}</Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Gallery: React.FC<GalleryProps> = ({ currentlyPlaying, setCurrentlyPlaying }) => {
  const [activeTab, setActiveTab] = useState(0);
  const songs = useQuery(api.songs.list) || [];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Sample data for demonstration
  const musicSongs = [
    {
      id: 'song-1',
      title: 'When They Ring Those Golden Bells',
      duration: '4:32',
      audioUrl: '/audio/Acappella _When They Ring Those Golden Bells_ Rehearsal.mp3',
      description: 'Our signature arrangement of this beloved hymn',
    },
    {
      id: 'song-2',
      title: 'Ngoika Ka Nka',
      duration: '5:18',
      audioUrl: '/audio/ngoika.mp3',
      description: 'A powerful rendition of this classic worship song',
    },
    {
      id: 'song-3',
      title: 'The Rock',
      duration: '3:45',
      audioUrl: '/audio/The Rock.mp3',
      description: 'An uplifting arrangement filled with hope',
    },
  ];

  const livePerformances = [
    {
      id: 'live-1',
      title: 'Sunday Morning Worship - Syokimau Central SDA',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Live performance during Sunday morning service',
    },
    {
      id: 'live-2',
      title: 'Youth Conference 2023',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Special performance at the annual youth conference',
    },
    {
      id: 'live-3',
      title: 'Wedding Performance - Nairobi',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Surprise performance at a beautiful wedding ceremony',
    },
  ];

  const coverSongs = [
    {
      id: 'cover-1',
      title: 'Waymaker - Sinach',
      duration: '4:15',
      audioUrl: '/audio/waymaker.mp3',
      originalArtist: 'Sinach',
      description: 'Our a cappella arrangement of this contemporary gospel hit',
    },
    {
      id: 'cover-2',
      title: 'Goodness of God - Bethel Music',
      duration: '5:02',
      audioUrl: '/audio/goodness-of-god.mp3',
      originalArtist: 'Bethel Music',
      description: 'A heartfelt cover of this modern worship anthem',
    },
    {
      id: 'cover-3',
      title: 'What a Beautiful Name - Hillsong',
      duration: '4:28',
      audioUrl: '/audio/beautiful-name.mp3',
      originalArtist: 'Hillsong Worship',
      description: 'Our unique take on this powerful worship song',
    },
  ];

  return (
    <Box
      id="gallery"
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
              Our{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Music
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
                mb: 6,
                fontWeight: 400,
              }}
            >
              Experience the power of a cappella worship through our original songs, live
              performances, and gospel covers that touch hearts and change lives.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 2,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTab-root': {
                  minWidth: { xs: 'auto', sm: 160 },
                  px: { xs: 2, sm: 3 },
                },
              }}
            >
              <Tab
                icon={<MusicIcon />}
                iconPosition="start"
                label="Our Music"
                sx={{ gap: 1 }}
              />
              <Tab
                icon={<MicIcon />}
                iconPosition="start"
                label="Live Performances"
                sx={{ gap: 1 }}
              />
              <Tab
                icon={<FavoriteIcon />}
                iconPosition="start"
                label="Gospel Covers"
                sx={{ gap: 1 }}
              />
            </Tabs>
          </Box>
        </motion.div>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            {musicSongs.map((song) => (
              <Grid item xs={12} md={6} key={song.id}>
                <Card>
                  <CardContent>
                    <AudioPlayer
                      song={song}
                      currentlyPlaying={currentlyPlaying}
                      setCurrentlyPlaying={setCurrentlyPlaying}
                    />
                    {song.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mt: 2,
                          fontStyle: 'italic',
                        }}
                      >
                        {song.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            {livePerformances.map((video) => (
              <Grid item xs={12} md={6} key={video.id}>
                <Card>
                  <CardContent>
                    <VideoEmbed youtubeId={video.youtubeId} title={video.title} />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 2,
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {video.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mt: 1,
                      }}
                    >
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            {coverSongs.map((song) => (
              <Grid item xs={12} md={6} key={song.id}>
                <Card>
                  <CardContent>
                    <AudioPlayer
                      song={song}
                      currentlyPlaying={currentlyPlaying}
                      setCurrentlyPlaying={setCurrentlyPlaying}
                    />
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        Original by:{' '}
                        <Box
                          component="span"
                          sx={{ color: 'primary.main', fontWeight: 500 }}
                        >
                          {song.originalArtist}
                        </Box>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mt: 1,
                          fontStyle: 'italic',
                        }}
                      >
                        {song.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Social Links CTA */}
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
              Want to hear us live at your event?
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                startIcon={<YouTubeIcon />}
                href="https://www.youtube.com/@thelightacapella2965"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: 'error.main',
                  color: 'error.main',
                  '&:hover': {
                    borderColor: 'error.main',
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                  },
                }}
              >
                Visit Our YouTube Channel
              </Button>
              <Button
                variant="outlined"
                startIcon={<InstagramIcon />}
                href="https://instagram.com/thelightacapella"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: '#E1306C',
                  color: '#E1306C',
                  '&:hover': {
                    borderColor: '#E1306C',
                    backgroundColor: 'rgba(225, 48, 108, 0.08)',
                  },
                }}
              >
                Follow on Instagram
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Gallery;
