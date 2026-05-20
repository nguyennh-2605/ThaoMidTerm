import { motion } from 'framer-motion';
import {
  Search, CreditCard, Route, MapPin, ThumbsUp, ClipboardEdit, Ticket, Bus,
  ArrowRight, ScanLine, Leaf, ChevronDown, ChevronRight, Shield, Star, Trophy, Award, Bot
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import thaprua from '../assets/thaprua.webp';
import '../styles/BusMapTheme.css';
import { useGamification } from '../hooks/useGamification';
import busImage from "../assets/bus.webp";

// Cập nhật màu và layout cho Quick Actions
const quickActions = [
  { icon: CreditCard, label: 'Quản lý Thẻ\n& QR', path: '/qr-ticket', color: 'bg-teal-500' },
  { icon: Route, label: 'Tìm đường', path: '/payment', color: 'bg-yellow-500' },
  { icon: MapPin, label: 'Trạm xung\nquanh', path: '/live-tracking', color: 'bg-indigo-500' },
  { icon: ThumbsUp, label: 'Góp ý', path: '/support', color: 'bg-orange-500' },
];

// Cập nhật Smart Features
const smartFeatures = [
  { icon: ClipboardEdit, title: 'Khảo sát\nhành khách', bg: 'bg-pink-100', color: 'text-pink-500' },
  { icon: Ticket, title: 'Đăng ký thẻ\nxe bus', bg: 'bg-teal-100', color: 'text-teal-600' },
  { icon: MapPin, title: 'Tìm xe buýt', bg: 'bg-green-100', color: 'text-green-500' },
];

export default function Dashboard() {
  const { state } = useGamification();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-28 relative">
        
        {/* Header với Background Image (Tháp Rùa - Hồ Gươm) */}
        <div 
          className="relative h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${thaprua})` }}
        >
          {/* Lớp phủ mờ nhẹ để nổi bật nội dung */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative z-10 flex items-start justify-between px-4 pt-12">
            {/* Logo BusMap */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Bus className="w-6 h-6 text-teal-500" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white drop-shadow-md">BusMap</h1>
                <span className="bg-white text-teal-600 text-[10px] font-bold px-2 py-0.5 rounded-full w-max mt-0.5 shadow-sm">
                  HÀ NỘI
                </span>
              </div>
            </div>

            {/* Logo TRAMOC & Hotline */}
            <div className="text-cyan-800 font-extrabold text-lg italic tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              NHÓM 4
            </div>
          </div>

          <div className="absolute bottom-10 right-4 z-10"> 
            <a 
              href="tel:69696969696" 
              className="flex items-center gap-1 text-[11px] text-white border border-white/40 rounded-full px-3 py-1.5 backdrop-blur-md bg-black/30 shadow-sm"
            >
              📞 0123456789
            </a>
          </div>
        </div>

        {/* Search Bar - Kéo trùm lên phần background */}
        <div className="px-4 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl shadow-md flex items-center px-4 py-3">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm địa điểm, tuyến xe, điểm dừng..."
              className="ml-3 flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="px-4 mt-6 space-y-5">

          {/* === NEW: TÁC ĐỘNG XANH CỦA BẠN === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[20px] p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[12px] font-bold text-green-700 uppercase flex items-center gap-1.5">
                TÁC ĐỘNG XANH CỦA BẠN <Leaf className="w-3.5 h-3.5" />
              </h2>
              <button className="text-[10px] bg-gray-50 px-2.5 py-1 rounded-full flex items-center text-gray-600 font-medium border border-gray-100">
                Tuần này <ChevronDown className="w-3 h-3 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 divide-x divide-gray-50">
              <div className="flex flex-col gap-1 pr-2">
                <span className="text-[9px] text-gray-600 font-medium">CO₂ đã giảm</span>
                <span className="text-sm font-bold text-teal-600">{state.co2Reduced} <span className="text-[10px] font-normal">kg</span></span>
                <span className="text-[8px] text-gray-500">≈ 3 cây xanh</span>
              </div>
              <div className="flex flex-col gap-1 px-2">
                <span className="text-[9px] text-gray-600 font-medium">Tiết kiệm được</span>
                <span className="text-sm font-bold text-teal-600">{state.moneySaved.toLocaleString()} <span className="text-[10px] font-normal">đ</span></span>
                <span className="text-[8px] text-gray-500">So với đi xe máy</span>
              </div>
              <div className="flex flex-col gap-1 pl-2">
                <span className="text-[9px] text-gray-600 font-medium">Quãng đường đi bus</span>
                <span className="text-sm font-bold text-teal-600">{state.totalDistance} <span className="text-[10px] font-normal">km</span></span>
                <span className="text-[8px] text-gray-500">Giảm tắc đường</span>
              </div>
            </div>
          </motion.div>

          {/* === NEW: HÀNH TRÌNH XANH & HUY HIỆU (GỘP CHUNG 1 KHỐI) === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-[20px] p-4 shadow-sm relative"
          >
            {/* Nút Xem chi tiết ở góc phải */}
            <Link to="/green-journey">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>

            {/* Phần 1: Hành trình xanh */}
            <div className="mb-4">
              <h2 className="text-[12px] font-bold text-teal-700 uppercase mb-3 flex items-center gap-1.5">
                HÀNH TRÌNH XANH <Bus className="w-3.5 h-3.5" />
              </h2>
              
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-[9px] text-gray-600 font-medium mb-0.5">Tổng quãng đường</p>
                  <p className="text-xl font-bold text-teal-600 leading-none mb-1.5">{state.totalDistance} <span className="text-sm font-medium">km</span></p>
                  <p className="text-[9px] text-gray-600">Cùng bạn kiến tạo đô thị xanh!</p>
                </div>
                <div className="w-24 h-16 rounded-xl overflow-hidden border border-teal-100 shadow-inner group">
                  <img
                    src={busImage}
                    alt="Bus"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] mb-1.5 font-medium">
                  <span className="text-teal-700">Tiến độ tuần này</span>
                  <span className="text-teal-600">{state.totalDistance} / 50 km</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(state.totalDistance / 50) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-teal-600 rounded-full"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100 my-4" />

            {/* Phần 2: Huy hiệu xanh */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-bold text-gray-700 uppercase">Huy hiệu xanh của bạn</h3>
              </div>
              
              <div className="flex justify-between px-1">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center border border-green-200 shadow-sm ring-1 ring-black">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-bold text-gray-700">10 km</span>
                  <span className="text-[7px] text-gray-500">Khởi đầu</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200 shadow-sm ring-1 ring-black">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-bold text-gray-700">25 km</span>
                  <span className="text-[7px] text-gray-500">Kiên trì</span>
                </div>
                <div className={`flex flex-col items-center gap-1.5 ${!state.hasCompletedFeedback ? 'opacity-50 grayscale' : ''}`}>
                  <div className={`w-9 h-9 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center border border-yellow-200 shadow-sm ${state.hasCompletedFeedback ? 'ring-1 ring-black' : ''}`}>
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-bold text-gray-700">50 km</span>
                  <span className="text-[7px] text-gray-500">Bền bỉ</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 opacity-50 grayscale">
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center border border-purple-200 shadow-sm">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-bold text-gray-700">100 km</span>
                  <span className="text-[7px] text-gray-500">Xuất sắc</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 opacity-50 grayscale">
                  <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200 shadow-sm">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-bold text-gray-700">200 km</span>
                  <span className="text-[7px] text-gray-500">Vô địch</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QR Ticket Card - Giao diện giống ảnh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/qr-ticket" className="block">
              <div className="busmap-mesh-bg rounded-[24px] p-5 flex flex-col items-center shadow-md relative overflow-hidden">
                {/* Nút quét mã */}
                <button className="bg-teal-700/40 text-white flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
                  <ScanLine className="w-4 h-4" /> NHẤN ĐỂ QUÉT MÃ TRÊN XE
                </button>
                
                {/* Vùng QR */}
                <div className="bg-white p-2 rounded-2xl mb-3 shadow-inner">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=busmap-hanoi" 
                    alt="QR Code" 
                    className="w-24 h-24" 
                  />
                  {/* Icon bus nhỏ ở giữa QR */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                     <Bus className="w-4 h-4 text-teal-500" />
                  </div>
                </div>

                <div className="bg-white text-teal-700 px-4 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">
                  Mã QR thanh toán
                </div>
                
                <p className="text-white text-[11px]">
                  Đã liên kết: <span className="font-bold">Vietcombank</span>
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between px-1">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.path} className="w-1/4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`${action.color} w-[60px] h-[60px] rounded-[20px] flex items-center justify-center text-white shadow-sm`}>
                      <action.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <p className="text-[11px] font-medium text-gray-700 text-center whitespace-pre-line leading-tight">
                      {action.label}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Smart Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Tính năng thông minh</h2>
              <button className="text-[13px] text-teal-600 font-medium flex items-center gap-1">
                Xem tất cả <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex justify-start gap-6 px-1">
              {smartFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div className={`w-[52px] h-[52px] ${feature.bg} rounded-full flex items-center justify-center shadow-sm`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[11px] font-medium text-gray-700 text-center leading-tight whitespace-pre-line">
                    {feature.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* News Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Khám phá tin tức</h2>
              <button className="text-[13px] text-teal-600 font-medium flex items-center gap-1">
                Xem tất cả <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-[20px] h-32 overflow-hidden relative shadow-sm">
                <div className="absolute inset-0 bg-black/30" />
                <p className="absolute bottom-3 left-3 text-white font-bold text-[11px] uppercase tracking-wide">
                  GIẢI PHÓNG MIỀN NAM<br/>THỐNG NHẤT ĐẤT NƯỚC
                </p>
              </div>
              <div 
                className="bg-green-700 rounded-[20px] h-32 overflow-hidden relative shadow-sm bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=300&auto=format&fit=crop')" }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* === FLOATING CHATBOT AI BUS BUDDY === */}
        <Link to="/ai-chat" className="fixed bottom-20 left-0 right-0 flex justify-center z-50 pointer-events-none">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex items-center gap-3 pointer-events-auto cursor-pointer"
          >
            {/* Avatar Robot */}
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shadow-lg border-2 border-teal-500 relative">
              <Bot className="w-7 h-7 text-teal-600" />
              {/* Chấm xanh online */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            {/* Bubble Chat */}
            <div className="bg-white px-3.5 py-2 rounded-xl shadow-lg border border-gray-100 relative">
              <p className="text-[11px] font-bold text-gray-700">
                Nhấn để chat với <span className="text-teal-600">AI Bus Buddy</span>
              </p>
              {/* Mũi tên trỏ về Robot */}
              <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45 transform -translate-y-1/2"></div>
            </div>
          </motion.div>
        </Link>

      </div>
    </Layout>
  );
}