import { useState, useEffect } from 'react';

function TimeDisplay() {
  const [time, setTime] = useState('');

  // Function to get and format time (only hours and minutes)
  function getTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Update time on mount and every minute
  useEffect(() => {
    setTime(getTime());
    const interval = setInterval(() => {
      setTime(getTime());
    }, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <span className="timeContainer">
      {time}
    </span>
  );
}

export default TimeDisplay;
