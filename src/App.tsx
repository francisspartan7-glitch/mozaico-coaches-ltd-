import { useState } from 'react';
import BookingForm from './components/BookingForm';
import BusResults from './components/BusResults';
import BottomNav from './components/BottomNav';
import { Toaster } from '@/components/ui/sonner';
import SeatSelection from './components/SeatSelection';
import PassengerDetails from './components/PassengerDetails';
import Payment from './components/Payment';
import FleetShowcase from './components/FleetShowcase';
import { MessageCircle } from 'lucide-react';

type ViewState = 'search' | 'results' | 'seat-selection' | 'passenger-details' | 'payment';

interface SearchParams {
  from: string;
  to: string;
  date: string;
}

interface SelectedBus {
  id: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  busType: string;
  availableSeats: number;
  from: string;
  to: string;
}

interface BookingData {
  bus: SelectedBus | null;
  selectedSeats: string[];
  passengerInfo: {
    fullName: string;
    phone: string;
    boardingStation: string;
    pickupStation: string;
    passportNumber: string;
    yellowFever: boolean;
  };
}

function App() {
  const [view, setView] = useState<ViewState>('search');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: 'Kampala',
    date: '2026-06-11'
  });
  const [bookingData, setBookingData] = useState<BookingData>({
    bus: null,
    selectedSeats: [],
    passengerInfo: {
      fullName: '',
      phone: '',
      boardingStation: '',
      pickupStation: '',
      passportNumber: '',
      yellowFever: false
    }
  });

  const handleBusSelect = (bus: SelectedBus) => {
    setBookingData(prev => ({ ...prev, bus }));
    setView('seat-selection');
  };

  const handleSeatsConfirm = (seats: string[]) => {
    setBookingData(prev => ({ ...prev, selectedSeats: seats }));
    setView('passenger-details');
  };

  const handlePassengerSubmit = (info: BookingData['passengerInfo']) => {
    setBookingData(prev => ({ ...prev, passengerInfo: info }));
    setView('payment');
  };

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setView('results');
  };

  return (
    <div className="min-h-screen bg-background pb-20 font-sans antialiased text-foreground">
      {/* Status Bar Mockup */}
      <div className="px-6 py-2 flex justify-between items-center text-[12px] font-bold opacity-60 bg-background">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded-full border border-black/20" />
          <div className="w-4 h-4 rounded-full border border-black/20" />
          <div className="w-4 h-4 rounded-full border border-black/20" />
        </div>
      </div>

      {/* Logo Header */}
      <div className="px-6 py-2 flex justify-center items-center bg-background">
        <div className="flex items-center justify-center">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/attachments/8c45be37-8e81-4fa8-b9b8-ade180984531/1782002707638_FB_IMG_1781739647738.jpg" 
            alt="MOZAICO Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      <main className="max-w-md mx-auto">
        {view === 'search' ? (
          <>
            <div className="mb-8">
              <FleetShowcase />
            </div>
            <BookingForm onSearch={handleSearch} />
          </>
        ) : view === 'results' ? (
          <BusResults 
            from={searchParams.from}
            to={searchParams.to}
            date={searchParams.date}
            onBack={() => setView('search')} 
            onSelect={handleBusSelect}
          />
        ) : view === 'seat-selection' ? (
          <SeatSelection 
            bus={bookingData.bus!}
            onBack={() => setView('results')}
            onConfirm={handleSeatsConfirm}
          />
        ) : view === 'passenger-details' ? (
          <PassengerDetails 
            onBack={() => setView('seat-selection')}
            onSubmit={handlePassengerSubmit}
            from={searchParams.from}
            to={searchParams.to}
            bus={bookingData.bus!}
            selectedSeats={bookingData.selectedSeats}
          />
        ) : (
          <Payment 
            bookingData={bookingData}
            onBack={() => setView('passenger-details')}
          />
        )}
      </main>

      {(view === 'search' || view === 'results') && (
        <a 
          href="https://wa.me/254735775636" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-24 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle size={32} fill="currentColor" className="text-white" />
        </a>
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;