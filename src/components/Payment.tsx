import React from 'react';
import { ArrowLeft, CreditCard, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { INTERNATIONAL_DESTINATIONS } from '../data/routes';

interface PaymentProps {
  bookingData: {
    bus: {
      busType: string;
      departure: string;
      price: string;
      from: string;
      to: string;
    } | null;
    selectedSeats: string[];
    passengerInfo: {
      fullName: string;
      phone: string;
      boardingStation: string;
      pickupStation: string;
      passportNumber: string;
      yellowFever: boolean;
    };
  };
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ bookingData, onBack }) => {
  const basePrice = parseInt(bookingData.bus?.price.replace(/,/g, '') || '0');
  
  const internationalCities = INTERNATIONAL_DESTINATIONS.map(d => d.name);
  const isInternational = bookingData.bus && (internationalCities.includes(bookingData.bus.from) || internationalCities.includes(bookingData.bus.to));

  const getSeatType = (id: string) => {
    const row = parseInt(id.split('-')[0]) || parseInt(id);
    if (row <= 2) return 'VIP';
    if (row <= 5) return 'Business';
    return 'Regular';
  };

  const getSeatPriceAdjustment = (type: string) => {
    if (type === 'VIP') return 1000;
    if (type === 'Business') return 500;
    return 0;
  };

  const totalPrice = bookingData.selectedSeats.reduce((acc, seatId) => {
    const type = getSeatType(seatId);
    return acc + basePrice + getSeatPriceAdjustment(type);
  }, 0);

  const generateWhatsAppMessage = () => {
    const info = bookingData.passengerInfo;
    const bus = bookingData.bus;
    const text = `*NEW BOOKING CONFIRMATION*

*Route:* ${bus?.from} to ${bus?.to}
*Date:* ${bus?.departure}
*Seats:* ${bookingData.selectedSeats.join(', ')}
*Amount:* KES ${totalPrice.toLocaleString()}

*Passenger:* ${info.fullName}
*Phone:* ${info.phone}
${isInternational ? `*Passport/ID:* ${info.passportNumber}
*Yellow Fever:* ${info.yellowFever ? 'Yes' : 'No'}` : ''}
*Boarding:* ${info.boardingStation}
*Drop-off:* ${info.pickupStation}

*Payment Details:*
Business No: 529914
Account No: 393270`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppConfirm = (number: string) => {
    window.open(`https://wa.me/${number}?text=${generateWhatsAppMessage()}`, '_blank');
    toast.success('WhatsApp opened with your booking details!');
  };

  const handlePay = () => {
    toast.success('Payment details copied. Please complete the transaction.');
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 pt-8 pb-6 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold">Secure Payment</h2>
          <div className="w-10" />
        </div>
        <p className="text-center text-[10px] uppercase font-bold tracking-widest opacity-80">Checkout</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-32">
        {/* Booking Summary */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-primary uppercase tracking-tighter">Booking Summary</h3>
          <Card className="p-5 border-none shadow-sm space-y-4 relative overflow-hidden bg-card">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className="bg-primary text-primary-foreground font-bold border-none px-3 py-1">
                  Confirmed Trip
                </Badge>
                <span className="text-xs font-black text-accent">{bookingData.selectedSeats.length} Seats</span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">Route</p>
                <p className="font-black text-primary text-xl">{bookingData.bus?.from} → {bookingData.bus?.to}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-muted/50">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Bus Type</p>
                  <p className="text-xs font-bold text-primary">{bookingData.bus?.busType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Departure</p>
                  <p className="text-xs font-bold text-accent uppercase">{bookingData.bus?.departure}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-muted flex flex-wrap gap-2">
               {bookingData.selectedSeats.map(seat => (
                 <span key={seat} className="bg-muted px-2 py-1 rounded text-[10px] font-bold text-primary">
                    Seat {seat} ({getSeatType(seat)})
                 </span>
               ))}
            </div>

            <div className="pt-4 border-t border-dashed border-muted space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>Passenger</span>
                <span className="text-primary">{bookingData.passengerInfo.fullName}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>Phone</span>
                <span className="text-primary">{bookingData.passengerInfo.phone}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>Boarding</span>
                <span className="text-primary text-right max-w-[150px]">{bookingData.passengerInfo.boardingStation}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>Drop-off</span>
                <span className="text-primary text-right max-w-[150px]">{bookingData.passengerInfo.pickupStation}</span>
              </div>
              
              {isInternational && (
                <>
                  <div className="flex justify-between text-xs font-bold text-muted-foreground">
                    <span>Passport/ID</span>
                    <span className="text-primary">{bookingData.passengerInfo.passportNumber}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-muted-foreground">
                    <span>Yellow Fever</span>
                    <span className={bookingData.passengerInfo.yellowFever ? "text-green-600" : "text-red-500"}>
                      {bookingData.passengerInfo.yellowFever ? 'Certified' : 'Not Certified'}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-primary/10 flex justify-between items-end">
              <p className="text-sm font-black text-primary">Total Amount</p>
              <p className="text-2xl font-black text-accent">KES {totalPrice.toLocaleString()}</p>
            </div>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-primary uppercase tracking-tighter">Select Payment Method</h3>
          
          <div className="grid gap-3">
          <Card className="p-4 bg-muted/30 border-none shadow-inner mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-accent font-black text-xs">i</span>
              </div>
              <p className="text-xs font-bold text-primary">M-PESA Paybill Details</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl border border-muted shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Business No</p>
                <p className="text-lg font-black text-secondary">529914</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-muted shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Account No</p>
                <p className="text-lg font-black text-secondary">393270</p>
              </div>
            </div>
          </Card>

            <button 
              onClick={handlePay}
              className="group relative flex items-center justify-between p-4 bg-card rounded-2xl border-2 border-transparent hover:border-accent transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#48B02C]/10 rounded-xl flex items-center justify-center">
                  <span className="text-[#48B02C] font-black italic text-xl">M</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-primary">Lipa Na M-PESA</p>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Mobile Money Transfer</p>
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button className="group relative flex items-center justify-between p-4 bg-card rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all shadow-sm opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-primary">Credit / Debit Card</p>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Visa, Mastercard, Amex</p>
                </div>
              </div>
            </button>

            <div className="pt-4 space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase text-center">Confirm via WhatsApp</p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                   variant="secondary"
                   onClick={() => handleWhatsAppConfirm('254735775636')}
                   className="flex items-center gap-2 h-12 rounded-xl border-green-500/30 hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <div className="text-left leading-none">
                    <p className="text-[10px] font-bold">Support 1</p>
                    <p className="text-[8px] opacity-60">WhatsApp</p>
                  </div>
                </Button>
                <Button 
                   variant="secondary"
                   onClick={() => handleWhatsAppConfirm('254762524523')}
                   className="flex items-center gap-2 h-12 rounded-xl border-green-500/30 hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <div className="text-left leading-none">
                    <p className="text-[10px] font-bold">Support 2</p>
                    <p className="text-[8px] opacity-60">WhatsApp</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] max-w-md mx-auto z-40">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase text-center">Final Confirmation</p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => handleWhatsAppConfirm('254735775636')}
              className="h-12 rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-sm shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 px-2"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              WhatsApp 1
            </Button>
            <Button 
              onClick={() => handleWhatsAppConfirm('254762524523')}
              className="h-12 rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-sm shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 px-2"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              WhatsApp 2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
