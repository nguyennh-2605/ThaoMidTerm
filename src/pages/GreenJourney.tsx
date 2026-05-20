import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Bus, Info, Shield, ChevronRight, Bot, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useGamification } from '../hooks/useGamification';
import { useState } from 'react';
import Fireworks from '../components/common/Fireworks';
import busImage from '../assets/bus.webp';

// Dữ liệu lịch sử hành trình cập nhật chính xác theo ảnh bài đăng
const journeyHistory = [
  { date: '16/05/2024', label: 'Hôm nay', distance: '6.2 km', co2: '+2.1 kg CO₂' },
  { date: '14/05/2024', label: '14/05/2024', distance: '4.8 km', co2: '+1.6 kg CO₂' },
  { date: '13/05/2024', label: '13/05/2024', distance: '7.1 km', co2: '+2.4 kg CO₂' },
  { date: '12/05/2024', label: '12/05/2024', distance: '5.3 km', co2: '+1.8 kg CO₂' },
];

export default function GreenJourney() {
  const navigate = useNavigate();
  const { state } = useGamification();
  const [showFireworks, setShowFireworks] = useState(false);
  const [currentBadge, setCurrentBadge] = useState<'benbi' | 'xuatsac'>('benbi');
  const [hasClaimed, setHasClaimed] = useState(false);

  // Determine badge state
  const isBadgeUnlocked = state.hasCompletedFeedback && state.totalDistance >= 50;
  const canClaimBadge = isBadgeUnlocked && !hasClaimed;

  const handleClaimBadge = () => {
    if (!canClaimBadge) return;

    // Mark as claimed
    setHasClaimed(true);

    // Show fireworks
    setShowFireworks(true);

    // After 5 seconds, switch to next badge
    setTimeout(() => {
      setShowFireworks(false);
      setCurrentBadge('xuatsac');
    }, 5000);
  };

  return (
    <Layout showBottomNav={false}>
      <div className="min-h-screen bg-gray-50 pb-8">

        {/* Header ứng dụng */}
        <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800 flex items-center gap-1.5">
            Hành trình xanh <Leaf className="w-4.5 h-4.5 text-green-600 fill-green-600/10" />
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-4 mt-4 space-y-5">

          {/* 1. Card Tổng quãng đường & 3 Chỉ số chính */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
          >
            <p className="text-[11px] text-gray-600 font-medium mb-1">Tổng quãng đường của bạn</p>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-extrabold text-teal-600 tracking-tight mb-1">
                  {state.totalDistance} <span className="text-lg font-semibold">km</span>
                </h2>
                <p className="text-[11px] text-gray-600">Cùng bạn kiến tạo đô thị xanh!</p>
              </div>

              {/* Minh họa đồ họa lộ trình */}
              <div className="w-28 h-16 rounded-xl overflow-hidden border border-teal-100/70 shadow-inner relative">
                <img
                  src={busImage}
                  alt="Bus illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Grid 3 cột chỉ số môi trường */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-300 text-center">
              <div className="flex flex-col items-center">
                <div className="text-xl mb-0.5">🌱</div>
                <span className="text-[9px] text-gray-600 font-medium">CO₂ đã giảm</span>
                <span className="text-sm font-bold text-gray-800 mt-0.5">{state.co2Reduced} <span className="text-[10px] font-normal text-gray-500">kg</span></span>
              </div>
              <div className="flex flex-col items-center border-x border-gray-300">
                <div className="text-xl mb-0.5">💰</div>
                <span className="text-[9px] text-gray-600 font-medium">Tiết kiệm được</span>
                <span className="text-sm font-bold text-gray-800 mt-0.5">{state.moneySaved.toLocaleString()} <span className="text-[10px] font-normal text-gray-500">đ</span></span>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl mb-0.5">🚌</div>
                <span className="text-[9px] text-gray-600 font-medium">Số chuyến đi</span>
                <span className="text-sm font-bold text-gray-800 mt-0.5">{state.tripCount} <span className="text-[10px] font-normal text-gray-500">chuyến</span></span>
              </div>
            </div>
          </motion.div>

          {/* 2. Khối Tiến độ tuần này */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2.5">
              <h3 className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Tiến độ tuần này</h3>
              <span className="text-sm font-bold text-teal-600">{state.totalDistance} <span className="text-[11px] text-gray-400 font-normal">/ 50 km</span></span>
            </div>

            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(state.totalDistance / 50) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-teal-600 rounded-full"
              />
            </div>

            <p className="text-[11px] text-gray-500">
              Bạn đã hoàn thành <span className="font-bold text-teal-600">{Math.round((state.totalDistance / 50) * 100)}%</span> mục tiêu tuần
            </p>
          </motion.div>

          {/* 3. Khối MỐC TIẾP THEO (Giao diện mới thay thế phần Huy hiệu cũ) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100"
          >
            <h3 className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-3">Mốc tiếp theo</h3>

            <div className="flex items-start gap-4 mb-4">
              {/* Vùng thiết kế Huy hiệu dạng vòng tròn kép đặc trưng */}
              {currentBadge === 'benbi' ? (
                <div className="w-14 h-14 rounded-full bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-yellow-500 flex items-center justify-center shadow-inner">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-purple-600 flex items-center justify-center shadow-inner">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold text-gray-800">
                    {currentBadge === 'benbi' ? 'Huy hiệu Bền bỉ' : 'Huy hiệu Xuất sắc'}
                  </h4>
                  <span className="text-sm font-bold text-teal-600">
                    {currentBadge === 'benbi' ? '50 km' : '100 km'}
                  </span>
                </div>

                {/* Thanh tiến trình */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all duration-500"
                    style={{
                      width: currentBadge === 'benbi'
                        ? `${(state.totalDistance / 50) * 100}%`
                        : `${(state.totalDistance / 100) * 100}%`
                    }}
                  ></div>
                </div>

                <p className="text-[11px] text-gray-500 font-medium">
                  {currentBadge === 'benbi'
                    ? (isBadgeUnlocked ? 'Bạn đã vượt mốc này! 🎉' : `${state.totalDistance} / 50 km`)
                    : `${state.totalDistance} / 100 km`
                  }
                </p>
              </div>
            </div>

            {/* Nút hành động Nhận huy hiệu */}
            <div className="flex justify-center">
              <motion.button
                whileTap={canClaimBadge ? { scale: 0.97 } : {}}
                onClick={handleClaimBadge}
                disabled={!canClaimBadge}
                className={`text-xs font-bold px-8 py-2.5 rounded-full shadow-sm transition-colors ${
                  canClaimBadge
                    ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Nhận huy hiệu
              </motion.button>
            </div>
          </motion.div>

          {/* 4. Khối Lịch sử hành trình */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Lịch sử hành trình</h3>
              <button className="text-[11px] text-teal-600 font-semibold flex items-center gap-0.5">
                Xem tất cả <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-gray-50">
              {journeyHistory.map((journey, index) => (
                <div key={index} className="flex items-center justify-between py-3 first:pt-1 last:pb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                      <Bus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">{journey.label}</p>
                      <p className="text-xs font-bold text-gray-700">{journey.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-gray-800 flex items-center justify-end gap-1 mb-0.5">
                      <Bus className="w-3 h-3 text-gray-400" /> {journey.distance}
                    </p>
                    <span className="text-[10px] text-green-600 bg-green-50 font-bold px-2 py-0.5 rounded-full">
                      {journey.co2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. Khối Khuyến khích từ AI Chatbot dưới cùng */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white border border-gray-100 rounded-[20px] p-3.5 shadow-sm flex items-center gap-3.5"
          >
            {/* Avatar Robot với animation */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-10 h-10 bg-teal-50 border border-teal-200 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Bot className="w-5 h-5 text-teal-600" />
            </motion.div>
            <div className="leading-tight">
              <p className="text-gray-800 text-xs font-bold mb-0.5">Tuyệt vời! Bạn đang góp phần xây dựng</p>
              <p className="text-gray-500 text-[11px]">một tương lai xanh hơn mỗi ngày 💚</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Fireworks effect */}
      {showFireworks && <Fireworks />}
    </Layout>
  );
}