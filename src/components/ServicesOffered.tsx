import React from 'react';

interface ServicesOfferedProps {
  onOpenModal: (modal: string) => void;
}

const ServicesOffered: React.FC<ServicesOfferedProps> = ({ onOpenModal }) => {
  const services = [
    {
      title: "Wedding Surprise Performances",
      duration: "15-60 minutes",
      description: "Create unforgettable moments with surprise a cappella performances during your wedding ceremony or reception.",
      idealFor: ["Wedding Ceremonies", "Reception Entrances", "First Dance Accompaniment"],
      icon: "💒"
    },
    {
      title: "Corporate & Private Events",
      duration: "30-90 minutes",
      description: "Professional performances for corporate gatherings, private celebrations, and special occasions.",
      idealFor: ["Corporate Dinners", "Anniversary Celebrations", "Private Parties"],
      icon: "🎵"
    },
    {
      title: "Church & Religious Services",
      duration: "20-45 minutes",
      description: "Uplifting worship experiences through a cappella ministry music for church services and religious gatherings.",
      idealFor: ["Sunday Services", "Revival Meetings", "Prayer Conferences"],
      icon: "⛪"
    },
    {
      title: "Outdoor & Sports Events",
      duration: "10-30 minutes",
      description: "Dynamic performances for outdoor events, sports gatherings, and community celebrations without amplification needs.",
      idealFor: ["Sports Events", "Community Gatherings", "Outdoor Festivals"],
      icon: "🏟️"
    },
    {
      title: "Intimate Dinner Performances",
      duration: "45-75 minutes",
      description: "Elegant background and featured performances for intimate dining experiences and special occasions.",
      idealFor: ["Anniversary Dinners", "Proposal Events", "VIP Gatherings"],
      icon: "🍽️"
    },
    {
      title: "Flash Mob Performances",
      duration: "5-15 minutes",
      description: "Surprise flash mob performances that create viral moments and unforgettable experiences for your guests.",
      idealFor: ["Public Proposals", "Birthday Surprises", "Marketing Events"],
      icon: "⚡"
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we bring the power of a cappella music 
            to touch hearts and create lasting memories at your special events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card fade-in">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gold">{service.title}</h3>
              <p className="text-sm text-gray-400 mb-3">Duration: {service.duration}</p>
              <p className="text-gray-300 mb-4">{service.description}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-white">Perfect for:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {service.idealFor.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => onOpenModal('quotation')}
                className="text-gold hover:text-yellow-400 font-semibold transition-colors"
              >
                Request Quote →
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-8">
            Don't see your event type? We're flexible and love creating custom experiences.
          </p>
          <button 
            onClick={() => onOpenModal('quotation')}
            className="btn-primary text-lg px-8 py-4"
          >
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOffered;
