import React from 'react';

interface BookingCTAProps {
  onOpenModal: (modal: string) => void;
}

const BookingCTA: React.FC<BookingCTAProps> = ({ onOpenModal }) => {
  return (
    <section className="section-padding bg-gradient-to-r from-gold to-yellow-500">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Ready to Book The Light Acapella?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-black/80">
            Let us create an unforgettable musical experience for your special event
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">Quick Response</h3>
              <p className="text-black/70">We respond to all inquiries within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">Fair Pricing</h3>
              <p className="text-black/70">Competitive rates for professional quality</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">Custom Arrangements</h3>
              <p className="text-black/70">Personalized song selections for your event</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onOpenModal('quotation')}
              className="bg-black text-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors"
            >
              Get Your Quote Now
            </button>
            <a 
              href="tel:+254700000000" 
              className="bg-transparent border-2 border-black text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-black hover:text-gold transition-colors"
            >
              Call Us Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
