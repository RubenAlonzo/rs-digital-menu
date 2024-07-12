import React from 'react';

function InputField({ label, placeholder, type = 'text' }) {
  return (
    <>
      <label className="mt-4 text-lg tracking-wide">{label}</label>
      <input placeholder={placeholder} type={type} className="justify-center items-start px-3.5 py-3 mt-2.5 tracking-wide rounded-xl bg-neutral-100 text-stone-500" />
    </>
  );
}

export default InputField;