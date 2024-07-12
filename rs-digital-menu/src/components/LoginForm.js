import React from 'react';
import InputField from './InputField';
import Button from './Button';

function LoginForm() {
  return (
    <form className="flex relative flex-col px-5 py-12 mt-14 mb-32 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold">Acceder</h2>
      <InputField label="Usuario:" placeholder="myaccount@mail.com" />
      <InputField label="Contraseña:" placeholder="********" type="password" />
      <Button text="Entrar" />
    </form>
  );
}

export default LoginForm;