import React from 'react';

function Button({ text }) {
  return (
    <button className="justify-center self-center px-9 py-2.5 mt-8 font-extrabold tracking-wide text-white bg-lime-600 rounded-xl">
      {text}
    </button>
  );
}

export default Button;