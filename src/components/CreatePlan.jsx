import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { api } from '../services/api';

const initialState = {
  title: '',
  description: '',
  category: 'LEARNING',
  subCategory: 'PYTHON',
  targetMinutesPerDay: 120,
  startDate: '',
  targetDate: ''
};

export default function CreatePlan({ user, onCreated }) {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const value =
      e.target.name === 'targetMinutesPerDay'
        ? Number(e.target.value)
        : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        ...form,
        userId: user.userId
      };

      const plan = await api.createPlan(payload);
      setMessage(`Plan created: ${plan.id || plan.planId || 'success'}`);
      onCreated(plan);
      setForm(initialState);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <div className="section-title">
        <PlusCircle size={21} />
        <h2>Create Plan</h2>
      </div>

      <form onSubmit={submit} className="form-grid two-column">
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={update}
            placeholder="Complete Python Course"
            required
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={update}>
            <option value="LEARNING">LEARNING</option>
            <option value="FITNESS">FITNESS</option>
            <option value="HEALTH">HEALTH</option>
            <option value="FINANCE">FINANCE</option>
          </select>
        </label>

        <label>
          Sub Category
          <input
            name="subCategory"
            value={form.subCategory}
            onChange={update}
            placeholder="PYTHON / JAVA / GYM"
            required
          />
        </label>

        <label>
          Target Minutes / Day
          <input
            type="number"
            min="1"
            name="targetMinutesPerDay"
            value={form.targetMinutesPerDay}
            onChange={update}
            required
          />
        </label>

        <label>
          Start Date
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={update}
            required
          />
        </label>

        <label>
          Target Date
          <input
            type="date"
            name="targetDate"
            value={form.targetDate}
            onChange={update}
            required
          />
        </label>

        <label className="full-width">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={update}
            placeholder="Complete Python course in 30 days"
            rows="4"
          />
        </label>

        {message && <div className="info-box full-width">{message}</div>}

        <button className="primary-btn full-width" disabled={loading}>
          {loading ? 'Creating...' : 'Create Plan'}
        </button>
      </form>
    </section>
  );
}
