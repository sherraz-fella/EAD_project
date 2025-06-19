const express = require('express');
const router = express.Router();
const { searchTracks } = require('../controllers/deezer');

router.get('/search', searchTracks);

module.exports = router;