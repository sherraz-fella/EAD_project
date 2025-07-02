import React, { useState, useRef } from 'react';
import { Play, Pause, Pencil, Trash2 } from 'lucide-react';
import './SongList.css';

const SongList = ({ songs, onDelete, onUpdate, onSelect }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ title: '', artist: '', url: '' });
  const audioRefs = useRef({}); // Holds refs to audio tags
  const [playingIndex, setPlayingIndex] = useState(null);

  const startEdit = (index, song) => {
    setEditingIndex(index);
    setEditData({ ...song });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = (index) => {
    onUpdate(index, editData);
    setEditingIndex(null);
  };

  const togglePlayPause = (index, song) => {
    const audio = audioRefs.current[index];

    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
    } else {
      Object.values(audioRefs.current).forEach((a) => a.pause());
      audio.play();
      setPlayingIndex(index);
      onSelect(song);
    }
  };

  return (
    <div className="song-list">
      {songs.length === 0 ? (
        <p>No songs yet.</p>
      ) : (
        songs.map((song, index) => {
          const isEditing = editingIndex === index;
          const isPlaying = playingIndex === index;

          return (
            <div
              key={index}
              className={`song-card ${isPlaying ? 'playing' : ''}`}
            >
              {isEditing ? (
                <>
                  <input
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                  />
                  <input
                    name="artist"
                    value={editData.artist}
                    onChange={handleEditChange}
                    placeholder="Artist"
                  />
                  <input
                    name="url"
                    value={editData.url}
                    onChange={handleEditChange}
                    placeholder="Song URL"
                  />
                  <div className="btn-group">
                    <button onClick={() => saveEdit(index)}>Save</button>
                    <button onClick={() => setEditingIndex(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <strong>{song.title}</strong>
                  <p>{song.artist}</p>

                  <div className="btn-group">
                    <button onClick={() => togglePlayPause(index, song)}>
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <button onClick={() => startEdit(index, song)}>
                      <Pencil size={16} />
                    </button>

                    <button onClick={() => onDelete(index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}

              {/* Hidden audio element */}
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={song.url}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SongList;