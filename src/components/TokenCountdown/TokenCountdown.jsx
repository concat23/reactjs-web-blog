import React, { useEffect, useState, useRef } from 'react';
import './TokenCountdown.scss';

export default function TokenCountdown() {
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalId = useRef(null);

  useEffect(() => {
    const expireAtStr = localStorage.getItem('token_expire_at');
    if (!expireAtStr) return;

    const expireAt = parseInt(expireAtStr, 10);

    function updateCountdown() {
      const now = Date.now();
      const diff = expireAt - now;

      if (diff <= 0) {
        setTimeLeft('Đã hết hạn');
        if (intervalId.current) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${minutes} phút ${seconds} giây`);
      }
    }

    updateCountdown();
    intervalId.current = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  if (!timeLeft) return null;

  return (
    <div className={`token-countdown ${timeLeft.includes('phút 0') ? 'warning' : ''}`}>
      Thời gian token còn lại: {timeLeft}
    </div>
  );
}
