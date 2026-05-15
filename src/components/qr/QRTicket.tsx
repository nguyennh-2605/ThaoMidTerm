import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

interface QRTicketProps {
  qrValue: string;
  paymentMethod: string;
  isActive?: boolean;
}

export default function QRTicket({ qrValue, paymentMethod, isActive = true }: QRTicketProps) {
  return (
    <Card gradient className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary-700 px-6 py-2 rounded-full">
            <p className="text-gray-800 text-sm font-medium">QUÉT MÃ TRÊN XE</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 mx-auto max-w-xs">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(20, 184, 166, 0.3)',
                '0 0 40px rgba(20, 184, 166, 0.6)',
                '0 0 20px rgba(20, 184, 166, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center p-4 rounded-xl"
          >
            <QRCodeSVG
              value={qrValue}
              size={200}
              level="H"
              includeMargin
              imageSettings={{
                src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2314b8a6"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/%3E%3C/svg%3E',
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </motion.div>

          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-gray-900">Mã QR thanh toán</p>
            <p className="text-xs text-gray-500 mt-1">
              Đã liên kết: <span className="font-medium text-primary-600">{paymentMethod}</span>
            </p>
          </div>
        </div>

        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center"
          >
            <p className="text-white text-sm">
              ✓ Vé đang hoạt động
            </p>
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
}
