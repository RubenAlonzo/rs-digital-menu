import React from 'react';

const ContactInfo = ({ icon, text }) => (
  <div className="flex gap-2 mt-2 text-sm tracking-wide text-stone-500">
    <img loading="lazy" src={icon} alt="" className="shrink-0 aspect-square w-[17px]" />
    <p className="flex-auto">{text}</p>
  </div>
);

export default ContactInfo;
