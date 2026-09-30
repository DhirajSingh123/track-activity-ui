import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function DailyActivity({ lastPlan }) {
  const [planId, setPlanId] = useState(lastPlan?.id || lastPlan?.planId || '');
  const [actualMinutes, setActualMinutes] = useState(120);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const result = await api.addDailyActivity(planId, {
        actualMinutes: Number(actualMinutes),
        notes
      });

      setMessage(
        `Activity saved successfully${result?.completed ? ' ✓ Goal completed for today' : ''}`
      );
      setNotes('');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="panel">
      <div className="section-title">
        <CheckCircle2 size={21} />
        <h2>Today's Activity</h2>
      </div>

      <form onSubmit={submit} className="form-grid">
        <label>
          Plan ID
          <input
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            placeholder="USER-ABC123-PYTHON-4821"
            required
          />
        </label>

        <label>
          Actual Minutes
          <input
            type="number"
            min="0"
            value={actualMinutes}
            onChange={(e) => setActualMinutes(e.target.value)}
            required
          />
        </label>

        <label>
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Completed Python functions chapter"
            rows="3"
          />
        </label>

        {message && <div className="info-box">{message}</div>}

        <button className="secondary-btn">Save Daily Activity</button>
      </form>
    </section>
  );
}
