import React from 'react';

function Button({ text, className = '', ...props}) {
  return (
    <button className={`justify-center self-center px-9 py-2 font-semibold tracking-wide text-white bg-lime-600 rounded-xl ${className}`} {...props}>
      {text}
    </button>
  );
}

export default Button;