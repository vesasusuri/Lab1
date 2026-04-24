import React from "react";
import { FiBriefcase, FiFileText, FiMessageSquare, FiBell } from "react-icons/fi";
import "./dashboard.scss";

const stats = [
  { id: "applied", icon: FiBriefcase, value: 1, label: "Applied Jobs", color: "pink" },
  { id: "unfinished", icon: FiFileText, value: 0, label: "Unfinished Jobs", color: "purple" },
  { id: "messages", icon: FiMessageSquare, value: 0, label: "New Message", color: "orange" },
  { id: "notifications", icon: FiBell, value: 1, label: "Notification", color: "blue" },
];

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <article className="candidate-dashboard__stat-card">
      <div className={`candidate-dashboard__stat-icon candidate-dashboard__stat-icon--${color}`}>
        <Icon />
      </div>
      <div className="candidate-dashboard__stat-meta">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
}

export default function Dashboard() {
  return (
    <main className="candidate-dashboard">
      <section className="candidate-dashboard__stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>
    </main>
  );
}
