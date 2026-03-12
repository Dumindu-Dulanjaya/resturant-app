import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    restaurant_name: '',
    address: '',
    contact_number: '',
    email: '',
    password: '',
    confirm_password: '',
    opening_time: '',
    closing_time: '',
    logo: null,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    if (form.logo && form.logo.size > 1024 * 1024) {
      setError('Logo file must be less than 1MB.');
      return;
    }
    // TODO: wire up to NestJS API endpoint
    alert('Registration submitted! (Backend integration pending)');
  };

  return (
    <form className="reg-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>

      {error && (
        <div className="reg-error" role="alert">
          {error}
        </div>
      )}

      {/* Row 1: Name + Address */}
      <div className="reg-row">
        <div className="reg-field">
          <label htmlFor="restaurant_name">Hotel Or Restaurant Name</label>
          <input
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            value={form.restaurant_name}
            onChange={handleChange}
            autoComplete="organization"
            required
          />
        </div>
        <div className="reg-field">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            autoComplete="street-address"
            required
          />
        </div>
      </div>

      {/* Row 2: Contact + Email */}
      <div className="reg-row">
        <div className="reg-field">
          <label htmlFor="contact_number">Contact Number</label>
          <input
            type="text"
            id="contact_number"
            name="contact_number"
            value={form.contact_number}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit number"
            autoComplete="tel"
            required
          />
        </div>
        <div className="reg-field">
          <label htmlFor="email">Email (Hotel Contact Email)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>
      </div>

      {/* Row 3: Password + Confirm Password */}
      <div className="reg-row">
        <div className="reg-field">
          <label htmlFor="password">Password</label>
          <div className="reg-pwd-wrap">
            <input
              type={showPwd ? 'text' : 'password'}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <span
              className={`reg-eye-toggle fas ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPwd((v) => !v)}
              role="button"
              aria-label="Toggle password visibility"
            />
          </div>
        </div>
        <div className="reg-field">
          <label htmlFor="confirm_password">Confirm Password</label>
          <div className="reg-pwd-wrap">
            <input
              type={showConfirmPwd ? 'text' : 'password'}
              id="confirm_password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <span
              className={`reg-eye-toggle fas ${showConfirmPwd ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowConfirmPwd((v) => !v)}
              role="button"
              aria-label="Toggle confirm password visibility"
            />
          </div>
        </div>
      </div>

      {/* Row 4: Opening + Closing Time */}
      <div className="reg-row">
        <div className="reg-field">
          <label htmlFor="opening_time">Opening Time</label>
          <input
            type="time"
            id="opening_time"
            name="opening_time"
            value={form.opening_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="reg-field">
          <label htmlFor="closing_time">Closing Time</label>
          <input
            type="time"
            id="closing_time"
            name="closing_time"
            value={form.closing_time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Row 5: Logo Upload */}
      <div className="reg-row-full">
        <div className="reg-field">
          <label htmlFor="logo" className="reg-upload-label">
            Upload Logo
            <br />
            <span className="reg-upload-hint">
              (Upload A{' '}
              <a href="https://www.remove.bg" target="_blank" rel="noopener noreferrer">
                Background Removed
              </a>{' '}
              Logo Image Less Than 1MB)
            </span>
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="reg-submit-btn">
        Register
      </button>

      <p className="reg-login-text">
        Already have an account?{' '}
        <a href="/login">Login here</a>
      </p>
    </form>
  );
};

export default RegisterForm;
