export default function Legend() {
    return (
      <div className="flex gap-4 mb-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-primary rounded-sm"></div>
          <span>Available (Regular)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-yellow-400 rounded-sm"></div>
          <span>Available (VIP)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-destructive rounded-sm"></div>
          <span>Booked</span>
        </div>
      </div>
    );
  }