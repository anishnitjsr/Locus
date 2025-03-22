import mongoose from 'mongoose';
import Seat from './models/Seat.js';
import dotenv from 'dotenv';

dotenv.config();

const initializeSeats = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const seats = [];
  for (let i = 1; i <= 50; i++) {
    seats.push({
      seatNumber: i,
      category: i <= 10 ? 'VIP' : 'Regular',
      price: i <= 10 ? 350 : 200
    });
  }

  await Seat.deleteMany({});
  await Seat.insertMany(seats);
  console.log('Database initialized with 50 seats');
  process.exit();
};

initializeSeats();