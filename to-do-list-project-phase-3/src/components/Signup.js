import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const userResponse = await fetch('http://localhost:9292/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const signupResponse = await fetch('http://localhost:9292/signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (userResponse.ok && signupResponse.ok) {
        const newUser = { username, email };
        setUsers([...users, newUser]);
      } else {
        console.error('Sign-up failed.');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
    }

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>

      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>Password: {user.password}</div>
          </li>
        ))}
      </ul>

      {users.length > 0 && (
        <p>
          Signed up successfully!{' '}
          <Link to="/todolis">Go to TodoList</Link>
        </p>
      )}
    </div>
  );
}

export default Signup;
