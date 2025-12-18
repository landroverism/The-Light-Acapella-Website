import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const MembersShowcase: React.FC = () => {
  const members = useQuery(api.members.list) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample member data for demonstration
  const sampleMembers = [
    {
      name: "David Mwangi",
      voicePart: "Lead",
      imageUrl: "/images/member-1.jpg",
      yearsWithGroup: 5,
      testimony: "Music has been my way of connecting with God and sharing His love with others."
    },
    {
      name: "Samuel Kiprotich",
      voicePart: "Tenor",
      imageUrl: "/images/member-2.jpg",
      yearsWithGroup: 4,
      testimony: "Through a cappella, I've learned that harmony in music reflects harmony in life."
    },
    {
      name: "Peter Ochieng",
      voicePart: "Baritone",
      imageUrl: "/images/member-3.jpg",
      yearsWithGroup: 6,
      testimony: "Every performance is an opportunity to minister and touch someone's heart."
    },
    {
      name: "John Mutua",
      voicePart: "Bass",
      imageUrl: "/images/member-4.jpg",
      yearsWithGroup: 3,
      testimony: "The foundation of our music comes from the foundation of our faith."
    }
  ];

  const displayMembers = members.length > 0 ? members : sampleMembers;

  const voicePartColors = {
    'Lead': 'text-gold',
    'Tenor': 'text-blue-400',
    'Baritone': 'text-green-400',
    'Bass': 'text-red-400'
  };

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % displayMembers.length);
  };

  const prevMember = () => {
    setCurrentIndex((prev) => (prev - 1 + displayMembers.length) % displayMembers.length);
  };

  return (
    <section id="members" className="section-padding bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="text-gold">Members</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each voice brings a unique gift to our ministry, creating the harmony 
            that defines The Light Acapella's sound and spirit.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayMembers.map((member, index) => (
            <div key={index} className="card text-center fade-in">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-700">
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.currentTarget.style.display = 'none';
                    const initials = member.name.split(' ').map(n => n[0]).join('');
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gold flex items-center justify-center text-black text-2xl font-bold">
                        ${initials}
                      </div>
                    `;
                  }}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
              <p className={`text-lg font-semibold mb-2 ${voicePartColors[member.voicePart as keyof typeof voicePartColors] || 'text-gold'}`}>
                {member.voicePart}
              </p>
              <p className="text-sm text-gray-400 mb-3">
                {member.yearsWithGroup} years with the group
              </p>
              {member.testimony && (
                <p className="text-sm text-gray-300 italic">
                  "{member.testimony}"
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative">
            <div className="card text-center max-w-sm mx-auto">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden bg-gray-700">
                <img 
                  src={displayMembers[currentIndex].imageUrl} 
                  alt={displayMembers[currentIndex].name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const initials = displayMembers[currentIndex].name.split(' ').map(n => n[0]).join('');
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gold flex items-center justify-center text-black text-3xl font-bold">
                        ${initials}
                      </div>
                    `;
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {displayMembers[currentIndex].name}
              </h3>
              <p className={`text-xl font-semibold mb-3 ${voicePartColors[displayMembers[currentIndex].voicePart as keyof typeof voicePartColors] || 'text-gold'}`}>
                {displayMembers[currentIndex].voicePart}
              </p>
              <p className="text-gray-400 mb-4">
                {displayMembers[currentIndex].yearsWithGroup} years with the group
              </p>
              {displayMembers[currentIndex].testimony && (
                <p className="text-gray-300 italic">
                  "{displayMembers[currentIndex].testimony}"
                </p>
              )}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevMember}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gold text-black p-3 rounded-full hover:bg-yellow-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextMember}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gold text-black p-3 rounded-full hover:bg-yellow-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {displayMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gold' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Voice Parts Legend */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 text-white">Voice Parts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mb-2"></div>
              <p className="font-semibold text-gold">Lead</p>
              <p className="text-sm text-gray-400">Melody & Harmony Lead</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-blue-400 rounded-full mx-auto mb-2"></div>
              <p className="font-semibold text-blue-400">Tenor</p>
              <p className="text-sm text-gray-400">High Harmony</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-2"></div>
              <p className="font-semibold text-green-400">Baritone</p>
              <p className="text-sm text-gray-400">Mid-Range Harmony</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-red-400 rounded-full mx-auto mb-2"></div>
              <p className="font-semibold text-red-400">Bass</p>
              <p className="text-sm text-gray-400">Foundation & Rhythm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersShowcase;
