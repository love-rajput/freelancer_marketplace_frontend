import React from "react";

const Buttons = ({ buttonText, onClick }) => {
  return (
    <div className="p-2">
      <button 
        onClick={onClick}
        className="btn btn-neutral btn-outline border-green-500 text-white flex items-center gap-2 hover:bg-green-500 hover:border-green-500 transition-all duration-300"
      >
        {buttonText}
        <span className="text-lg">&#8594;</span>
      </button>
    </div>
  );
};

export default Buttons;
