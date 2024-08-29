import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center h-[10vh] bg-slate-200 shadow-lg font-bold mb-0">
      <p className="text-center  cursor-pointer">
        &copy; 2024 <span className="text-orange-500">hellofood</span> ||
        Developed by &nbsp;
        <span className="text-orange-500">Monish Lal</span>
      </p>
    </div>
  );
};

export default Footer;
