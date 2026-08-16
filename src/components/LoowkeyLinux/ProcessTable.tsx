"use client";

import { useEffect, useState } from "react";
import { schedule, type ScheduleRow } from "data/lowkeylinux/timelineData";
import { eventConfig } from "data/lowkeylinux/content";

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

  // Live detection: a row whose time window matches the current hour is
  // promoted to state R (running). Otherwise the row keeps its scheduled state.
  const rows = schedule.map((row) =>
    timeWindowMatches(row.time, now)
      ? { ...row, state: "R" as const }
      : row
  );

  const sessionCount = schedule.length;
  const phaseCount = eventConfig.phases.length;
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
              <th scope="col">PID</th>
              <th scope="col">USER</th>
              <th scope="col">CPU%</th>
              <th scope="col">STATE</th>
              <th scope="col">TIME</th>
              <th scope="col">COMMAND</th>
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
                {r.state} · {STATE_LABEL[r.state]}
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
  return nowHour === hour + (isPm ? 12 : 0);
}
