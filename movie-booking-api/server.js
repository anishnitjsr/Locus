import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Seat from './models/Seat.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Endpoints
app.get('/', (_, res)=>{
  res.send("Movie Ticket Booking Backend")
})
app.get('/api/seats', async (req, res) => {
  try {
    const seats = await Seat.find().sort('seatNumber');
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/seats/:id/book', async (req, res) => {
  try {
    const seat = await Seat.findOneAndUpdate(
      { seatNumber: req.params.id, isBooked: false },
      { $set: { isBooked: true } },
      { new: true, runValidators: true }
    );
    
    if (!seat) return res.status(400).json({ message: 'Seat not available' });
    res.json(seat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/seats/:id/cancel', async (req, res) => {
  try {
    const seat = await Seat.findOneAndUpdate(
      { seatNumber: req.params.id, isBooked: true },
      { $set: { isBooked: false } },
      { new: true }
    );
    
    if (!seat) return res.status(400).json({ message: 'Seat not found' });
    res.json(seat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));