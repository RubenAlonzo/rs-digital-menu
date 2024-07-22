import React from 'react';

const ContactInfo = ({ icon: Icon, text }) => (
  <div className="flex gap-2 mt-2 text-sm tracking-wide text-stone-500">
    {Icon && <Icon className="shrink-0 aspect-square w-[18px]" />}
    <p className="flex-auto">{text}</p>
  </div>
);

export default ContactInfo;
