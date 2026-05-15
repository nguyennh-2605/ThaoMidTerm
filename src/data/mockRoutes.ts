import type { BusRoute } from '../types/index';
import { mockStops } from './mockStops';

export const mockRoutes: BusRoute[] = [
  {
    id: 'route-9',
    number: '9',
    name: 'Tuyến số 9: Trạm tiếp theo',
    stops: mockStops.slice(0, 6),
    color: '#14b8a6',
  },
  {
    id: 'route-27',
    number: '27',
    name: 'Lộ trình tuyến 27',
    stops: mockStops,
    color: '#0d9488',
  },
  {
    id: 'route-14',
    number: '14',
    name: 'Tuyến 14: Bến xe Mỹ Đình - Bệnh viện Bạch Mai',
    stops: mockStops.slice(2, 8),
    color: '#2dd4bf',
  },
];

export const getFareByDistance = (startIndex: number, endIndex: number): number => {
  const distance = Math.abs(endIndex - startIndex);
  if (distance === 0) return 0;
  if (distance === 1) return 2000;
  if (distance === 2) return 3000;
  if (distance === 3) return 9000;
  return 9000 + (distance - 3) * 2000;
};
