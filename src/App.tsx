import React, { useState, useEffect } from "react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesOffered from "./components/ServicesOffered";
import Gallery from "./components/Gallery";
import MembersShowcase from "./components/MembersShowcase";
import UpcomingEvents from "./components/UpcomingEvents";
import QuotationRequest from "./components/QuotationRequest";
import DonationSection from "./components/DonationSection";
import BookingCTA from "./components/BookingCTA";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import "./styles/globals.css";

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onOpenModal={setActiveModal} />
      
      <main>
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
      </main>

      <Footer />

      <Modal
        isOpen={activeModal === 'quotation'}
        onClose={() => setActiveModal(null)}
        title="Request a Quotation"
      >
        <QuotationRequest onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal
        isOpen={activeModal === 'donation'}
        onClose={() => setActiveModal(null)}
        title="Support Our Ministry"
      >
        <DonationSection onClose={() => setActiveModal(null)} />
      </Modal>

      <Toaster />
    </div>
  );
}
