import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { api } from '../services/api';

export default function AuthCard({ onLogin }) {
  const [mode, setMode] = useState('login');

  const [form, setForm] = useState({
    name: '',
    emailId: '',
    phoneNo: '',
    otp: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setOtpSent(false);
    setMessage('');

    setForm({
      name: '',
      emailId: '',
      phoneNo: '',
      otp: ''
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {

      // REGISTER
      if (mode === 'register') {
        await api.registerUser({
          name: form.name,
          emailId: form.emailId,
          phoneNo: form.phoneNo
        });

        setMessage(
          'Account created successfully. Please login using your phone number.'
        );

        setMode('login');
        setOtpSent(false);

        setForm({
          name: '',
          emailId: '',
          phoneNo: form.phoneNo,
          otp: ''
        });

        return;
      }

      // LOGIN - STEP 1: SEND OTP
      if (!otpSent) {

        await api.sendOtp(form.phoneNo);

        setOtpSent(true);

        setMessage(
          'OTP sent to your registered email.'
        );

        return;
      }

      // LOGIN - STEP 2: VERIFY OTP
      const authResponse = await api.verifyOtp(
        form.phoneNo,
        form.otp
      );

      /*
        Backend response:

        {
          token: "...",
          user: {...}
        }
      */

      onLogin({
        user: authResponse.user,
        token: authResponse.token
      });

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
          onClick={() => changeMode('login')}
          type="button"
        >
          <LogIn size={18} />
          Login
        </button>

        <button
          className={mode === 'register' ? 'tab active' : 'tab'}
          onClick={() => changeMode('register')}
          type="button"
        >
          <UserPlus size={18} />
          Register
        </button>

      </div>

      <form
        onSubmit={submit}
        className="form-grid"
      >

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
            disabled={mode === 'login' && otpSent}
            required
          />
        </label>

        {/* OTP FIELD */}
        {mode === 'login' && otpSent && (
          <label>
            OTP

            <input
              name="otp"
              value={form.otp}
              onChange={update}
              placeholder="Enter 6-digit OTP"
              inputMode="numeric"
              maxLength={6}
              required
            />
          </label>
        )}

        {message && (
          <div className="error-box">
            {message}
          </div>
        )}

        <button
          className="primary-btn"
          disabled={loading}
        >

          {loading
            ? 'Please wait...'
            : mode === 'register'
              ? 'Create Account'
              : otpSent
                ? 'Verify OTP'
                : 'Send OTP'}

        </button>

      </form>

      <p className="helper-text">
        {mode === 'login'
          ? otpSent
            ? 'Enter the OTP sent to your registered email.'
            : 'Enter your registered phone number to receive an OTP.'
          : 'Create an account using your name, email and phone number.'}
      </p>

    </div>
  );
}