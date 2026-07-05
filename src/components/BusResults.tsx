import React from 'react';
import { ArrowLeft, SlidersHorizontal, MapPin } from 'lucide-react';
import BusCard from './BusCard';
import { getRouteBuses } from '@/data/routes';

interface BusResultsProps {
  from: string;
  to: string;
  date: string;
  onBack: () => void;
  onSelect: (bus: any) => void;
}

const BusResults: React.FC<BusResultsProps> = ({ from, to, date, onBack, onSelect }) => {
  const buses = getRouteBuses(from, to);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 pt-8 pb-6 rounded-b-[2rem] shadow-lg sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold">Select Bus</h2>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-4 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold uppercase">{from}</span>
          </div>
          <div className="h-[1px] w-8 bg-white/30" />
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold uppercase">{to}</span>
          </div>
        </div>
      </div>

      {/* Date Selector Strip */}
      <div className="px-4 py-4 flex gap-4 overflow-x-auto scrollbar-hide bg-card shadow-sm">
        {[
          { day: 'THU', date: '11' },
          { day: 'FRI', date: '12', active: true },
          { day: 'SAT', date: '13' },
          { day: 'SUN', date: '14' },
          { day: 'MON', date: '15' },
          { day: 'TUE', date: '16' },
        ].map((item, idx) => (
          <div 
            key={idx}
            className={`flex-shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              item.active 
                ? 'bg-primary text-primary-foreground scale-110 shadow-lg' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <span className="text-[10px] font-bold opacity-70">{item.day}</span>
            <span className="text-lg font-extrabold">{item.date}</span>
          </div>
        ))}
      </div>

      {/* Bus List */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto pb-24">
        <div className="flex justify-between items-center px-1 mb-2">
          <p className="text-sm font-bold text-primary">{buses.length} Buses Found</p>
          <p className="text-xs text-muted-foreground font-medium">Sorted by Departure</p>
        </div>
        
        {buses.length > 0 ? (
          buses.map((bus) => (
            <BusCard key={bus.id} {...bus} from={from} to={to} onSelect={onSelect} />
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-medium">No buses available for this route today.</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Try searching for Nairobi to Mombasa or Kigali.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusResults;