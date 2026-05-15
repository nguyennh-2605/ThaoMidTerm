import { motion } from 'framer-motion';

interface RouteProgressProps {
  stopsCompleted: number;
  stopsRemaining: number;
  routeName: string;
}

export default function RouteProgress({ stopsCompleted, stopsRemaining, routeName }: RouteProgressProps) {
  const totalStops = stopsCompleted + stopsRemaining;
  const progress = (stopsCompleted / totalStops) * 100;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          {routeName}
        </div>
        <p className="text-sm text-gray-600">
          Theo dõi thời gian thực
        </p>
      </div>

      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Trạm đã qua: <span className="font-bold text-primary-600">{stopsCompleted}</span>
        </span>
        <span className="text-gray-600">
          Còn <span className="font-bold text-orange-600">{stopsRemaining}</span> trạm
        </span>
      </div>
    </div>
  );
}
