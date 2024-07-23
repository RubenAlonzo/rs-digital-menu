import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { fondoProductos, logoRS } from '../assets/icons/images';

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUser(user);
    navigate('/'); // Redirect to the home or any protected route
  };

  return (
    <main className="flex flex-col justify-center mx-auto w-full text-sm whitespace-nowrap max-w-[480px] text-stone-700">
      <section className="flex overflow-hidden md:relative flex-col px-4 py-20 w-full aspect-[0.46]">
        <img
          loading="lazy"
          src={fondoProductos}
          alt="background"
          className="object-cover absolute inset-0 z-0 opacity-90 size-full"
        />
        <div className="flex justify-center mb-3 relative z-10">
          <img
            loading="lazy"
            src={logoRS}
            alt="Logo"
            className="w-56 max-w-full aspect-[1.85]"
          />
        </div>
        <LoginForm onLogin={handleLogin} />
      </section>
    </main>
  );
}

export default Login;