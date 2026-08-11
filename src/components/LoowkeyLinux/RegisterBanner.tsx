"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "data/lowkeylinux/content";

const EVENT_ISO = "2026-08-16T10:30:00";

export default function RegisterBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const ms = new Date(EVENT_ISO).getTime() - Date.now();
      setDaysLeft(Math.max(0, Math.ceil(ms / 86_400_000)));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const urgent = daysLeft !== null && daysLeft < 3;

  return (
    <section id="register" className="ll-register">
      {daysLeft !== null && (
        <div className={`ll-countdown ${urgent ? "urgent" : ""}`}>
          {daysLeft === 0
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
