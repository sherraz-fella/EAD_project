import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/auth.js';
import playlistRoutes from './routes/playlist.js';


// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => console.log('✅ Server running on port 5000'));
})
.catch(err => console.error('❌ MongoDB connection error:', err));