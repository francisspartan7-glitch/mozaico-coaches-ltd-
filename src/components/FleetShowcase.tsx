import React from 'react';
import { Wifi, Coffee, Zap, ShieldCheck, ThermometerSnowflake } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const fleetImages = [
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/attachments/8c45be37-8e81-4fa8-b9b8-ade180984531/1781739569614_images__9_.jpeg',
    title: 'Modern Fleet',
    desc: 'State-of-the-art coaches'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/attachments/8c45be37-8e81-4fa8-b9b8-ade180984531/1781739569613_images__8_.jpeg',
    title: 'Premium Routes',
    desc: 'Connecting major cities'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/attachments/8c45be37-8e81-4fa8-b9b8-ade180984531/1781739569615_images__7_.jpeg',
    title: 'Safe Travel',
    desc: 'Certified safety standards'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/attachments/8c45be37-8e81-4fa8-b9b8-ade180984531/1781739569616_images__2_.jpeg',
    title: 'Mozaico Comfort',
    desc: 'Experience the difference'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/attachments/8c45be37-8e81-4fa8-b9b8-ade180984531/1781739569616_images__1_.jpeg',
    title: 'Executive Style',
    desc: 'Arrive in style'
  }
];

const features = [
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Zap, label: 'Power Ports' },
  { icon: Coffee, label: 'Refreshments' },
  { icon: ThermometerSnowflake, label: 'Full A/C' },
  { icon: ShieldCheck, label: 'Safe & Secure' }
];

const FleetShowcase: React.FC = () => {
  return (
    <div className="py-2">
      <div className="flex justify-between items-end px-4 mb-4">
        <div>
          <h2 className="text-lg font-black text-primary uppercase tracking-tight">Why Choose Mozaico?</h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Travel in unparalleled comfort</p>
        </div>
        <Badge variant="outline" className="text-[10px] font-bold border-accent text-accent">5+ Features</Badge>
      </div>

      {/* Image Carousel */}
      <div className="flex gap-4 overflow-x-auto px-4 pb-6 scrollbar-hide snap-x">
        {fleetImages.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-64 snap-center"
          >
            <Card className="overflow-hidden border-none shadow-lg rounded-[1.5rem] relative group">
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <p className="text-white font-black text-sm uppercase tracking-tighter">{item.title}</p>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">{item.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="px-4 mb-2">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 border-l-2 border-accent pl-2">
          Onboard Experience
        </h3>
      </div>
      
      <div className="px-4 grid grid-cols-5 gap-2">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/5 hover:bg-primary hover:text-white transition-all cursor-default group">
              <f.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[8px] font-black text-muted-foreground uppercase text-center leading-tight">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetShowcase;
