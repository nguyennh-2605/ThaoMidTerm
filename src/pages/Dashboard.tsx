import { motion } from 'framer-motion';
import { Search, CreditCard, Route, MapPin, ThumbsUp, ClipboardEdit, Ticket, Bus, ArrowRight, ScanLine } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import thaprua from '../assets/thaprua.webp';
import '../styles/BusMapTheme.css';

// Cập nhật màu và layout cho Quick Actions (Icon riêng, Text bên dưới)
const quickActions = [
  { icon: CreditCard, label: 'Quản lý Thẻ\n& QR', path: '/qr-ticket', color: 'bg-teal-500' },
  { icon: Route, label: 'Tìm đường', path: '/payment', color: 'bg-yellow-500' },
  { icon: MapPin, label: 'Trạm xung\nquanh', path: '/live-tracking', color: 'bg-indigo-500' },
  { icon: ThumbsUp, label: 'Góp ý', path: '/support', color: 'bg-orange-500' },
];

// Cập nhật Smart Features (Icon tròn, Text bên dưới)
const smartFeatures = [
  { icon: ClipboardEdit, title: 'Khảo sát\nhành khách', bg: 'bg-pink-100', color: 'text-pink-500' },
  { icon: Ticket, title: 'Đăng ký thẻ\nxe bus', bg: 'bg-teal-100', color: 'text-teal-600' },
  { icon: MapPin, title: 'Tìm xe buýt', bg: 'bg-green-100', color: 'text-green-500' },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-20">
        
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
              THAONGU
            </div>
          </div>

          <div className="absolute bottom-10 right-4 z-10"> 
            <a 
              href="tel:69696969696" 
              className="flex items-center gap-1 text-[11px] text-white border border-white/40 rounded-full px-3 py-1.5 backdrop-blur-md bg-black/30 shadow-sm"
            >
              📞 69696969696
            </a>
          </div>
        </div>

        {/* Search Bar - Kéo trùm lên phần background */}
        <div className="px-4 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl shadow-md flex items-center px-4 py-3">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm địa điểm"
              className="ml-3 flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="px-4 mt-6 space-y-6">
          
          {/* QR Ticket Card - Giao diện giống ảnh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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

          {/* Quick Actions - Thay đổi layout text nằm ngoài block màu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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

          {/* Smart Features - Đổi thành hàng ngang (flex row) giống ảnh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
            transition={{ delay: 0.4 }}
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
                  PHÓNG MIỀN NAM<br/>G NHẤT ĐẤT NƯỚC
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
      </div>
    </Layout>
  );
}