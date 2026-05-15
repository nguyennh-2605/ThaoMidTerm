import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, X, Check, AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
  onSubmit: (rating: { tripRating: number; driverRating: number; feedback: string; tags: string[] }) => void;
}

export default function RatingModal({ isOpen, onClose, driverName, onSubmit }: RatingModalProps) {
  const [tripRating, setTripRating] = useState(0);
  const [driverRating, setDriverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tripTags = ['Đúng giờ', 'Sạch sẽ', 'Thoải mái'];
  const driverTags = ['Thân thiện', 'Lái an toàn', 'Vui vẻ'];

  const handleSubmit = () => {
    onSubmit({ tripRating, driverRating, feedback, tags: selectedTags });
    onClose();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Component tái sử dụng cho nút Checkbox
  const CustomCheckbox = ({ tag }: { tag: string }) => {
    const isChecked = selectedTags.includes(tag);
    return (
      <button
        onClick={() => toggleTag(tag)}
        className="flex items-center gap-1.5 focus:outline-none"
      >
        <div 
          className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-colors ${
            isChecked ? 'bg-[#2a6d61] border-[#2a6d61]' : 'border-gray-400 bg-white'
          }`}
        >
          {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>
        <span className="text-[14px] text-gray-700">{tag}</span>
      </button>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        {/* Header có nút X giống ảnh */}
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-black text-gray-900 tracking-tight">GẦN TỚI NƠI RỒI!</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-3 flex items-start gap-3 shadow-sm">
          <div className="text-3xl mt-0.5">🙎‍♂️</div> {/* Thay bằng icon người có balo hoặc giữ emoji */}
          <p className="text-[14px] text-gray-700 leading-tight">
            Quý khách vui lòng <span className="font-bold text-black">check lại đồ đạc cá nhân</span> (ví, điện thoại...) trước khi xuống.
          </p>
        </div>

        {/* ĐÁNH GIÁ CHUYẾN ĐI */}
        <div className="pt-2">
          <h3 className="font-black text-[15px] text-gray-900 mb-2 uppercase">Đánh giá chuyến đi</h3>
          <p className="text-[14px] text-gray-800 text-center mb-3 font-medium">Chuyến đi này như thế nào?</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={`trip-${star}`}
                whileTap={{ scale: 0.8 }}
                onClick={() => setTripRating(star)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    star <= tripRating
                      ? 'fill-[#d4b78f] text-[#d4b78f]'
                      : 'fill-[#e5e7eb] text-[#e5e7eb]'
                  }`}
                />
              </motion.button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {tripTags.map((tag) => <CustomCheckbox key={tag} tag={tag} />)}
          </div>
        </div>

        {/* Đường gạch ngang mờ */}
        <hr className="border-gray-100" />

        {/* ĐÁNH GIÁ TÀI XẾ */}
        <div>
          <h3 className="font-black text-[15px] text-gray-900 mb-2 uppercase">Đánh giá tài xế</h3>
          <p className="text-[15px] font-bold text-gray-900 text-center">{driverName}</p>
          <p className="text-[14px] text-gray-700 text-center mb-3">Cảm nhận của bạn về tài xế?</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={`driver-${star}`}
                whileTap={{ scale: 0.8 }}
                onClick={() => setDriverRating(star)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    star <= driverRating
                      ? 'fill-[#d4b78f] text-[#d4b78f]'
                      : 'fill-[#e5e7eb] text-[#e5e7eb]'
                  }`}
                />
              </motion.button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {driverTags.map((tag) => <CustomCheckbox key={tag} tag={tag} />)}
          </div>
        </div>

        {/* Đường gạch ngang mờ */}
        <hr className="border-gray-100" />

        {/* BÁO CÁO VẤN ĐỀ */}
        <div>
          <h3 className="font-black text-[15px] text-gray-900 mb-2 uppercase">Báo cáo vấn đề</h3>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 fill-orange-100" />
            <p className="text-[14px] font-medium text-gray-800">Báo cáo vấn đề (nếu có):</p>
          </div>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Chi tiết vấn đề (tùy chọn)"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-[14px] outline-none focus:border-[#2a6d61] focus:ring-1 focus:ring-[#2a6d61]"
          />
        </div>

        {/* Hai nút Submit */}
        <div className="flex gap-3 pt-2">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 bg-[#eef7f6] text-[#2a6d61] font-bold text-[14px] rounded-xl transition-colors hover:bg-[#d8efeb]"
          >
            ĐÁNH GIÁ SAU
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 py-3 bg-[#2a6d61] text-white font-bold text-[14px] rounded-xl transition-colors hover:bg-[#205249] shadow-md"
          >
            GỬI ĐÁNH GIÁ
          </button>
        </div>
        
      </motion.div>
    </Modal>
  );
}