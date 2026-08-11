"use client";

import { useEffect, useState } from "react";
import { schedule, type ScheduleRow } from "data/lowkeylinux/timelineData";

const STATE_LABEL: Record<ScheduleRow["state"], string> = {
  R: "running",
  S: "sleeping",
  Z: "zombie",
};

export default function ProcessTable() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Simple live detection: state R for the row whose time window matches the
  // current HH:MM (on the event day). Falls back to all S otherwise.
  const rows = schedule.map((row) => {
    if (row.state === "R") {
      const windowMatch = timeWindowMatches(row.time, now);
      return windowMatch ? row : { ...row, state: "S" as const };
    }
    return row;
  });

  const sessionCount = schedule.length;
  const phaseCount = 2;
  const runningCount = rows.filter((r) => r.state === "R").length;

  return (
    <div>
      <div className="ll-loadavg">
        <span>
          load average: <b>{runningCount}</b> running, <b>{sessionCount}</b> sessions,{" "}
          <b>{phaseCount}</b> phases
        </span>
      </div>

      {/* Desktop table */}
      <div className="ll-table-wrap">
        <table className="ll-table">
          <thead>
            <tr>
              <th>PID</th>
              <th>USER</th>
              <th>CPU%</th>
              <th>STATE</th>
              <th>TIME</th>
              <th>COMMAND</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.pid} className={`state-${r.state.toLowerCase()}`}>
                <td>{r.pid}</td>
                <td>{r.user}</td>
                <td>
                  <span className="ll-cpu-bar">
                    <span
                      className="ll-cpu-fill"
                      style={{ width: `${r.cpu}%` }}
                    />
                  </span>{" "}
                  {r.cpu}%
                </td>
                <td className={`state-${r.state.toLowerCase()}`}>
                  <span className="ll-state-dot" aria-hidden />
                  {r.state} · {STATE_LABEL[r.state]}
                </td>
                <td>{r.time}</td>
                <td>{r.command}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="ll-table-cards">
        {rows.map((r) => (
          <div key={r.pid} className="ll-card">
            <div className="ll-card-head">
              <span>
                PID {r.pid} · {r.user}
              </span>
              <span className={`state-${r.state.toLowerCase()}`}>
                <span className="ll-state-dot" aria-hidden />
                {r.state}
              </span>
            </div>
            <div className="ll-card-command">{r.command}</div>
            <div className="ll-card-time">{r.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function timeWindowMatches(time: string, now: Date): boolean {
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10) % 12;
  const isPm = time.includes("PM");
  const nowHour = now.getHours();
  return nowHour === hour + (isPm && hour !== 12 ? 12 : 0);
}
