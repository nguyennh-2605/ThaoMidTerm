# BusMap+ - Smart Bus Transportation System Demo

A modern, frontend-only demo application showcasing the BusMap+ smart bus transportation system for Hanoi, Vietnam.

## 🚀 Features

### NEW Features (Main Focus)

1. **Smart QR Boarding** 🎫
   - Animated QR code with glow effect
   - Payment method integration (Vietcombank, MoMo)
   - Ticket status and history
   - Wallet management

2. **Destination-Based Payment** 💰
   - Interactive route and stop selection
   - Dynamic fare calculation
   - Real-time price updates
   - Transparent pricing display

3. **Live Tracking** 📍
   - Real-time bus location tracking
   - Driver information card
   - ETA countdown timer
   - Route progress visualization
   - Animated map with bus movement

4. **Smart Support System** ⭐
   - Destination arrival reminders
   - Trip and driver rating
   - Feedback collection
   - Issue reporting

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons
- **QRCode.react** - QR code generation

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Design

The app uses a modern teal/turquoise color scheme inspired by the presentation:
- Primary: Teal (#14b8a6)
- Accent: Orange, Pink, Beige
- Clean, rounded cards
- Smooth animations throughout
- Mobile-first responsive design

## 📱 Pages

- **Landing** (`/`) - Hero section with feature showcase
- **Dashboard** (`/dashboard`) - Main app interface with QR ticket
- **Live Tracking** (`/live-tracking`) - Real-time bus tracking
- **QR Ticket** (`/qr-ticket`) - Ticket management and wallet
- **Payment** (`/payment`) - Destination-based fare selection
- **Profile** (`/profile`) - User account (placeholder)
- **Support** (`/support`) - Help center (placeholder)
- **Notifications** (`/notifications`) - Alerts (placeholder)
- **Favorites** (`/favorites`) - Saved routes (placeholder)

## 🗂️ Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   ├── qr/              # QR ticket components
│   ├── tracking/        # Live tracking components
│   ├── payment/         # Payment flow components
│   └── support/         # Support system components
├── pages/               # Page components
├── data/                # Mock data
├── types/               # TypeScript types
└── utils/               # Utility functions
```

## 🎯 Key Components

### QR Ticket Component
- Location: `src/components/qr/QRTicket.tsx`
- Features: Animated QR code, payment method display, active status

### Stop Selector Component
- Location: `src/components/payment/StopSelector.tsx`
- Features: Interactive stop selection, fare display, current location indicator

### Driver Card Component
- Location: `src/components/tracking/DriverCard.tsx`
- Features: Driver info, vehicle details, contact button

### Rating Modal Component
- Location: `src/components/support/RatingModal.tsx`
- Features: Trip rating, driver rating, feedback form, issue reporting

## 🌐 Mock Data

All data is mocked for demo purposes:
- Bus routes (Route 9, 27, 14)
- Hanoi bus stops (Cổng ĐH Giao thông, Cầu Giấy, etc.)
- Drivers (Nguyễn Văn Nam, etc.)
- Vehicle IDs (29B-456.78, etc.)
- Payment methods (Vietcombank, MoMo)

## 🎬 Animations

The app uses Framer Motion for smooth animations:
- Page transitions
- QR code glow effect
- Bus movement on map
- Fare calculation updates
- Modal animations
- Button interactions

## 📱 Responsive Design

- Mobile-first approach
- Optimized for 375px+ screens
- Tablet and desktop support
- Touch-friendly interactions

## 🌍 Language

All UI text is in Vietnamese to match the target market (Hanoi, Vietnam).

## 🚀 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Notes

- This is a **frontend-only demo** - no backend required
- All APIs are simulated with mock data
- Perfect for presentations and product demos
- Focus is on UX and visual showcase

## 🎨 Color Palette

```css
Primary Teal:
- 50: #f0fdfa
- 500: #14b8a6 (main)
- 600: #0d9488
- 700: #0f766e

Accents:
- Orange: #fb923c
- Pink: #f9a8d4
- Beige: #fef3c7
```

## 📄 License

This is a demo project for presentation purposes.

---

Built with ❤️ for BusMap+ Hanoi
