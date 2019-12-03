import React, { useState } from 'react';

const Login = ({ auth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    await auth.login({ username, password });
    setLoading(false);
    auth.history.push('/');
  };
  return (
    <form onSubmit={event => handleSubmit(event)}>
      <label htmlFor='username'>
        Username
        <input
          id='username'
          onChange={event => setUsername(event.target.value)}
        />
      </label>

      <label htmlFor='password'>
        Password
        <input
          id='password'
          type='password'
          onChange={event => setPassword(event.target.value)}
        />
      </label>

      <button
        type='submit'
        color='primary'
        disabled={loading || !username.trim() || !password.trim()}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
