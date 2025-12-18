import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

interface QuotationRequestProps {
  onClose: () => void;
}

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
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const createQuotation = useMutation(api.quotations.create);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createQuotation(formData);
      toast.success('Quotation request submitted successfully! We\'ll contact you within 24 hours.');
      onClose();
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-white">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input-field"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Event Type *</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Event</option>
            <option value="church">Church Service</option>
            <option value="private">Private Party</option>
            <option value="outdoor">Outdoor Event</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Event Date *</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-white">Event Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="input-field"
          placeholder="Venue name and address"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Expected Guest Count</label>
          <input
            type="text"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleInputChange}
            className="input-field"
            placeholder="e.g., 50-100 guests"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Performance Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">Select duration</option>
            <option value="15-30 minutes">15-30 minutes</option>
            <option value="30-45 minutes">30-45 minutes</option>
            <option value="45-60 minutes">45-60 minutes</option>
            <option value="60+ minutes">60+ minutes</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="amplificationNeeded"
            checked={formData.amplificationNeeded}
            onChange={handleInputChange}
            className="w-4 h-4 text-gold bg-gray-700 border-gray-600 rounded focus:ring-gold"
          />
          <span className="text-white">Amplification/Sound System Needed</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-white">Specific Song Requests</label>
        <textarea
          name="specificSongs"
          value={formData.specificSongs}
          onChange={handleInputChange}
          className="input-field"
          rows={3}
          placeholder="Any specific songs you'd like us to perform?"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-white">Special Requests or Notes</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          className="input-field"
          rows={3}
          placeholder="Any additional information about your event..."
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex-1"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary px-6"
        >
          Cancel
        </button>
      </div>

      <p className="text-sm text-gray-400 text-center">
        We'll review your request and contact you within 24 hours with a personalized quote.
      </p>
    </form>
  );
};

export default QuotationRequest;
