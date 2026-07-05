import React from 'react';
import { Bus, Clock, ShieldCheck, Wifi, Coffee } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BusCardProps {
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  busType: string;
  availableSeats: number;
  onSelect?: (bus: any) => void;
  from?: string;
  to?: string;
}

const BusCard: React.FC<BusCardProps> = (props) => {
  const {
    departure,
    arrival,
    duration,
    price,
    busType,
    availableSeats,
    onSelect,
    from = 'Nairobi',
    to = 'Kampala'
  } = props;

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Bus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-primary">Mozaico Coaches</h3>
              <p className="text-xs text-muted-foreground">{busType}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-none font-semibold">
            {availableSeats} seats left
          </Badge>
        </div>

        <div className="flex justify-between items-center py-4 border-y border-dashed border-muted">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{departure}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{from}</p>
          </div>
          
          <div className="flex flex-col items-center flex-1 px-4">
            <p className="text-[10px] text-muted-foreground font-medium mb-1">{duration}</p>
            <div className="w-full flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-muted" />
              <div className="h-[1px] flex-1 bg-muted" />
              <Clock className="h-3 w-3 text-muted-foreground" />
              <div className="h-[1px] flex-1 bg-muted" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-primary">{arrival}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{to}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Wifi className="h-4 w-4 text-muted-foreground" />
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground">Departure: {departure}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-medium">Total Price</p>
            <p className="text-xl font-extrabold text-primary">KES {price}</p>
            <p className="text-[9px] text-muted-foreground">per seat</p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button 
          onClick={() => onSelect?.(props)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-11 rounded-xl shadow-lg"
        >
          Select Seat
        </Button>
      </div>
    </Card>
  );
};

export default BusCard;