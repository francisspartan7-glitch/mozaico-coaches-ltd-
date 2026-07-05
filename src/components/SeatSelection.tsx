import React, { useState } from 'react';
import { ArrowLeft, Info, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface SeatSelectionProps {
  bus: {
    busType: string;
    price: string;
  };
  onBack: () => void;
  onConfirm: (seats: string[]) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ bus, onBack, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate seats: 11 rows, 4 seats per row (2-aisle-2)
  const rows = 11;
  const seatsPerRow = 4;
  
  const toggleSeat = (id: string) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter(s => s !== id));
    } else {
      if (selectedSeats.length < 4) { // Limit to 4 seats
        setSelectedSeats([...selectedSeats, id]);
      }
    }
  };

  const getSeatType = (row: number) => {
    if (row <= 2) return 'VIP';
    if (row <= 5) return 'Business';
    return 'Regular';
  };

  const getSeatPriceAdjustment = (type: string) => {
    if (type === 'VIP') return 1000;
    if (type === 'Business') return 500;
    return 0;
  };

  const basePrice = parseInt(bus.price.replace(/,/g, ''));
  
  const totalPrice = selectedSeats.reduce((acc, seatId) => {
    const row = parseInt(seatId.split('-')[0]);
    const type = getSeatType(row);
    return acc + basePrice + getSeatPriceAdjustment(type);
  }, 0);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 pt-8 pb-6 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold">Select Seats</h2>
          <div className="w-10" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-black text-primary-foreground -mt-1">KCS 123A</h3>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs opacity-80 uppercase tracking-widest font-bold">{bus.busType}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Legend */}
        <div className="flex justify-between items-center mb-8 bg-card p-4 rounded-2xl shadow-sm border border-muted">
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-md bg-muted" />
            <span className="text-[10px] font-bold text-muted-foreground">Booked</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-md border-2 border-primary" />
            <span className="text-[10px] font-bold text-muted-foreground">Available</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-md bg-accent" />
            <span className="text-[10px] font-bold text-muted-foreground">Selected</span>
          </div>
        </div>

        {/* Seat Categories Info */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="bg-primary/5 p-2 rounded-xl text-center border border-primary/10">
            <p className="text-[9px] font-bold text-primary uppercase">VIP</p>
            <p className="text-[10px] font-medium">+1,000</p>
          </div>
          <div className="bg-accent/5 p-2 rounded-xl text-center border border-accent/10">
            <p className="text-[9px] font-bold text-accent uppercase">Business</p>
            <p className="text-[10px] font-medium">+500</p>
          </div>
          <div className="bg-muted p-2 rounded-xl text-center border border-muted">
            <p className="text-[9px] font-bold text-muted-foreground uppercase">Regular</p>
            <p className="text-[10px] font-medium">Base</p>
          </div>
        </div>

        {/* Bus Layout */}
        <div className="relative bg-card rounded-[3rem] border-4 border-muted p-6 shadow-inner mb-24">
          {/* Driver Seat Area */}
          <div className="flex justify-end mb-8 border-b-2 border-dashed border-muted pb-4">
            <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center">
               <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                  <div className="w-1 h-3 bg-muted-foreground/30 rounded-full rotate-45" />
               </div>
            </div>
          </div>

          {/* Seats Grid */}
          <div className="space-y-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex justify-between gap-4">
                {/* Left Side (2 seats) */}
                <div className="flex gap-2">
                  {[0, 1].map((seatIndex) => {
                    const seatId = `${rowIndex + 1}${String.fromCharCode(65 + seatIndex)}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isBooked = (rowIndex === 2 && seatIndex === 1) || (rowIndex === 5 && seatIndex === 0);
                    const seatType = getSeatType(rowIndex + 1);
                    
                    return (
                      <button
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seatId)}
                        className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center relative ${
                          isBooked 
                            ? 'bg-muted cursor-not-allowed opacity-50' 
                            : isSelected 
                              ? 'bg-accent text-accent-foreground shadow-lg scale-110 ring-2 ring-accent ring-offset-2' 
                              : 'border-2 border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        <Armchair className={`h-5 w-5 ${isSelected ? 'text-accent-foreground' : 'text-primary/40'}`} />
                        {isSelected && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-[8px] rounded-full flex items-center justify-center border border-white font-bold"
                          >
                            {selectedSeats.indexOf(seatId) + 1}
                          </motion.span>
                        )}
                        <span className="sr-only">{seatId}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Aisle Spacer */}
                <div className="w-4" />

                {/* Right Side (2 seats) */}
                <div className="flex gap-2">
                  {[2, 3].map((seatIndex) => {
                    const seatId = `${rowIndex + 1}${String.fromCharCode(65 + seatIndex)}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isBooked = (rowIndex === 1 && seatIndex === 3) || (rowIndex === 8 && seatIndex === 2);
                    
                    return (
                      <button
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seatId)}
                        className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center relative ${
                          isBooked 
                            ? 'bg-muted cursor-not-allowed opacity-50' 
                            : isSelected 
                              ? 'bg-accent text-accent-foreground shadow-lg scale-110 ring-2 ring-accent ring-offset-2' 
                              : 'border-2 border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        <Armchair className={`h-5 w-5 ${isSelected ? 'text-accent-foreground' : 'text-primary/40'}`} />
                        {isSelected && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-[8px] rounded-full flex items-center justify-center border border-white font-bold"
                          >
                            {selectedSeats.indexOf(seatId) + 1}
                          </motion.span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] max-w-md mx-auto z-40">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Selected Seats</p>
            <p className="text-lg font-black text-primary">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Amount</p>
            <p className="text-2xl font-black text-accent">KES {totalPrice.toLocaleString()}</p>
          </div>
        </div>
        <Button 
          disabled={selectedSeats.length === 0}
          onClick={() => onConfirm(selectedSeats)}
          className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg shadow-xl disabled:opacity-50 transition-all active:scale-[0.98] border-none"
        >
          Confirm Seats
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
