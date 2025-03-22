"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Analytics({ seats }) {
  const bookedSeats = seats.filter((seat) => seat.isBooked).length;
  const percentage = (bookedSeats / 50) * 100;
  const totalRevenue = seats.reduce(
    (acc, seat) => acc + (seat.isBooked ? seat.price : 0),
    0
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Theater Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Occupancy Rate</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold">{bookedSeats}</div>
              <div className="text-sm">Booked Seats</div>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold">{50 - bookedSeats}</div>
              <div className="text-sm">Available Seats</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <div className="text-2xl font-bold">₹{totalRevenue}</div>
              <div className="text-sm">Total Revenue</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}