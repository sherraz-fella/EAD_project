const express = require('express');
const router = express.Router();
const {
    getUserPlaylists,
    createPlaylist,
    addTrack,
    deletePlaylist
} = require('../controllers/playlists');

router.get('/', getUserPlaylists);
router.post('/', createPlaylist);
router.post('/:id/songs', addTrack);
router.delete('/:id', deletePlaylist);

module.exports = router;