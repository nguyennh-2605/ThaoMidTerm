import { motion } from 'framer-motion';
import { MapPin, Circle } from 'lucide-react';
import type { BusStop } from '../../types/index';

interface StopSelectorProps {
  stops: BusStop[];
  selectedStopId: string | null;
  currentStopId: string | null;
  onSelectStop: (stopId: string) => void;
}

export default function StopSelector({
  stops,
  selectedStopId,
  currentStopId,
  onSelectStop,
}: StopSelectorProps) {
  return (
    <div className="space-y-2">
      {stops.map((stop, index) => {
        const isSelected = selectedStopId === stop.id;
        const isCurrent = currentStopId === stop.id;
        const fare = (index + 1) * 2000 + (index > 1 ? (index - 1) * 1000 : 0);

        return (
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
              isSelected
                ? 'bg-primary-100 border-2 border-primary-600'
                : 'bg-white border-2 border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => onSelectStop(stop.id)}
          >
            <div className="flex-shrink-0">
              {isCurrent ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <Circle className="w-3 h-3 text-white fill-white" />}
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className={`font-medium ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                Trạm {index + 1}: {stop.name}
              </p>
            </div>

            <div className="text-right">
              <p className={`font-bold ${isSelected ? 'text-primary-600' : 'text-gray-900'}`}>
                {fare.toLocaleString('vi-VN')} VNĐ
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
