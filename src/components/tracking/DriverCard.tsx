import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import type { Driver } from '../../types/index';
import Card from '../common/Card';

interface DriverCardProps {
  driver: Driver;
  vehicleId: string;
}

export default function DriverCard({ driver, vehicleId }: DriverCardProps) {
  return (
    <Card className="bg-gradient-to-br from-primary-400 to-primary-600 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-center font-bold text-lg">THÔNG TIN CHUYẾN ĐI & TÀI XẾ</h3>

        <div className="flex items-center gap-4">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={driver.photo}
            alt={driver.name}
            className="w-24 h-24 rounded-2xl object-cover shadow-lg"
          />

          <div className="flex-1 space-y-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs opacity-90">Tài xế:</p>
              <p className="font-bold text-lg">{driver.name}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs opacity-90">Biển số xe:</p>
              <p className="font-bold text-lg">{vehicleId}</p>
            </div>
          </div>
        </div>

        <motion.a
          href={`tel:${driver.phone}`}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            <div>
              <p className="text-xs opacity-90">Hotline Tài xế:</p>
              <p className="font-bold">{driver.phone}</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
        </motion.a>
      </motion.div>
    </Card>
  );
}
