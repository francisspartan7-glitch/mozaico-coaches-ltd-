import React from 'react';
import { Home, Ticket, User, Menu } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted px-6 py-3 flex justify-between items-center z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] rounded-t-[1.5rem] max-w-md mx-auto">
      <div className="flex flex-col items-center gap-1 text-primary">
        <div className="bg-primary/10 p-2 rounded-xl">
          <Home className="h-6 w-6" />
        </div>
        <span className="text-[10px] font-bold">Home</span>
      </div>
      
      <div className="flex flex-col items-center gap-1 text-muted-foreground">
        <Ticket className="h-6 w-6" />
        <span className="text-[10px] font-bold">Bookings</span>
      </div>
      
      <div className="flex flex-col items-center gap-1 text-muted-foreground">
        <User className="h-6 w-6" />
        <span className="text-[10px] font-bold">Account</span>
      </div>
      
      <div className="flex flex-col items-center gap-1 text-muted-foreground">
        <Menu className="h-6 w-6" />
        <span className="text-[10px] font-bold">More</span>
      </div>
    </div>
  );
};

export default BottomNav;
