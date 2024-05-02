import React from 'react';

const Header = ({ category, title, titleStyle }) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className={`text-3xl tracking-tight text-slate-900 ${titleStyle}`}>
      {title}
    </p>
  </div>
);

export default Header;
