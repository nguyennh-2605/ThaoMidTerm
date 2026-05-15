import { motion } from 'framer-motion';

interface FareCalculatorProps {
  fare: number;
  paymentMethod: string;
}

export default function FareCalculator({ fare, paymentMethod }: FareCalculatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="text-center mb-4">
        <motion.p
          key={fare}
          initial={{ scale: 1.2, color: '#14b8a6' }}
          animate={{ scale: 1, color: '#111827' }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold"
        >
          TỔNG TIỀN: {fare.toLocaleString('vi-VN')} VNĐ
        </motion.p>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <span>Phương thức:</span>
        <span className="font-medium text-primary-600">{paymentMethod} (tài khoản đã liên kết)</span>
      </div>
    </motion.div>
  );
}
