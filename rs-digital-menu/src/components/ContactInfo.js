import React from 'react';

const ContactInfo = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 mt-2 text-sm tracking-wide text-stone-700">
    {Icon && <Icon className="shrink-0 aspect-square w-[18px]" />}
    <p className="flex-auto font-normal">{text}</p>
  </div>
);

export default ContactInfo;
