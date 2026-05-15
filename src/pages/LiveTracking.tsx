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

      if (progress >= 1) {
        progress = 0;
        currentSegment++;
      }

      animationId = requestAnimationFrame(animateBus);
    };

    // Bắt đầu vòng lặp animation
    let animationId = requestAnimationFrame(animateBus);

    // Cleanup khi rời khỏi trang
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <Layout showBottomNav={false}>
      <div className="h-screen flex flex-col bg-white overflow-hidden">
        
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center gap-4 z-10 shadow-sm">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-[16px] font-black text-gray-800 tracking-tight">
            HÀNH TRÌNH ĐANG DIỄN RA
          </h1>
        </div>

        {/* Info Section (Thẻ thông tin phía trên) */}
        <div className="px-4 py-3 space-y-3 z-10 bg-white">
          {/* ETA Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#69c6ab] to-[#46a18d] rounded-[20px] p-4 flex flex-col items-center shadow-sm"
          >
            <div className="bg-[#3b877a] text-white px-6 py-1 rounded-lg text-[10px] font-bold mb-1 shadow-inner">
              TỚI TRẠM TIẾP THEO:
            </div>
            <div className="text-[34px] font-bold text-white leading-tight">
              {timeToNextStop} Phút
            </div>
          </motion.div>

          {/* Driver Card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#69c6ab] rounded-[20px] p-4 pt-8 relative shadow-sm"
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#3b877a] text-white px-4 py-1.5 rounded-full text-[10px] font-bold w-max shadow-sm">
              THÔNG TIN CHUYẾN ĐI & TÀI XẾ
            </div>
            
            <div className="flex gap-3">
              {/* Ảnh tài xế */}
              <div className="bg-white rounded-2xl p-1 w-[100px] shadow-sm">
                <div className="aspect-[3/4] rounded-xl overflow-hidden">
                  <img 
                    src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/677785080_2477381316039291_5533075402488695679_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Xs6sOSQJX3gQ7kNvwHkz6tg&_nc_oc=AdpKd2QnrOhX2bukaGF8FEpKpxK-bui01UnJIudTc_hz-ls58Y9QC18S0QlN8XO9tkU&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=XzkTbYGm1XZtRWWUQHTQRw&_nc_ss=7b2a8&oh=00_Af7KCbF3byFPHTe-WVrizfGc9TMMdp0L0dlDFFS_Jl3hWg&oe=6A0D13D8" 
                    alt="Driver" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[10px] font-bold text-center py-1.5 text-gray-800">
                  Nguyễn Thanh Thảo
                </div>
              </div>

              {/* Thông tin chi tiết */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="bg-white/95 rounded-xl p-2.5 shadow-sm">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Tài xế:</p>
                  <p className="text-[13px] font-bold text-gray-900">Nguyễn Thanh Thảo</p>
                </div>
                <div className="bg-white/95 rounded-xl p-2.5 shadow-sm">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Biển số xe:</p>
                  <p className="text-[13px] font-bold text-gray-900">29B-456.78</p>
                </div>
                <div className="bg-white/95 rounded-xl p-2 px-3 flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">Hotline Tài xế:</p>
                      <p className="text-[11px] font-bold text-gray-800">091x.xxx.xxx</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full border border-teal-500 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="flex-1 relative z-0">
          {/* Lộ trình Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-[#2a6d61] text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg">
            Lộ trình tuyến 27
          </div>

          <MapContainer 
            center={busLocation} 
            zoom={14} 
            zoomControl={false} 
            className="w-full h-full"
          >
            {/* TileLayer Voyager: Màu pastel giống app BusMap nhất */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            <Polyline positions={routePath} color="#14b8a6" weight={6} opacity={0.7} />
            
            <Marker position={busLocation} icon={busIcon} />
            
            <Marker position={routePath[routePath.length - 1]} icon={new L.Icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
              iconSize: [30, 30]
            })} />
          </MapContainer>

          {/* Floating Footer Controls */}
          <div className="absolute bottom-6 left-4 right-4 z-[1000] space-y-2">
            <div className="bg-[#2a6d61] text-white text-[10px] font-bold px-3 py-1 rounded-md w-max shadow-md">
              Theo dõi thời gian thực
            </div>

            {/* Progress Bar Box */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-gray-700">Trạm đã qua: 6 | Còn 12 trạm</p>
                <button 
                  onClick={() => setShowRatingModal(true)}
                  className="bg-[#2a6d61] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                >
                  GẦN TỚI ĐIỂM XUỐNG
                </button>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '33%' }}
                  className="h-full bg-[#2a6d61]"
                />
              </div>
            </div>

            {/* Main Action Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowRatingModal(true)}
              className="w-full bg-[#2a6d61] text-white py-4 rounded-2xl font-bold text-[14px] shadow-lg"
            >
              GẦN TỚI ĐIỂM XUỐNG
            </motion.button>
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
    </Layout>
  );
}