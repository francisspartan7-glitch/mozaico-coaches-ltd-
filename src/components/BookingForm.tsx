import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, ArrowRightLeft, MessageCircle, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BookingFormProps {
  onSearch: (params: { from: string; to: string; date: string }) => void;
}

const LOCATIONS = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay",
  "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", 
  "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", 
  "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi", 
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", 
  "Tharaka Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
  "Kampala", "Bujumbura", "Kigali", "Juba", "Dar es Salaam"
];

interface CountySearchProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
}

const CountySearch: React.FC<CountySearchProps> = ({ label, value, onChange, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch(value);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const filteredCounties = LOCATIONS.filter(c => 
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2 relative mb-5" ref={containerRef}>
      <Label className="block mb-2 text-sm font-medium text-white">{label}</Label>
      <div className="relative">
        <Input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-[14px] text-base bg-transparent border border-white rounded-[4px] text-white placeholder:text-white/60 focus:outline-none focus:border-[#F97316] h-auto"
          autoComplete="off"
        />
        <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
        </div>
        {isOpen && filteredCounties.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-muted rounded-[4px] shadow-2xl max-h-[220px] overflow-y-auto z-[999] animate-in fade-in slide-in-from-top-2">
            {filteredCounties.map(county => (
              <li
                key={county}
                onClick={() => { onChange(county); setIsOpen(false); }}
                className="px-[14px] py-3 cursor-pointer hover:bg-[#F97316] hover:text-white transition-colors text-[#333] font-medium border-b border-muted last:border-none"
              >
                {county}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const BookingForm: React.FC<BookingFormProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('2026-06-11');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = () => {
    if (!from || !to) {
      toast.error('Please select both departure and destination counties');
      return;
    }
    if (from === to) {
      toast.error('Departure and destination cannot be the same');
      return;
    }
    onSearch({ from, to, date });
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="bg-[#0A3A5A] p-10 pt-[40px] pb-[30px] rounded-tl-[24px] font-sans text-white w-full box-border">
      <p className="text-sm mb-1 opacity-90">Experience travel in style</p>
      <h2 className="text-[28px] font-bold mb-7">Book a ticket now</h2>

      <CountySearch 
        label="Leaving From"
        value={from}
        onChange={setFrom}
        placeholder="Leaving From"
      />

      <CountySearch 
        label="Travelling To"
        value={to}
        onChange={setTo}
        placeholder="Travelling To"
      />

      <div className="mb-5 relative">
        <Label className="block mb-2 text-sm font-medium text-white">Travelling On</Label>
        <Input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-[14px] py-[14px] text-base bg-transparent border border-white rounded-[4px] text-white placeholder:text-white/60 focus:outline-none focus:border-[#F97316] h-auto dark-calendar-picker"
        />
      </div>

      <div className="mb-5 relative">
        <Label className="block mb-2 text-sm font-medium text-white">Returning On</Label>
        <Input 
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          placeholder="Returning On (Optional)"
          className="w-full px-[14px] py-[14px] text-base bg-transparent border border-white rounded-[4px] text-white placeholder:text-white/60 focus:outline-none focus:border-[#F97316] h-auto dark-calendar-picker"
        />
      </div>

      <button 
        onClick={handleSubmit}
        className="w-full mt-3 p-4 bg-[#F27F0C] hover:bg-[#E06D00] text-white border-none rounded-[4px] text-[15px] font-bold tracking-[0.5px] cursor-pointer transition-colors"
      >
        SEARCH AVAILABLE BUSES
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .dark-calendar-picker::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
        input[type="date"] {
          color-scheme: dark;
        }
      `}} />
    </div>
  );
};

export default BookingForm;
