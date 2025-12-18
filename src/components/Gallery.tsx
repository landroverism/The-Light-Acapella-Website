import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import AudioPlayer from './AudioPlayer';
import VideoEmbed from './VideoEmbed';

interface GalleryProps {
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}

const Gallery: React.FC<GalleryProps> = ({ currentlyPlaying, setCurrentlyPlaying }) => {
  const [activeTab, setActiveTab] = useState('music');
  const songs = useQuery(api.songs.list) || [];

  const tabs = [
    { id: 'music', label: 'Our Music', icon: '🎵' },
    { id: 'live', label: 'Live Performances', icon: '🎤' },
    { id: 'covers', label: 'Gospel Covers', icon: '❤️' }
  ];

  // Sample data for demonstration
  const musicSongs = [
    {
      id: 'song-1',
      title: 'When They Ring Those Golden Bells',
      duration: '4:32',
      audioUrl: '/audio/Acappella _When They Ring Those Golden Bells_ Rehearsal.mp3',
      description: 'Our signature arrangement of this beloved hymn'
    },
    {
      id: 'song-2',
      title: 'Ngoika Ka Nka',
      duration: '5:18',
      audioUrl: '/audio/ngoika.mp3',
      description: 'A powerful rendition of this classic worship song'
    },
    {
      id: 'song-3',
      title: 'The Rock',
      duration: '3:45',
      audioUrl: '/audio/The Rock.mp3',
      description: 'An uplifting arrangement filled with hope'
    }
  ];

  const livePerformances = [
    {
      id: 'live-1',
      title: 'Sunday Morning Worship - Syokimau Central SDA',
      youtubeId: 'dQw4w9WgXcQ', // Placeholder
      description: 'Live performance during Sunday morning service'
    },
    {
      id: 'live-2',
      title: 'Youth Conference 2023',
      youtubeId: 'dQw4w9WgXcQ', // Placeholder
      description: 'Special performance at the annual youth conference'
    },
    {
      id: 'live-3',
      title: 'Wedding Performance - Nairobi',
      youtubeId: 'dQw4w9WgXcQ', // Placeholder
      description: 'Surprise performance at a beautiful wedding ceremony'
    }
  ];

  const coverSongs = [
    {
      id: 'cover-1',
      title: 'Waymaker - Sinach',
      duration: '4:15',
      audioUrl: '/audio/waymaker.mp3',
      originalArtist: 'Sinach',
      description: 'Our a cappella arrangement of this contemporary gospel hit'
    },
    {
      id: 'cover-2',
      title: 'Goodness of God - Bethel Music',
      duration: '5:02',
      audioUrl: '/audio/goodness-of-god.mp3',
      originalArtist: 'Bethel Music',
      description: 'A heartfelt cover of this modern worship anthem'
    },
    {
      id: 'cover-3',
      title: 'What a Beautiful Name - Hillsong',
      duration: '4:28',
      audioUrl: '/audio/beautiful-name.mp3',
      originalArtist: 'Hillsong Worship',
      description: 'Our unique take on this powerful worship song'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'music':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {musicSongs.map((song) => (
              <div key={song.id} className="card">
                <AudioPlayer 
                  song={song}
                  currentlyPlaying={currentlyPlaying}
                  setCurrentlyPlaying={setCurrentlyPlaying}
                />
                {song.description && (
                  <p className="text-gray-400 text-sm mt-3">{song.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'live':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {livePerformances.map((video) => (
              <div key={video.id} className="card">
                <VideoEmbed 
                  youtubeId={video.youtubeId}
                  title={video.title}
                />
                <h3 className="font-semibold mt-4 mb-2 text-white">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.description}</p>
              </div>
            ))}
          </div>
        );

      case 'covers':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {coverSongs.map((song) => (
              <div key={song.id} className="card">
                <AudioPlayer 
                  song={song}
                  currentlyPlaying={currentlyPlaying}
                  setCurrentlyPlaying={setCurrentlyPlaying}
                />
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-1">
                    Original by: <span className="text-gold">{song.originalArtist}</span>
                  </p>
                  <p className="text-gray-400 text-sm">{song.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="gallery" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gold">Music</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of a cappella worship through our original songs, 
            live performances, and gospel covers that touch hearts and change lives.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-container">
          <div className="flex justify-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          {renderTabContent()}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-6">
            Want to hear us live at your event?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.youtube.com/@thelightacapella2965" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Visit Our YouTube Channel
            </a>
            <a 
              href="https://instagram.com/thelightacapella" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
