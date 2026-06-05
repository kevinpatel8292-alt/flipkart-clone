import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export function MobileSaleTimer() {
  const [timeLeft, setTimeLeft] = useState({ hrs: 9, mins: 42, secs: 26 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hrs, mins, secs } = prev;
        if (secs > 0) secs--;
        else {
          secs = 59;
          if (mins > 0) mins--;
          else {
            mins = 59;
            if (hrs > 0) hrs--;
            else hrs = 24; // reset just for demo
          }
        }
        return { hrs, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num) => num.toString().padStart(2, '0');

  return (
    <div className="mobile-sale-timer flex-center">
      <span>Sale ends in</span>
      <div className="timer-block">{format(timeLeft.hrs)}</div> <span>Hrs :</span>
      <div className="timer-block">{format(timeLeft.mins)}</div> <span>Min :</span>
      <div className="timer-block">{format(timeLeft.secs)}</div> <span>Sec</span>
    </div>
  );
}

export function MobileTopSelection() {
  return (
    <div className="mobile-top-selection">
      <div className="mts-content">
        <h3>Top Selection</h3>
      </div>
      <div className="mts-arrow">
        <ArrowRight size={20} />
      </div>
    </div>
  );
}
