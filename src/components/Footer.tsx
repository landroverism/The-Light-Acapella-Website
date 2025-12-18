import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Link,
  Divider,
  Stack,
} from '@mui/material';
import {
  YouTube as YouTubeIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Music', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Members', href: '#members' },
  { label: 'Events', href: '#events' },
];

const socialLinks = [
  {
    icon: YouTubeIcon,
    href: 'https://www.youtube.com/@thelightacapella2965',
    label: 'YouTube',
    color: '#FF0000',
  },
  {
    icon: InstagramIcon,
    href: 'https://instagram.com/thelightacapella',
    label: 'Instagram',
    color: '#E1306C',
  },
  {
    icon: FacebookIcon,
    href: 'https://facebook.com/thelightacapella',
    label: 'Facebook',
    color: '#1877F2',
  },
];

const contactInfo = [
  {
    icon: PhoneIcon,
    text: '+254 700 000 000',
    href: 'tel:+254700000000',
  },
  {
    icon: EmailIcon,
    text: 'info@thelightacapella.com',
    href: 'mailto:info@thelightacapella.com',
  },
  {
    icon: LocationIcon,
    text: 'Syokimau Central SDA Church, Nairobi, Kenya',
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* About Section */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  component="img"
                  src="/images/light-logo-rg.png"
                  alt="The Light Acapella"
                  sx={{ height: 48 }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Dancing Script", cursive',
                    color: 'primary.main',
                    fontSize: '1.5rem',
                    transform: 'rotate(-3deg)',
                  }}
                >
                  The Light Acapella
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  lineHeight: 1.8,
                  maxWidth: 400,
                }}
              >
                A gospel a cappella group from Syokimau Central SDA Church, dedicated to touching
                and changing lives through the power of music and worship.
              </Typography>

              {/* Social Links */}
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <IconButton
                      key={social.label}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        color: 'text.secondary',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: social.color,
                          backgroundColor: `${social.color}15`,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <IconComponent />
                    </IconButton>
                  );
                })}
              </Stack>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(4px)',
                      },
                      '&::before': {
                        content: '"→"',
                        marginRight: 1,
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                Contact Us
              </Typography>
              <Stack spacing={2}>
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  const content = (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 20,
                          color: 'primary.main',
                          mt: 0.3,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  );

                  if (item.href) {
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        underline="none"
                        sx={{
                          '&:hover': {
                            '& .MuiTypography-root': {
                              color: 'primary.main',
                            },
                          },
                        }}
                      >
                        {content}
                      </Link>
                    );
                  }
                  return <Box key={index}>{content}</Box>;
                })}
              </Stack>
            </motion.div>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Divider sx={{ mt: 6, mb: 4 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            © {currentYear} The Light Acapella. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              fontStyle: 'italic',
              textAlign: { xs: 'center', sm: 'right' },
            }}
          >
            Touching and Changing Lives Through Music
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
