import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  genre: String,
  duration: String,
  url: String,
  isFavorite: Boolean
});

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  songs: [songSchema]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;