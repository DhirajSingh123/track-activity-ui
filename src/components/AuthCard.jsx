import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { api } from '../services/api';

export default function AuthCard({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    emailId: '',
    phoneNo: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'register') {
        const user = await api.registerUser(form);
        localStorage.setItem('trackActivityUser', JSON.stringify(user));
        onLogin(user);
      } else {
        const user = await api.loginUser(form.phoneNo);
        localStorage.setItem('trackActivityUser', JSON.stringify(user));
        onLogin(user);
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-brand">
        <div className="brand-mark">TA</div>
        <div>
          <h1>Track Activity</h1>
          <p>Build consistency. See your progress.</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={mode === 'login' ? 'tab active' : 'tab'}
          onClick={() => setMode('login')}
          type="button"
        >
          <LogIn size={18} /> Login
        </button>
        <button
          className={mode === 'register' ? 'tab active' : 'tab'}
          onClick={() => setMode('register')}
          type="button"
        >
          <UserPlus size={18} /> Register
        </button>
      </div>

      <form onSubmit={submit} className="form-grid">
        {mode === 'register' && (
          <>
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Dhiraj Singh"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="emailId"
                value={form.emailId}
                onChange={update}
                placeholder="dhiraj@example.com"
                required
              />
            </label>
          </>
        )}

        <label>
          Phone Number
          <input
            name="phoneNo"
            value={form.phoneNo}
            onChange={update}
            placeholder="9876543210"
            required
          />
        </label>

        {message && <div className="error-box">{message}</div>}

        <button className="primary-btn" disabled={loading}>
          {loading
            ? 'Please wait...'
            : mode === 'register'
              ? 'Create Account'
              : 'Login'}
        </button>
      </form>

      <p className="helper-text">
        Current version logs in with phone number only. OTP can be added later.
      </p>
    </div>
  );
}
