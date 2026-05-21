import { useState, useEffect } from 'react';

interface JourneyItem {
  date: string;
  label: string;
  distance: string;
  co2: string;
}

export interface GamificationState {
  treeSaved: number;
  co2Reduced: number;
  moneySaved: number;
  totalDistance: number;
  tripCount: number;
  hasCompletedFeedback: boolean;
  journeyHistory: JourneyItem[];
}

const INITIAL_STATE: GamificationState = {
  treeSaved: 2,
  co2Reduced: 2.88,
  moneySaved: 48000,
  totalDistance: 32,
  tripCount: 18,
  hasCompletedFeedback: false,
  journeyHistory: [
    {
      date: '16/05/2026',
      label: '16/05/2026',
      distance: '25km',
      co2: '+2.25 kg CO₂'
    },
    {
      date: '14/05/2026',
      label: '14/05/2026',
      distance: '7km',
      co2: '+0.63 kg CO₂'
    }
  ]
};

const UPDATED_STATE: GamificationState = {
  treeSaved: 3,
  co2Reduced: 4.5,
  moneySaved: 75000,
  totalDistance: 50,
  tripCount: 19,
  hasCompletedFeedback: true,
  journeyHistory: [
    {
      date: '18/05/2026',
      label: 'Hôm nay',
      distance: '18km',
      co2: '+1.62 kg CO₂'
    },
    {
      date: '16/05/2026',
      label: '16/05/2026',
      distance: '25km',
      co2: '+2.25 kg CO₂'
    },
    {
      date: '14/05/2026',
      label: '14/05/2026',
      distance: '7km',
      co2: '+0.63 kg CO₂'
    }
  ]
};

const STORAGE_KEY = 'busmap_gamification_state';

export function useGamification() {
  const [state, setState] = useState<GamificationState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const completeFeedback = () => {
    setState(UPDATED_STATE);
  };

  const resetState = () => {
    setState(INITIAL_STATE);
  };

  return {
    state,
    completeFeedback,
    resetState
  };
}
