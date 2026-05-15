import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import QRTicket from '../components/qr/QRTicket';
import Card from '../components/common/Card';

const ticketHistory = [
  { id: 1, route: 'Tuyến 27', date: '15/05/2026', fare: '9,000 VNĐ', status: 'Đã sử dụng' },
  { id: 2, route: 'Tuyến 9', date: '14/05/2026', fare: '5,000 VNĐ', status: 'Đã sử dụng' },
  { id: 3, route: 'Tuyến 14', date: '13/05/2026', fare: '7,000 VNĐ', status: 'Đã sử dụng' },
];

export default function QRTicketPage() {
  const navigate = useNavigate();

  return (
    <Layout showBottomNav={false}>
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-gray-900 px-6 py-4 flex items-center gap-4 shadow-lg rounded-b-3xl">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Quản lý Thẻ & QR</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Active QR Ticket */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <QRTicket
              qrValue="BUSMAP-TICKET-2024-001"
              paymentMethod="Vietcombank"
              isActive={true}
            />
          </motion.div>

          {/* Wallet Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Ví & Phương thức thanh toán
            </h2>
            <div className="space-y-3">
              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                    🏦
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Vietcombank</p>
                    <p className="text-sm text-gray-600">****1234</p>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  Đã liên kết
                </div>
              </Card>

              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl">
                    💳
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">MoMo</p>
                    <p className="text-sm text-gray-600">091x.xxx.xxx</p>
                  </div>
                </div>
                <button className="text-primary-600 text-sm font-medium">
                  Liên kết
                </button>
              </Card>
            </div>
          </motion.div>

          {/* Ticket History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <History className="w-5 h-5" />
              Lịch sử vé
            </h2>
            <div className="space-y-3">
              {ticketHistory.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        🎫
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{ticket.route}</p>
                        <p className="text-sm text-gray-600">{ticket.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{ticket.fare}</p>
                      <p className="text-xs text-gray-500">{ticket.status}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
