import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RatingModal from '../components/support/RatingModal';

// Import Leaflet
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { type LatLngTuple } from 'leaflet';

import driver from '../assets/drive.jpg';

// Thiết lập Icon xe buýt cho bản đồ
const busIcon = new L.DivIcon({
  className: 'custom-bus',
  html: `<div style="background-color: #2a9d8f; border: 2px solid white; border-radius: 8px; padding: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-3.6c.1-.9-.7-1.4-1.4-1.4H3.6c-.7 0-1.5.5-1.4 1.4.3 1.9.8 3.6.8 3.6h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="17" cy="18" r="2"/></svg>
         </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

const routePath: LatLngTuple[] = [
  [21.0245, 105.8011],
  [21.0255, 105.8080],
  [21.0280, 105.8150],
  [21.0333, 105.8200]
];

export default function LiveTracking() {
  const navigate = useNavigate();
  const [timeToNextStop] = useState(2);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const [busLocation, setBusLocation] = useState<LatLngTuple>(routePath[0]);

  useEffect(() => {
    let currentSegment = 0;
    let progress = 0;     
    const speed = 0.003;   
    let lastIsNear = false; // Biến cục bộ để kiểm soát việc bật modal 1 lần duy nhất

    const animateBus = () => {
      if (currentSegment >= routePath.length - 1) {
        currentSegment = 0;
        progress = 0;
      }

      const startPoint = routePath[currentSegment];
      const endPoint = routePath[currentSegment + 1];

      const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * progress;
      const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * progress;

      setBusLocation([lat, lng] as LatLngTuple);

      progress += speed;

      // Kích hoạt khi xe đang ở đoạn đường cuối cùng và đi được > 20%
      const currentlyNear = currentSegment === routePath.length - 2 && progress > 0.2;
      
      // Nếu trạng thái thay đổi từ false -> true (vừa mới đi vào vùng đích)
      if (currentlyNear !== lastIsNear) {
        lastIsNear = currentlyNear;
        if (currentlyNear) {
          setShowRatingModal(true); // Bật thẳng popup modal lên
        }
      }

      if (progress >= 1) {
        progress = 0;
        currentSegment++;
      }

      animationId = requestAnimationFrame(animateBus);
    };

    let animationId = requestAnimationFrame(animateBus);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <Layout showBottomNav={false}>
      {/* Container chính: Flex cột, không cho cuộn toàn trang */}
      <div className="h-screen flex flex-col bg-white overflow-hidden relative">
        
        {/* === PHẦN NỬA TRÊN: HEADER & THÔNG TIN (Tối đa 45% chiều cao) === */}
        <div className="flex-none flex flex-col max-h-[48vh] z-10 shadow-sm bg-white">
          
          {/* Header */}
          <div className="bg-white px-4 py-3 flex items-center gap-3 shrink-0">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <h1 className="text-[15px] font-black text-gray-800 tracking-tight">
              HÀNH TRÌNH ĐANG DIỄN RA
            </h1>
          </div>

          {/* Info Section (Cuộn được nếu màn hình quá ngắn) */}
          <div className="px-4 pb-4 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar">
            {/* ETA Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#69c6ab] to-[#46a18d] rounded-xl sm:rounded-[20px] p-3 sm:p-4 flex flex-col items-center shadow-sm shrink-0"
            >
              <div className="bg-[#3b877a] text-white px-5 py-1 rounded-lg text-[10px] font-bold mb-1 shadow-inner">
                TỚI TRẠM TIẾP THEO:
              </div>
              <div className="text-[28px] sm:text-[34px] font-bold text-white leading-tight mt-1">
                {timeToNextStop} Phút
              </div>
            </motion.div>

            {/* Driver Card */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#69c6ab] rounded-xl sm:rounded-[20px] p-3 sm:p-4 pt-7 sm:pt-8 relative shadow-sm shrink-0"
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#3b877a] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold w-max shadow-sm whitespace-nowrap">
                THÔNG TIN CHUYẾN ĐI & TÀI XẾ
              </div>
              
              <div className="flex gap-2.5 sm:gap-3">
                {/* Ảnh tài xế (Responsive width) */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-1 w-[80px] sm:w-[100px] shrink-0 shadow-sm flex flex-col">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden">
                    <img 
                      src={driver}
                      alt="Driver" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-center py-1.5 text-gray-800 leading-tight">
                    Nguyễn Văn Nam
                  </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 justify-center">
                  <div className="bg-white/95 rounded-lg sm:rounded-xl p-2 sm:p-2.5 shadow-sm">
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold">Biển số xe:</span>
                       <span className="text-[12px] sm:text-[13px] font-bold text-gray-900">29B-456.78</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/95 rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase">Hotline Tài xế:</p>
                        <p className="text-[10px] sm:text-[11px] font-bold text-gray-800">1900 1296</p>
                      </div>
                    </div>
                    <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-teal-500 flex items-center justify-center shrink-0 active:bg-teal-50 transition-colors">
                      <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* === PHẦN NỬA DƯỚI: MAP VÀ CONTROLS CHUẨN 50% === */}
        <div className="flex-1 relative z-0 bg-gray-100">
          {/* Lộ trình Badge */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-[#2a6d61] text-white px-4 py-1.5 rounded-full text-[11px] font-bold shadow-lg whitespace-nowrap border border-white/20">
            Lộ trình tuyến 08
          </div>

          <MapContainer 
            center={busLocation} 
            zoom={14} 
            zoomControl={false} 
            className="w-full h-full absolute inset-0"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            <Polyline positions={routePath} color="#14b8a6" weight={5} opacity={0.8} />
            
            <Marker position={busLocation} icon={busIcon} />
            
            <Marker position={routePath[routePath.length - 1]} icon={new L.Icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
              iconSize: [28, 28]
            })} />
          </MapContainer>

          {/* Floating Footer Controls */}
          <div className="absolute bottom-6 sm:bottom-8 left-4 right-4 z-[1000] flex flex-col gap-2">
            
            {/* Nút tracking nhỏ */}
            <div className="bg-[#2a6d61] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-md w-max shadow-md self-start">
              Theo dõi thời gian thực
            </div>

            {/* Progress Bar Box */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] sm:text-xs font-bold text-gray-700">Trạm đã qua: 6 | Còn 4 trạm</p>
                <button 
                  onClick={() => setShowRatingModal(true)}
                  className="bg-[#2a6d61] text-white px-2.5 py-1.5 rounded-md text-[9px] sm:text-[10px] font-bold active:scale-95 transition-transform"
                >
                  BÁO XUỐNG
                </button>
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '33%' }}
                  className="h-full bg-[#2a6d61]"
                />
              </div>
            </div>
            
          </div>
        </div>

        {/* Rating Modal */}
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          driverName="Nguyễn Văn Nam"
          onSubmit={(r) => console.log(r)}
        />
      </div>
      
      {/* CSS ẩn thanh cuộn cho khu vực Info nhưng vẫn vuốt được */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </Layout>
  );
}