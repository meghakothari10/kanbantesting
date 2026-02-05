import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    axios.post('/api/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setError('Invalid email or password');
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setError('Invalid email or password');
          } else {
            setError('An error occurred. Please try again.');
          }
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  const handleTestSubmit = (email, password) => {
    setEmail(email);
    setPassword(password);
    setError(null);
    axios.post('/api/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setError('Invalid email or password');
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setError('Invalid email or password');
          } else {
            setError('An error occurred. Please try again.');
          }
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      {isLoggedIn ? (
        <p>Logged in successfully!</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <h3>Testing</h3>
          <button onClick={() => handleTestSubmit('valid@example.com', 'password123')}>Valid Email and Password</button>
          <button onClick={() => handleTestSubmit('invalid@example.com', 'password123')}>Invalid Email and Valid Password</button>
          <button onClick={() => handleTestSubmit('valid@example.com', 'wrongpassword')}>Valid Email and Invalid Password</button>
          <button onClick={() => handleTestSubmit('invalid@example.com', 'wrongpassword')}>Invalid Email and Invalid Password</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;