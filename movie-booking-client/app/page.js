'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import Analytics from '@/app/components/Analytics';
import Legend from '@/app/components/Legend';

export default function Home() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/seats');
      setSeats(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching seats');
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat.isBooked) {
      setSelectedSeats(prev => 
        prev.includes(seat.seatNumber)
          ? prev.filter(num => num !== seat.seatNumber)
          : [...prev, seat.seatNumber]
      );
    }
  };

  const handleBooking = async () => {
    try {
      await Promise.all(
        selectedSeats.map(seatNumber =>
          axios.put(`http://localhost:5000/api/seats/${seatNumber}/book`)
        )
      );
      toast.success('Booking successful!');
      fetchSeats();
      setSelectedSeats([]);
    } catch (error) {
      toast.error('Booking failed');
    }
  };

  const handleCancel = async (seatNumber) => {
    try {
      await axios.put(`http://localhost:5000/api/seats/${seatNumber}/cancel`);
      toast.success('Cancellation successful!');
      fetchSeats();
    } catch (error) {
      toast.error('Cancellation failed');
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Movie Theater Seating</h1>
      <Legend />
      
      <div className="flex justify-between mb-6">
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="VIP">VIP</option>
          <option value="Regular">Regular</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Seating Grid */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Select Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {seats
                .filter(seat => categoryFilter === 'All' || seat.category === categoryFilter)
                .map(seat => (
                  <Button
                    key={seat.seatNumber}
                    variant={
                      seat.isBooked ? 'destructive' :
                      selectedSeats.includes(seat.seatNumber) ? 'default' : 'outline'
                    }
                    className={`h-12 w-12 ${seat.category === 'VIP' ? 'border-2 border-yellow-400' : ''}`}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                  >
                    {seat.seatNumber}
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Selected Seats:</h3>
                {selectedSeats.join(', ') || 'None'}
              </div>
              <div>
                <h3 className="font-semibold">Total Price:</h3>
                ₹{selectedSeats.reduce((acc, num) => 
                  acc + (seats.find(s => s.seatNumber === num)?.price || 0), 0)}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Booked Seats:</h3>
                <div className="space-y-2">
                  {seats.filter(s => s.isBooked).map(seat => (
                    <div key={seat.seatNumber} className="flex justify-between items-center">
                      <span>Seat {seat.seatNumber} ({seat.category})</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleCancel(seat.seatNumber)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
            >
              Confirm Booking
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Analytics seats={seats} />
    </main>
  );
}