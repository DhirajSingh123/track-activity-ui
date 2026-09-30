import { useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../services/api';

export default function PlanLookup() {
  const [planId, setPlanId] = useState('');
  const [plan, setPlan] = useState(null);
  const [message, setMessage] = useState('');

  const search = async (e) => {
    e.preventDefault();
    setMessage('');
    setPlan(null);

    try {
      const result = await api.getPlan(planId);
      setPlan(result);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="panel">
      <div className="section-title">
        <Search size={21} />
        <h2>Find Plan</h2>
      </div>

      <form onSubmit={search} className="lookup-row">
        <input
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
          placeholder="Enter plan ID"
          required
        />
        <button className="secondary-btn">Search</button>
      </form>

      {message && <div className="error-box">{message}</div>}

      {plan && (
        <div className="plan-card">
          <div>
            <span className="badge">{plan.category || 'PLAN'}</span>
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
          </div>

          <div className="stats">
            <div>
              <strong>{plan.completedDays ?? 0}</strong>
              <span>Completed Days</span>
            </div>
            <div>
              <strong>{plan.totalDays ?? 0}</strong>
              <span>Total Days</span>
            </div>
            <div>
              <strong>{plan.achievementPercentage ?? 0}%</strong>
              <span>Achievement</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
