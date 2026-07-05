export interface Bus {
  id: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  busType: string;
  availableSeats: number;
}

export interface Route {
  from: string;
  to: string;
  buses: Bus[];
}

const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", 
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", 
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nakuru", 
  "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", 
  "Tharaka Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

export const INTERNATIONAL_DESTINATIONS = [
  { name: "Bujumbura", price: "9,500" },
  { name: "Kigali", price: "8,000" },
  { name: "Juba", price: "12,000" },
  { name: "Dar es Salaam", price: "7,500" },
  { name: "Kampala", price: "4,500" }
];

const generateBuses = (basePrice: string): Bus[] => [
  {
    id: Math.random().toString(36).substr(2, 9),
    departure: '06:30 AM',
    arrival: '05:45 PM',
    duration: '11h 15m',
    price: basePrice,
    busType: 'Scania Marcopolo G7 - Executive',
    availableSeats: 12
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    departure: '08:00 AM',
    arrival: '07:30 PM',
    duration: '11h 30m',
    price: (parseInt(basePrice.replace(',', '')) - 300).toLocaleString(),
    busType: 'Classic Coach - Standard',
    availableSeats: 4
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    departure: '08:30 PM',
    arrival: '07:00 AM',
    duration: '10h 30m',
    price: (parseInt(basePrice.replace(',', '')) + 500).toLocaleString(),
    busType: 'Luxury Sleeper - Premium',
    availableSeats: 8
  }
];

const ALL_LOCATIONS_LIST = [
  ...KENYA_COUNTIES,
  ...INTERNATIONAL_DESTINATIONS.map(d => d.name)
];

// Pre-define some common routes, others will be generated dynamically in getRouteBuses
export const routes: Route[] = [
  ...INTERNATIONAL_DESTINATIONS.flatMap(dest => [
    {
      from: "Nairobi",
      to: dest.name,
      buses: generateBuses(dest.price)
    },
    {
      from: dest.name,
      to: "Nairobi",
      buses: generateBuses(dest.price)
    }
  ]),
  ...KENYA_COUNTIES.filter(c => c !== "Nairobi").flatMap(county => [
    {
      from: "Nairobi",
      to: county,
      buses: generateBuses("2,200")
    },
    {
      from: county,
      to: "Nairobi",
      buses: generateBuses("2,200")
    }
  ]),
  {
    from: "Mombasa",
    to: "Kisumu",
    buses: generateBuses("2,800")
  }
];

const ALL_LOCATIONS = Array.from(new Set(ALL_LOCATIONS_LIST)).sort();

export const getLocations = () => ALL_LOCATIONS;

export const getRouteBuses = (from: string, to: string) => {
  const route = routes.find(r => 
    r.from.toLowerCase() === from.toLowerCase() && 
    r.to.toLowerCase() === to.toLowerCase()
  );
  
  if (route) return route.buses;

  // For any-to-any: if no specific route found, return dynamic buses
  // Check if both locations exist in our master list to be safe
  const fromExists = ALL_LOCATIONS.some(l => l.toLowerCase() === from.toLowerCase());
  const toExists = ALL_LOCATIONS.some(l => l.toLowerCase() === to.toLowerCase());

  if (fromExists && toExists) {
    return generateBuses("2,500");
  }

  return [];
};
