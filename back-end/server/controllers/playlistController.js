const Playlist = require('../models/Playlist');

// Get user's playlists
exports.getUserPlaylists = async (req, res) => {
    try {
        const { username } = req.query;
        const playlists = await Playlist.find({ user: username });
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create playlist
exports.createPlaylist = async (req, res) => {
    try {
        const { name, username } = req.body;
        const playlist = new Playlist({ name, user: username });
        await playlist.save();
        res.status(201).json(playlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add Deezer track to playlist
exports.addTrack = async (req, res) => {
    try {
        const { deezerId, username } = req.body;

        // Fetch track details from Deezer
        const response = await axios.get(`https://api.deezer.com/track/${deezerId}`);
        const track = response.data;

        const song = {
            deezerId: track.id,
            title: track.title,
            artist: track.artist.name,
            album: track.album.title,
            duration: track.duration,
            cover: track.album.cover_medium
        };

        // Add to playlist
        const playlist = await Playlist.findById(req.params.id);
        if (playlist.user !== username) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        playlist.songs.push(song);
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete playlist
exports.deletePlaylist = async (req, res) => {
    try {
        const { username } = req.body;
        const playlist = await Playlist.findById(req.params.id);

        if (playlist.user !== username) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await playlist.remove();
        res.json({ message: 'Playlist deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};