import React, { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, FileText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INTERNATIONAL_DESTINATIONS } from '../data/routes';

interface PassengerDetailsProps {
  onBack: () => void;
  onSubmit: (info: {
    fullName: string;
    phone: string;
    boardingStation: string;
    pickupStation: string;
    passportNumber: string;
    yellowFever: boolean;
  }) => void;
  from: string;
  to: string;
  bus: {
    departure: string;
    price: string;
    from: string;
    to: string;
    busType: string;
  };
  selectedSeats: string[];
}

const PassengerDetails: React.FC<PassengerDetailsProps> = ({ 
  onBack, onSubmit, from, to, bus, selectedSeats 
}) => {
  const internationalCities = INTERNATIONAL_DESTINATIONS.map(d => d.name);
  const isInternational = internationalCities.includes(from) || internationalCities.includes(to);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    boardingStation: '',
    pickupStation: '',
    passportNumber: '',
    yellowFever: false
  });

  const stations = [
    'Nairobi Terminal',
    'Nakuru Station',
    'Eldoret Hub',
    'Malaba Border',
    'Kampala Terminal',
    'Kigali Terminal',
    'Bujumbura Terminal',
    'Juba Terminal'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isPassportRequired = isInternational;
    const isValid = formData.fullName && formData.phone && formData.boardingStation && formData.pickupStation && 
      (!isPassportRequired || formData.passportNumber);

    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 pt-8 pb-6 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold">Passenger Details</h2>
          <div className="w-10" />
        </div>
        <p className="text-center text-[10px] uppercase font-bold tracking-widest opacity-80">Finalize your booking</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {/* Trip Summary Preview */}
        {/* Trip Summary Preview */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-tight">
            <FileText className="h-4 w-4" />
            Trip Details
          </h3>
          <Card className="p-4 bg-primary/5 border-none shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Route</p>
                <p className="text-sm font-bold text-primary">{bus.from} → {bus.to}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Departure & Bus</p>
                <p className="text-sm font-bold text-primary">{bus.departure} • {bus.busType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Selected Seats</p>
                <p className="text-sm font-bold text-accent">{selectedSeats.join(', ')} ({selectedSeats.length} Total)</p>
              </div>
            </div>
          </Card>

          {/* Requirements Checklist */}
          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl">
            <p className="text-xs font-bold text-accent uppercase mb-2 flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" />
              Documents Required to Fill
            </p>
            <ul className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-[10px] font-bold text-primary/80">
              <li className="flex items-center gap-1.5">✓ Valid ID/Passport</li>
              <li className="flex items-center gap-1.5">✓ Mobile Number</li>
              {isInternational && (
                <>
                  <li className="flex items-center gap-1.5">✓ Passport No.</li>
                  <li className="flex items-center gap-1.5">✓ Yellow Fever Cert</li>
                </>
              )}
              <li className="flex items-center gap-1.5">✓ Station Choice</li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px]">1</span>
            Passenger Information
          </h3>
          
          <Card className="p-5 space-y-5 border-none shadow-md bg-card/50 backdrop-blur-sm">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                <Input 
                  required
                  placeholder="e.g. John Doe"
                  className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-accent"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                <Input 
                  required
                  type="tel"
                  placeholder="e.g. 0712 345 678"
                  className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-accent"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </Card>
        </div>

        {isInternational && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px]">2</span>
              International Travel Docs
            </h3>
            
            <Card className="p-5 space-y-5 border-none shadow-md bg-card/50 backdrop-blur-sm">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Passport/ID Number</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                  <Input 
                    required
                    placeholder="e.g. A12345678"
                    className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-accent"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox 
                  id="yellowFever"
                  checked={formData.yellowFever}
                  onCheckedChange={(checked) => setFormData({...formData, yellowFever: !!checked})}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="yellowFever"
                    className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    Yellow Fever Certificate
                  </Label>
                  <p className="text-[10px] text-muted-foreground">
                    I confirm I have a valid yellow fever certificate
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px]">{isInternational ? '3' : '2'}</span>
            Stations & Boarding
          </h3>
          
          <Card className="p-5 space-y-5 border-none shadow-md bg-card/50 backdrop-blur-sm">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Boarding Station</Label>
              <Select 
                onValueChange={(val) => setFormData({...formData, boardingStation: val})}
                required
              >
                <SelectTrigger className="h-12 bg-muted/30 border-none focus:ring-accent">
                  <SelectValue placeholder="Select boarding station" />
                </SelectTrigger>
                <SelectContent>
                  {stations.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Pickup Station (Drop-off)</Label>
              <Select 
                onValueChange={(val) => setFormData({...formData, pickupStation: val})}
                required
              >
                <SelectTrigger className="h-12 bg-muted/30 border-none focus:ring-accent">
                  <SelectValue placeholder="Select pickup station" />
                </SelectTrigger>
                <SelectContent>
                  {stations.slice().reverse().map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        <div className="pt-4 pb-20">
          <Button 
            type="submit"
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-xl transition-all active:scale-[0.98]"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PassengerDetails;
