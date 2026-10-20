import { useEffect, useState } from "react";

export function useCountdown(start) {
  const [left, setLeft] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(left / 86400)),
    hours: pad(Math.floor(left / 3600) % 24),
    minutes: pad(Math.floor(left / 60) % 60),
    seconds: pad(left % 60),
  };
}
