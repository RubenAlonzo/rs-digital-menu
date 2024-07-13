import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUser(user);
    navigate('/'); // Redirect to the home or any protected route
  };

  return (
    <main className="flex flex-col justify-center mx-auto w-full text-sm whitespace-nowrap max-w-[480px] text-stone-700">
      <section className="flex overflow-hidden relative flex-col px-4 py-20 w-full aspect-[0.46]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ab551581b3bc73fe9fa071dc73455cb41e76391e7f96db489779289d5d302dd?apiKey=fb34ab8a011e440488e897e0309c7345&"
          alt="background"
          className="object-cover absolute inset-0 size-full"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d24f49f81cd93cf18334d85ef533cb403a2f208335450fcf3b049a6967026575?apiKey=fb34ab8a011e440488e897e0309c7345&"
          alt="Logo"
          className="self-center mt-3 w-56 max-w-full aspect-[1.85]"
        />
        <LoginForm onLogin={handleLogin} />
      </section>
    </main>
  );
}

export default Login;