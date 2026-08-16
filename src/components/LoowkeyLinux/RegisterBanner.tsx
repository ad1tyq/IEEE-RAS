"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "data/lowkeylinux/content";

// Event starts 10:30 AM IST (MUJ campus is in India). Explicit offset avoids
// viewer-local timezone drift in the countdown.
const EVENT_ISO = "2026-08-16T10:30:00+05:30";

export default function RegisterBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const ms = new Date(EVENT_ISO).getTime() - Date.now();
      if (ms <= 0) {
        setDaysLeft(-1);
        return;
      }
      setDaysLeft(Math.ceil(ms / 86_400_000));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const urgent = daysLeft !== null && daysLeft >= 0 && daysLeft < 3;

  return (
    <section id="register" className="ll-register">
      {daysLeft !== null && (
        <div className={`ll-countdown ${urgent ? "urgent" : ""}`}>
          {daysLeft < 0
            ? "registration closed"
            : daysLeft === 0
              ? "registration closes today"
              : `registration closes in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
        </div>
      )}
      <h2 className="ll-register-title">
        Gain root access on {eventConfig.dateShort}
      </h2>
      <a className="ll-btn ll-btn-primary" href={eventConfig.registerUrl}>
        $ sudo apt install ticket
      </a>
    </section>
  );
}
