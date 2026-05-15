import type { Bus } from '../types/index';

export const mockBuses: Bus[] = [
  {
    id: 'bus-1',
    vehicleId: '29B-456.78',
    routeId: 'route-27',
    driverId: 'driver-1',
    currentStopIndex: 6,
    lat: 21.0245,
    lng: 105.8412,
    status: 'active',
  },
  {
    id: 'bus-2',
    vehicleId: '30A-123.45',
    routeId: 'route-9',
    driverId: 'driver-2',
    currentStopIndex: 3,
    lat: 21.0333,
    lng: 105.7942,
    status: 'active',
  },
  {
    id: 'bus-3',
    vehicleId: '29C-789.01',
    routeId: 'route-14',
    driverId: 'driver-3',
    currentStopIndex: 2,
    lat: 21.0278,
    lng: 105.7845,
    status: 'active',
  },
];
