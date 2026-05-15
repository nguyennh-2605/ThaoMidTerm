import { type ReactNode } from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export default function Layout({ children, showBottomNav = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className={showBottomNav ? 'pb-20' : ''}>{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
