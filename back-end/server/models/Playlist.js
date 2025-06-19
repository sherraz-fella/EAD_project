const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    songs: [{
        deezerId: Number,       // Deezer track ID
        title: String,
        artist: String,
        album: String,
        duration: Number,       // in seconds
        cover: String           // album cover URL
    }],
    user: {
        type: String,           // stores username (simplest approach)
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);