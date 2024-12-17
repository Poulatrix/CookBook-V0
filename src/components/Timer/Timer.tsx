import React, { useState, useEffect, useRef } from 'react';
import { TimerDisplay } from './TimerDisplay';
import { TimerEditModal } from './TimerEditModal';
import { TimerAlertModal } from './TimerAlertModal';

type Props = {
  label: string;
  initialMinutes?: number;
};

export function Timer({ label, initialMinutes = 0 }: Props) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowAlertModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, totalSeconds]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const handleSaveTime = (newMinutes: number, newSeconds: number) => {
    setTotalSeconds(newMinutes * 60 + newSeconds);
  };

  const handleReset = () => {
    setTotalSeconds(initialMinutes * 60);
    setIsRunning(false);
  };

  return (
    <div className="relative">
      <TimerDisplay
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
        onToggleRunning={() => setIsRunning(!isRunning)}
        onReset={handleReset}
        onEdit={() => setShowEditModal(true)}
      />

      {showEditModal && (
        <TimerEditModal
          initialMinutes={minutes}
          initialSeconds={seconds}
          onSave={handleSaveTime}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showAlertModal && (
        <TimerAlertModal
          label={label}
          onClose={() => setShowAlertModal(false)}
        />
      )}
    </div>
  );
}