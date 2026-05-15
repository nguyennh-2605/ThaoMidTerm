export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
}

export interface BusRoute {
  id: string;
  number: string;
  name: string;
  stops: BusStop[];
  color: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  photo: string;
  rating: number;
}

export interface Bus {
  id: string;
  vehicleId: string;
  routeId: string;
  driverId: string;
  currentStopIndex: number;
  lat: number;
  lng: number;
  status: 'active' | 'inactive';
}

export interface Ticket {
  id: string;
  qrCode: string;
  routeId: string;
  boardingStop: string;
  destinationStop: string;
  fare: number;
  status: 'active' | 'used' | 'expired';
  createdAt: Date;
  validUntil: Date;
  paymentMethod: string;
}

export interface PaymentMethod {
  id: string;
  type: 'bank' | 'momo' | 'card';
  name: string;
  accountNumber?: string;
  isLinked: boolean;
  icon: string;
}

export interface Trip {
  id: string;
  routeId: string;
  busId: string;
  boardingStop: string;
  destinationStop: string;
  startTime: Date;
  estimatedArrival: Date;
  status: 'ongoing' | 'completed';
  fare: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: Date;
  read: boolean;
}

export interface Rating {
  tripRating: number;
  driverRating: number;
  feedback: string;
  tags: string[];
}
