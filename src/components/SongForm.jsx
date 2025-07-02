import React, { useState } from 'react';
import './SongForm.css';

const SongForm = ({ onAddSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && artist && url) {
      onAddSong({ title, artist, url });
      setTitle('');
      setArtist('');
      setUrl('');
    }
  };

  return (
    <div className="song-form-card">
      <h2 className="form-title">Add a New Song</h2>
      <form onSubmit={handleSubmit} className="song-form">
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="url"
          placeholder="Song URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default SongForm;
