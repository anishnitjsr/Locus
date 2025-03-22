import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 50
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['VIP', 'Regular'],
    default: 'Regular'
  },
  price: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Seat', seatSchema);