import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useScrollTrigger,
  Container,
  Typography,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Home as HomeIcon,
  MusicNote as MusicNoteIcon,
  Event as EventIcon,
  RoomService as ServiceIcon,
  People as PeopleIcon,
  BookOnline as BookIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../theme/theme';

interface HeaderProps {
  onOpenModal: (modal: string) => void;
}

const navItems = [
  { label: 'Home', id: 'home', icon: <HomeIcon /> },
  { label: 'Songs', id: 'gallery', icon: <MusicNoteIcon /> },
  { label: 'Events', id: 'events', icon: <EventIcon /> },
  { label: 'Services', id: 'services', icon: <ServiceIcon /> },
  { label: 'Members', id: 'members', icon: <PeopleIcon /> },
  { label: 'Book Us', id: 'quotation', icon: <BookIcon />, isModal: true },
];

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isModal) {
      onOpenModal(item.id);
      setMobileOpen(false);
    } else {
      scrollToSection(item.id);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile drawer content
  const drawer = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src="/images/light-logo-rg.png"
            alt="The Light Acapella"
            sx={{ height: 40 }}
          />
          <Typography
            sx={{
              fontFamily: '"Dancing Script", cursive',
              color: 'primary.main',
              fontSize: '1.1rem',
              transform: 'rotate(-3deg)',
            }}
          >
            The Light Acapella
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, py: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item)}
              sx={{
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Donate Button */}
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<FavoriteIcon />}
          onClick={() => {
            onOpenModal('donation');
            setMobileOpen(false);
          }}
          sx={{
            py: 1.5,
            fontSize: '1rem',
          }}
        >
          Support Our Ministry
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          backdropFilter: trigger ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease-in-out',
          borderBottom: trigger ? 1 : 0,
          borderColor: 'rgba(255, 215, 0, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 72 },
              px: { xs: 0, md: 2 },
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1, md: 2 },
                  cursor: 'pointer',
                }}
                onClick={() => scrollToSection('home')}
              >
                <Box
                  component="img"
                  src="/images/light-logo-rg.png"
                  alt="The Light Acapella"
                  sx={{
                    height: { xs: 44, md: trigger ? 48 : 56 },
                    transition: 'height 0.3s ease',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Dancing Script", cursive',
                    color: 'primary.main',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: trigger ? '1.2rem' : '1.4rem' },
                    transform: 'rotate(-3deg)',
                    transition: 'font-size 0.3s ease',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  The Light Acapella
                </Typography>
              </Box>
            </motion.div>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Button
                    onClick={() => handleNavClick(item)}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      position: 'relative',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        width: 0,
                        height: 2,
                        backgroundColor: 'primary.main',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-50%)',
                        borderRadius: 1,
                      },
                      '&:hover::after': {
                        width: '60%',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Desktop Donate Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Button
                  variant="contained"
                  startIcon={<FavoriteIcon />}
                  onClick={() => onOpenModal('donation')}
                  sx={{
                    px: 3,
                    backgroundColor: '#00A859', // M-Pesa green
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#008A4A', // Darker green on hover
                    },
                  }}
                >
                  Donate
                </Button>
              </Box>
            </motion.div>

            {/* Mobile Menu Button */}
            <IconButton
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { md: 'none' },
                color: 'text.primary',
                p: 1.5,
              }}
            >
              <Box
                component="img"
                src="/images/menu.png"
                alt="Menu"
                sx={{
                  width: { xs: 32, sm: 28 },
                  height: { xs: 32, sm: 28 },
                  objectFit: 'contain',
                }}
              />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 300,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
    </>
  );
};

export default Header;
