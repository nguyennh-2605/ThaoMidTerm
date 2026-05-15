import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Trang chủ' },
  { path: '/notifications', icon: Bell, label: 'Thông báo' },
  { path: '/favorites', icon: Heart, label: 'Yêu thích' },
  { path: '/profile', icon: User, label: 'Tài khoản' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 py-2 px-4 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-50 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon
                className={`w-6 h-6 relative z-10 ${
                  isActive ? 'text-primary-600' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs relative z-10 ${
                  isActive ? 'text-primary-600 font-medium' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
