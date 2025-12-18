import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const UpcomingEvents: React.FC = () => {
  const events = useQuery(api.events.list) || [];

  // Sample events for demonstration
  const sampleEvents = [
    {
      title: "Sunday Morning Worship",
      date: "2024-03-17",
      time: "10:00 AM",
      location: "Syokimau Central SDA Church",
      type: "Church Service",
      status: "confirmed",
      description: "Join us for uplifting worship through a cappella ministry music."
    },
    {
      title: "Wedding Ceremony Performance",
      date: "2024-03-23",
      time: "2:00 PM",
      location: "Nairobi Wedding Gardens",
      type: "Private Event",
      status: "confirmed",
      description: "Special performance for Sarah & Michael's wedding ceremony."
    },
    {
      title: "Youth Conference 2024",
      date: "2024-04-05",
      time: "7:00 PM",
      location: "Adventist University of Africa",
      type: "Conference",
      status: "tentative",
      description: "Inspiring young hearts through gospel a cappella music."
    },
    {
      title: "Corporate Dinner Event",
      date: "2024-04-12",
      time: "6:30 PM",
      location: "Serena Hotel, Nairobi",
      type: "Corporate Event",
      status: "confirmed",
      description: "Professional performance for annual company celebration."
    }
  ];

  const displayEvents = events.length > 0 ? events : sampleEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'church service':
        return 'bg-blue-600';
      case 'private event':
        return 'bg-purple-600';
      case 'conference':
        return 'bg-green-600';
      case 'corporate event':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-400';
      case 'tentative':
        return 'text-yellow-400';
      case 'past':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  // Filter upcoming events (future dates)
  const upcomingEvents = displayEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }).slice(0, 4); // Show only next 4 events

  return (
    <section id="events" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Upcoming <span className="text-gold">Events</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us at our upcoming performances and experience the power of live a cappella worship. 
            Each event is an opportunity to connect, worship, and be inspired.
          </p>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="card fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                    <div className="flex items-center mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className={`ml-3 text-sm font-semibold ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 mr-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 mr-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 mr-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                )}

                {event.type.toLowerCase() !== 'private event' && (
                  <div className="flex space-x-3">
                    <button className="btn-secondary text-sm px-4 py-2">
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎵</div>
            <h3 className="text-2xl font-bold mb-4 text-white">No Upcoming Events</h3>
            <p className="text-gray-400 mb-8">
              We're currently planning our next performances. Stay tuned for updates!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://instagram.com/thelightacapella" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Follow for Updates
              </a>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-6">
            Want us to perform at your event?
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Book Us Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
