import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

interface QuotationRequestProps {
  onClose: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const eventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'church', label: 'Church Service' },
  { value: 'private', label: 'Private Party' },
  { value: 'outdoor', label: 'Outdoor Event' },
  { value: 'other', label: 'Other' },
];

const durationOptions = [
  { value: '15-30 minutes', label: '15-30 minutes' },
  { value: '30-45 minutes', label: '30-45 minutes' },
  { value: '45-60 minutes', label: '45-60 minutes' },
  { value: '60+ minutes', label: '60+ minutes' },
  { value: 'flexible', label: 'Flexible' },
];

// Validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

const QuotationRequest: React.FC<QuotationRequestProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    location: '',
    guestCount: '',
    duration: '',
    amplificationNeeded: false,
    specificSongs: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createQuotation = useMutation(api.quotations.create);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Event location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      await createQuotation(formData);
      toast.success(
        "Quotation request submitted successfully! We'll contact you within 24 hours."
      );
      onClose();
    } catch (error) {
      console.error('Failed to submit quotation:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {/* Personal Information */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        {/* Event Details */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              select
              label="Event Type"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              required
              error={!!errors.eventType}
              helperText={errors.eventType}
            >
              <MenuItem value="">Select event type</MenuItem>
              {eventTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Event Date"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleInputChange}
              required
              error={!!errors.eventDate}
              helperText={errors.eventDate}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Event Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Venue name and address"
          required
          error={!!errors.location}
          helperText={errors.location}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Expected Guest Count"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleInputChange}
              placeholder="e.g., 50-100 guests"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              select
              label="Performance Duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
            >
              <MenuItem value="">Select duration</MenuItem>
              {durationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Amplification */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.amplificationNeeded}
              onChange={handleInputChange}
              name="amplificationNeeded"
              sx={{
                color: 'text.secondary',
                '&.Mui-checked': {
                  color: 'primary.main',
                },
              }}
            />
          }
          label="Amplification/Sound System Needed"
          sx={{ color: 'text.primary' }}
        />

        {/* Additional Requests */}
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Specific Song Requests"
          name="specificSongs"
          value={formData.specificSongs}
          onChange={handleInputChange}
          placeholder="Any specific songs you'd like us to perform?"
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Special Requests or Notes"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          placeholder="Any additional information about your event..."
        />

        {/* Actions */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ flex: 1 }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: 'primary.contrastText' }} />
            ) : (
              'Submit Request'
            )}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={onClose}
            sx={{
              px: 4,
              borderColor: 'text.secondary',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'text.primary',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
        </Stack>

        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary', mt: 1 }}
        >
          We'll review your request and contact you within 24 hours with a
          personalized quote.
        </Typography>
      </Stack>
    </Box>
  );
};

export default QuotationRequest;
