import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, MapPin, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';

const mockStops = [
  { id: 's0', name: 'Cổng ĐH Giao thông' },
  { id: 's1', name: 'Ngã tư Trần Duy Hưng', price: 9000 },
  { id: 's2', name: 'BigC Thăng Long', price: 9000 },
  { id: 's3', name: 'Cầu Giấy', price: 9000 },
  { id: 's4', name: 'Đạp Thú', price: 9000 }, 
  { id: 's5', name: 'Trạm 5: Nhổn', price: 9000 }, 
];

// Component Hộp thoại Thanh toán MoMo Giả lập (Đã thiết kế Responsive)
function MomoPaymentModal({ isOpen, onClose, onConfirm, fare, stopName }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fare: number;
  stopName: string;
}) {
  const [pin, setPin] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Đã sửa: Cho phép cuộn toàn màn hình khi modal quá dài (VD: khi mở bàn phím)
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
        >
          <div className="min-h-full flex items-center justify-center p-4 py-16">
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              // Đã sửa: Responsive width và padding
              className="bg-white rounded-[28px] sm:rounded-[32px] px-4 sm:px-6 pb-6 pt-12 w-[95%] sm:w-full max-w-[360px] shadow-2xl relative mt-4"
            >
              {/* Logo nổi lên trên viền modal */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-gray-50 z-10">
                <img 
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png" 
                  alt="MoMo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain" 
                />
              </div>

              <h2 className="text-[16px] sm:text-[18px] font-black text-gray-900 mb-5 text-center uppercase tracking-wide">
                THANH TOÁN CHUYẾN ĐI
              </h2>

              {/* Chi tiết Giao dịch */}
              <div className="bg-[#f9fafb] p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-5">
                  <div className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[13px]">
                      <div>
                          <div className="text-gray-500 mb-0.5">Đối tác:</div>
                          <div className="font-bold text-gray-900 text-[13px] sm:text-[14px]">TRAMOC Hà Nội (BusMap)</div>
                      </div>
                      <div>
                          <div className="text-gray-500 mb-0.5">Mô tả:</div>
                          <div className="font-bold text-gray-900 text-[13px] sm:text-[14px]">Vé xe buýt (Chuyến: {stopName})</div>
                      </div>
                      <div>
                          <div className="text-gray-500 mb-0.5">Số tiền:</div>
                          <div className="font-black text-gray-900 text-[15px] sm:text-[16px]">{fare.toLocaleString('en-US')} VNĐ</div>
                      </div>
                      <div>
                          <div className="text-gray-500 mb-0.5">Tài khoản nguồn:</div>
                          <div className="font-bold text-gray-900 text-[13px] sm:text-[14px]">Vietcombank (Liên kết) - ...1234</div>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2 sm:pb-3">
                          <div className="text-gray-500">Phí giao dịch:</div>
                          <div className="font-bold text-gray-900 text-[13px] sm:text-[14px]">0 VNĐ</div>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                          <div className="font-bold text-gray-900 text-[14px] sm:text-[15px]">Tổng thanh toán:</div>
                          <div className="font-black text-[16px] sm:text-[18px] text-gray-900">{fare.toLocaleString('en-US')} VNĐ</div>
                      </div>
                  </div>
              </div>

              {/* Xác thực PIN với các ô vuông */}
              <div className="mb-5 relative">
                  <h3 className="text-[13px] sm:text-[14px] font-black text-gray-900 mb-3 uppercase text-center">Xác thực giao dịch</h3>
                  
                  {/* Đã sửa: Điều chỉnh kích thước và khoảng cách ô PIN để không bị tràn trên màn nhỏ */}
                  <div className="flex justify-center gap-1.5 sm:gap-2.5 mb-2">
                      {[...Array(6)].map((_, i) => (
                          <div
                              key={i}
                              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all ${
                                  i < pin.length 
                                    ? 'border-[#ea1c70] bg-[#fff0f5]' 
                                    : 'border-gray-200 bg-gray-50'
                              }`}
                          >
                              {i < pin.length && (
                                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#ea1c70] rounded-full" />
                              )}
                          </div>
                      ))}
                  </div>
                  
                  <div className="text-center text-[11px] sm:text-[12px] text-gray-400 mb-4">Nhập mã PIN MoMo</div>

                  {/* Input ẩn để nhận sự kiện phím */}
                  <input
                      type="tel"
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                      className="absolute inset-0 top-8 opacity-0 cursor-text h-12 w-full z-20"
                      autoFocus
                  />

                  {/* Nút Switch Ghi nhớ */}
                  <div className="flex justify-between items-center border border-gray-100 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm">
                      <span className="text-[13px] sm:text-[14px] text-gray-800 font-bold">Ghi nhớ</span>
                      <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-[12px] sm:text-[13px] text-gray-500">Lưu cho lần sau</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="sr-only peer" />
                              <div className="w-10 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-[#ea1c70]"></div>
                          </label>
                      </div>
                  </div>
              </div>

              {/* Nút Hành động */}
              <div className="space-y-2.5 sm:space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if(pin.length === 6) onConfirm();
                  }}
                  className={`w-full bg-[#ff6b9e] text-white font-bold rounded-xl sm:rounded-2xl py-3 sm:py-3.5 text-[14px] sm:text-[15px] shadow-[0_4px_15px_rgba(255,107,158,0.4)] transition-opacity ${
                     pin.length === 6 ? 'opacity-100' : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  XÁC NHẬN THANH TOÁN
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full bg-[#f3f4f6] text-gray-700 font-bold rounded-xl sm:rounded-2xl py-3 sm:py-3.5 text-[14px] sm:text-[15px] hover:bg-gray-200 transition-colors"
                >
                  Hủy bỏ
                </motion.button>
              </div>

              {/* Footer bảo mật */}
              <div className="flex justify-center items-center gap-1.5 text-[10px] sm:text-[11px] text-gray-400 mt-4 sm:mt-5">
                <Lock className="w-3 h-3 text-[#10b981]" />
                <span>Giao dịch bảo mật 100%</span>
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Payment() {
  const navigate = useNavigate();
  const [currentStopId] = useState(mockStops[0].id);
  const [destinationStopId, setDestinationStopId] = useState(mockStops[3].id);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMomoModal, setShowMomoModal] = useState(false);

  const selectedStop = mockStops.find(s => s.id === destinationStopId);
  const fare = selectedStop?.price || 0;

  const confirmMomoPayment = () => {
    setShowMomoModal(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Layout showBottomNav={false}>
      <div className="min-h-screen bg-[#eef7f6] pb-36 relative z-0">
        
        {/* Header Tối giản */}
        <div className="bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 sticky top-0 z-30 shadow-sm">
          <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-[14px] sm:text-[15px] font-bold text-gray-900 tracking-tight">
            THANH TOÁN VÉ XE
          </h1>
        </div>

        {/* Timeline Hành Trình */}
        <div className="px-4 py-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h2 className="text-[16px] sm:text-[17px] font-bold text-gray-900 ml-2">Tuyến số 9: Trạm tiếp theo</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
            <div className="absolute left-[23px] top-8 bottom-10 w-[1.5px] bg-[#b1d5ce]" />
            <div className="flex flex-col gap-1">
              {mockStops.map((stop, index) => {
                const isCurrent = stop.id === currentStopId;
                const isSelected = stop.id === destinationStopId;

                return (
                  <div key={stop.id} className="relative z-10">
                    <motion.div
                      whileTap={!isCurrent ? { scale: 0.98 } : {}}
                      onClick={() => !isCurrent && setDestinationStopId(stop.id)}
                      className={`flex items-center justify-between py-3 px-3 rounded-2xl transition-all duration-300 ${
                        isSelected ? 'bg-[#d8efeb] shadow-[0_2px_10px_rgba(42,157,143,0.1)]' : !isCurrent ? 'cursor-pointer hover:bg-white/40' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1">
                        <div className="w-6 h-6 flex items-center justify-center bg-[#eef7f6] rounded-full shrink-0">
                          {isCurrent ? <MapPin className="w-6 h-6 text-[#1aa081] fill-[#d0eee8]" /> : isSelected ? <div className="w-4 h-4 rounded-full border-[4px] border-[#1aa081] bg-white shadow-sm" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-400 bg-white" />}
                        </div>
                        <span className={`text-[14px] sm:text-[15px] truncate ${isCurrent || isSelected ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                          {isCurrent ? 'Trạm hiện tại: ' : `Trạm ${index}: `} {stop.name}
                        </span>
                      </div>
                      {!isCurrent && (
                        <span className={`font-bold shrink-0 ml-2 ${isSelected ? 'text-gray-900 text-[14px] sm:text-[15px]' : 'text-gray-600 text-[13px] sm:text-[14px]'}`}>
                          {stop.price?.toLocaleString('en-US')} VNĐ
                        </span>
                      )}
                    </motion.div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-11 sm:pl-12 pr-2">
                          <div className="bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 my-2 shadow-sm flex items-center">
                            <span className="text-gray-800 text-[13px] sm:text-[14px]">
                              ĐIỂM ĐẾN: <span className="font-bold">Trạm {index}: {stop.name}</span>
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Footer Xác nhận Thanh toán - Thêm pb-8 để tránh vùng Home Indicator trên iPhone */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#eef7f6] pt-4 pb-8 px-4 z-20">
          <div className="absolute top-[-40px] left-0 right-0 h-[40px] bg-gradient-to-t from-[#eef7f6] to-transparent" />
          <motion.div
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="bg-white p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-3 sm:gap-4 border border-teal-50"
          >
            <div className="flex justify-center items-center">
              <span className="text-[16px] sm:text-lg font-black text-gray-900">
                TỔNG TIỀN: {fare.toLocaleString('en-US')} VNĐ
              </span>
            </div>
            <Button
              onClick={() => setShowMomoModal(true)}
              fullWidth
              size="lg"
              className="bg-[#ea1c70] text-white font-bold rounded-xl sm:rounded-2xl shadow-[0_4px_15px_rgba(234,28,112,0.3)] py-3.5 sm:py-4 text-[14px] sm:text-[15px]"
            >
              XÁC NHẬN VÀ THANH TOÁN
            </Button>
          </motion.div>
        </div>

        {/* Modal MoMo Mới */}
        <MomoPaymentModal
          isOpen={showMomoModal}
          onClose={() => setShowMomoModal(false)}
          onConfirm={confirmMomoPayment}
          fare={fare}
          stopName={selectedStop ? `Trạm ${mockStops.findIndex(s => s.id === destinationStopId)}: ${selectedStop.name}` : ''}
        />

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 mx-5 sm:mx-6 text-center shadow-2xl flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-[#10b981] rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-[0_4px_20px_rgba(16,185,129,0.4)]"
                >
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={4} />
                </motion.div>
                <h3 className="text-[18px] sm:text-[20px] font-black text-gray-900 mb-2">Thanh toán thành công!</h3>
                <p className="text-[13px] sm:text-[14px] text-gray-500">Đang quay về trang chủ...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}