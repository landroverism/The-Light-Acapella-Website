import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Toaster } from 'sonner';
import theme from './theme/theme';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesOffered from './components/ServicesOffered';
import Gallery from './components/Gallery';
import MembersShowcase from './components/MembersShowcase';
import UpcomingEvents from './components/UpcomingEvents';
import BookingCTA from './components/BookingCTA';
import DonationSection from './components/DonationSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import QuotationRequest from './components/QuotationRequest';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Header onOpenModal={setActiveModal} />

        <Box component="main">
          <HeroSection
            onOpenModal={setActiveModal}
            currentlyPlaying={currentlyPlaying}
            setCurrentlyPlaying={setCurrentlyPlaying}
          />
          <ServicesOffered onOpenModal={setActiveModal} />
          <Gallery
            currentlyPlaying={currentlyPlaying}
            setCurrentlyPlaying={setCurrentlyPlaying}
          />
          <MembersShowcase />
          <UpcomingEvents />
          <BookingCTA onOpenModal={setActiveModal} />
          <DonationSection />
        </Box>

        <Footer />

        {/* Quotation Modal */}
        <Modal
          isOpen={activeModal === 'quotation'}
          onClose={() => setActiveModal(null)}
          title="Request a Quotation"
        >
          <QuotationRequest onClose={() => setActiveModal(null)} />
        </Modal>

        {/* Donation Modal */}
        <Modal
          isOpen={activeModal === 'donation'}
          onClose={() => setActiveModal(null)}
          title="Support Our Ministry"
        >
          <DonationSection onClose={() => setActiveModal(null)} />
        </Modal>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#252525',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 215, 0, 0.2)',
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
