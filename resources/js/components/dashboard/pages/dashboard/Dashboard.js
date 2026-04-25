import React from "react";
import { FiBriefcase, FiFileText, FiMessageSquare, FiBell } from "react-icons/fi";
import "./dashboard.scss";

const stats = [
  { id: "applied", icon: FiBriefcase, value: 1, label: "Applied Jobs", theme: "yellow" },
  { id: "unfinished", icon: FiFileText, value: 0, label: "Unfinished Jobs", theme: "yellow" },
  { id: "messages", icon: FiMessageSquare, value: 0, label: "New Message", theme: "yellow" },
  { id: "notifications", icon: FiBell, value: 1, label: "Notification", theme: "yellow" },
];

function StatCard({ icon: Icon, value, label, theme }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon stat-icon--${theme}`}>
        <Icon />
      </div>
      <div className="stat-meta">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
}

 function Dashboard() {
  return (
    <main className="dash">
      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      <section className="panels">
        <div className="panel">
          <header className="panel-head">
            <h3 className="panel-title">Unfinished Jobs</h3>
          </header>
          <div className="empty">
            <div className="empty-icon" aria-hidden="true">
              <FiBriefcase />
            </div>
            <div className="empty-title">No jobs found.</div>
          </div>
        </div>

        <div className="panel">
          <header className="panel-head">
            <h3 className="panel-title">Pending Assessments</h3>
          </header>
          <div className="empty">
            <div className="empty-icon is-doc" aria-hidden="true">
              <FiFileText />
            </div>
            <div className="empty-title">No assessments found.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Dashboard;