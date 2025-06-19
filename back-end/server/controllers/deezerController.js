const axios = require('axios');

exports.searchTracks = async (req, res) => {
    try {
        const { q } = req.query;
        const response = await axios.get(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`);

        // Format response
        const tracks = response.data.data.map(track => ({
            id: track.id,
            title: track.title,
            artist: track.artist.name,
            album: track.album.title,
            duration: track.duration,
            cover: track.album.cover_medium,
            preview: track.preview
        }));

        res.json(tracks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search Deezer' });
    }
};