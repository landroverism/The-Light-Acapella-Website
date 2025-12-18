import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

interface DonationSectionProps {
  onClose?: () => void;
}

const DonationSection: React.FC<DonationSectionProps> = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createDonation = useMutation(api.donations.create);

  const presetAmounts = [500, 1000, 2000, 5000];

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
        phoneNumber: phoneNumber
      });
      toast.success('Donation request submitted! You will receive an M-Pesa prompt shortly.');
      if (onClose) onClose();
    } catch (error) {
      toast.error('Failed to process donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={onClose ? '' : 'section-padding bg-gray-900'}>
      <div className={onClose ? '' : 'container mx-auto'}>
        {!onClose && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Support Our <span className="text-gold">Ministry</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your generous donations help us continue touching and changing lives through music. 
              Every contribution supports our ministry and enables us to reach more hearts.
            </p>
          </div>
        )}

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-white">
                Select Amount (KES)
              </label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      amount === preset.toString()
                        ? 'border-gold bg-gold text-black'
                        : 'border-gray-600 text-white hover:border-gold'
                    }`}
                  >
                    KES {preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter custom amount"
                className="input-field"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                M-Pesa Phone Number *
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="254XXXXXXXXX"
                className="input-field"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter your M-Pesa registered phone number
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Processing...' : `Donate KES ${amount || '0'}`}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-3 text-gold">How Your Donation Helps:</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                Equipment and sound system maintenance
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                Travel expenses for ministry events
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                Recording and production of new music
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                Community outreach programs
              </li>
            </ul>
          </div>

          {onClose && (
            <div className="mt-6 text-center">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationSection;
