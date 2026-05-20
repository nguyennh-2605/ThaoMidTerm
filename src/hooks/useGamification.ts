import { useState, useEffect } from 'react';

export interface GamificationState {
  co2Reduced: number;
  moneySaved: number;
  totalDistance: number;
  tripCount: number;
  hasCompletedFeedback: boolean;
}

const INITIAL_STATE: GamificationState = {
  co2Reduced: 2.88,
  moneySaved: 48000,
  totalDistance: 32,
  tripCount: 18,
  hasCompletedFeedback: false
};

const UPDATED_STATE: GamificationState = {
  co2Reduced: 4.5,
  moneySaved: 75000,
  totalDistance: 50,
  tripCount: 19,
  hasCompletedFeedback: true
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
