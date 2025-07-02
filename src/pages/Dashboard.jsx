import React, { useEffect, useState } from 'react';
import Topbar from '../components/TopBar';
import SongForm from '../components/SongForm';
import SongList from '../components/SongList';
import AudioPlayer from '../components/AudioPlayer';
import './Dashboard.css';

const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const handleAddSong = (song) => {
    setSongs((prev) => [...prev, song]);
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    setTimeout(() => {
      document
        .querySelector('.audio-player-section')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDeleteSong = (index) => {
    setSongs((prev) => prev.filter((_, i) => i !== index));
    if (songs[index]?.url === currentSong?.url) {
      setCurrentSong(null);
    }
  };

  const handleUpdateSong = (index, updatedSong) => {
    setSongs((prev) => prev.map((song, i) => (i === index ? updatedSong : song)));
    if (songs[index]?.url === currentSong?.url) {
      setCurrentSong(updatedSong);
    }
  };

  useEffect(() => {
    const hardcoded = {
      title: 'Demo Track',
      artist: 'Kalam Beats',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    };
    setSongs([hardcoded]);
    setCurrentSong(hardcoded);
  }, []);

  return (
    <div className="dashboard-container">
      <Topbar />

      <div className="dashboard-main-layout">
        <div className="left-card">
          <SongForm onAddSong={handleAddSong} />
        </div>

        <div className="right-card">
          <SongList
            songs={songs}
            onSelect={handleSelectSong}
            onDelete={handleDeleteSong}
            onUpdate={handleUpdateSong}
            currentSong={currentSong}
          />
        </div>
      </div>

      <div className="audio-player-section">
        <AudioPlayer song={currentSong} />
      </div>
    </div>
  );
};

export default Dashboard;