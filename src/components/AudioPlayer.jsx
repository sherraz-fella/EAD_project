import React from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ song }) => {
  if (!song) {
    return (
      <div className="audio-player-box">
        <p style={{ textAlign: 'center' }}>🎧 No song selected</p>
      </div>
    );
  }

  return (
    <div className="audio-player-box">
      <audio controls autoPlay style={{ width: '100%' }}>
        <source src={song.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="song-meta">
        <strong>{song.title}</strong> — {song.artist}
      </div>
    </div>
  );
};

export default AudioPlayer;