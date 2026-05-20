import { motion } from 'framer-motion';
import { RotateCcw, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useGamification } from '../hooks/useGamification';

export default function Profile() {
  const { resetState } = useGamification();

  const handleReset = () => {
    if (confirm('Bạn có chắc chắn muốn reset tất cả dữ liệu về trạng thái ban đầu?')) {
      resetState();
      alert('Đã reset thành công! Tất cả dữ liệu đã về trạng thái ban đầu.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 px-6 py-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Người dùng</h1>
              <p className="text-teal-100 text-sm">BusMap Member</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-6 space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-800">Cài đặt</span>
            </div>
            <span className="text-gray-400">›</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-800">Trợ giúp</span>
            </div>
            <span className="text-gray-400">›</span>
          </motion.button>

          {/* Reset Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="w-full bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <span className="font-bold text-orange-800 block">Reset dữ liệu Demo</span>
                <span className="text-xs text-orange-600">Đưa tất cả về trạng thái ban đầu</span>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-medium text-red-600">Đăng xuất</span>
            </div>
            <span className="text-gray-400">›</span>
          </motion.button>
        </div>

        {/* App Info */}
        <div className="px-6 py-4 text-center">
          <p className="text-xs text-gray-400 mt-1">Nhóm 4</p>
        </div>
      </div>
    </Layout>
  );
}
