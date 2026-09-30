import React, { useState } from 'react';
import { LogOut, Target } from 'lucide-react';
import AuthCard from './components/AuthCard';
import CreatePlan from './components/CreatePlan';
import DailyActivity from './components/DailyActivity';
import PlanLookup from './components/PlanLookup';

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('trackActivityUser');
    const token = localStorage.getItem('trackActivityToken');

    return storedUser && token
      ? JSON.parse(storedUser)
      : null;
  });

  const [lastPlan, setLastPlan] = useState(null);

  const handleLogin = ({ user, token }) => {
    localStorage.setItem(
      'trackActivityUser',
      JSON.stringify(user)
    );

    localStorage.setItem(
      'trackActivityToken',
      token
    );

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('trackActivityUser');
    localStorage.removeItem('trackActivityToken');

    setUser(null);
    setLastPlan(null);
  };

  if (!user) {
    return (
      <main className="auth-page">
        <AuthCard onLogin={handleLogin} />
      </main>
    );
  }

  return (
    <div className="app-shell">

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark small">TA</div>

          <div>
            <h1>Track Activity</h1>
            <span>Your personal progress dashboard</span>
          </div>
        </div>

        <div className="user-area">
          <div className="user-chip">
            <strong>{user.name}</strong>
            <span>{user.phoneNo}</span>
          </div>

          <button
            className="icon-btn"
            onClick={logout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="dashboard">

        <section className="hero">
          <div>
            <span className="eyebrow">
              WELCOME BACK
            </span>

            <h2>
              Stay consistent,{' '}
              {user.name?.split(' ')[0] || 'there'}.
            </h2>

            <p>
              Create your plan, record today's effort
              and keep your progress moving.
            </p>
          </div>

          <Target
            size={72}
            strokeWidth={1.4}
          />
        </section>

        <div className="dashboard-grid">
          <CreatePlan
            user={user}
            onCreated={setLastPlan}
          />

          <DailyActivity
            lastPlan={lastPlan}
          />
        </div>

        <PlanLookup />

      </main>
    </div>
  );
}