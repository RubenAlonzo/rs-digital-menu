import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { login } from '../services/authService';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      onLogin(user);
    } catch (error) {
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex relative flex-col px-5 py-12 mt-14 mb-32 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold">Acceder</h2>
      {error && <p className="text-red-500">{error}</p>}
      <InputField label="Usuario:" placeholder="example@app.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Contraseña:" placeholder="********" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Entrar" />
    </form>
  );
}

export default LoginForm;