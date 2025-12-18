import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  Circle as CircleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';
import { fadeInUp, staggerContainer } from '../utils/motion';

interface DonationSectionProps {
  onClose?: () => void;
}

const presetAmounts = [500, 1000, 2000, 5000];

const donationBenefits = [
  'Equipment and sound system maintenance',
  'Travel expenses for ministry events',
  'Recording and production of new music',
  'Community outreach programs',
];

const DonationSection: React.FC<DonationSectionProps> = ({ onClose }) => {
  const [amount, setAmount] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createDonation = useMutation(api.donations.create);

  const handlePresetChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => {
    setSelectedPreset(newValue);
    if (newValue !== null) {
      setAmount(newValue.toString());
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !phoneNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await createDonation({
        amount: parseFloat(amount),
        phoneNumber: phoneNumber,
      });
      toast.success('Donation request submitted! You will receive an M-Pesa prompt shortly.');
      if (onClose) onClose();
    } catch (error) {
      toast.error('Failed to process donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          backgroundColor: onClose ? 'transparent' : 'background.paper',
          borderRadius: 4,
        }}
      >
        {/* Amount Selection */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Select Amount (KES)
          </Typography>
          <ToggleButtonGroup
            value={selectedPreset}
            exclusive
            onChange={handlePresetChange}
            fullWidth
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1.5,
              mb: 2,
              '& .MuiToggleButton-root': {
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'divider',
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  borderColor: 'primary.main',
                },
              },
            }}
          >
            {presetAmounts.map((preset) => (
              <ToggleButton key={preset} value={preset}>
                <Typography variant="subtitle1" fontWeight={600}>
                  KES {preset.toLocaleString()}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <TextField
            fullWidth
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter custom amount"
            inputProps={{ min: 1 }}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Phone Number */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
            }}
          >
            M-Pesa Phone Number *
          </Typography>
          <TextField
            fullWidth
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="254XXXXXXXXX"
            required
            helperText="Enter your M-Pesa registered phone number"
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting || !amount || !phoneNumber}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            mb: 3,
            backgroundColor: '#00A859', // M-Pesa green
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#008A4A', // Darker green on hover
            },
            '&:disabled': {
              backgroundColor: '#00A859',
              opacity: 0.6,
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
          ) : (
            `Mpesa Xpress KES ${amount ? parseInt(amount).toLocaleString() : '0'}`
          )}
        </Button>

        {/* M-Pesa Security Text */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            mb: 3,
            fontStyle: 'italic',
          }}
        >
          Click to pay securely via M-Pesa STK Push
        </Typography>

        {/* Benefits List */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: 'rgba(255, 215, 0, 0.05)',
            borderRadius: 3,
            border: 1,
            borderColor: 'rgba(255, 215, 0, 0.1)',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              mb: 2,
            }}
          >
            How Your Donation Helps:
          </Typography>
          <List dense disablePadding>
            {donationBenefits.map((benefit, index) => (
              <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <CircleIcon
                    sx={{
                      fontSize: 8,
                      color: 'primary.main',
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={benefit}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Close Button (Modal only) */}
        {onClose && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              Close
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );

  // If used as modal content
  if (onClose) {
    return content;
  }

  // If used as standalone section
  return (
    <Box
      id="donate"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
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
              Support Our{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Ministry
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
              Your generous donations help us continue touching and changing lives through music.
              Every contribution supports our ministry and enables us to reach more hearts.
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>{content}</motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DonationSection;
