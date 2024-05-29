import React from "react";

const Button = ({ label, icon, onClick, className }) => {
  const btnStyle = {
    background: bg,
    padding: bPad,
    borderRadius: bRad,
    color: color,
  };
  return (
    <div className={`btn ${className}`} onClick={onClick}>
      {icon} {label}
    </div>
  );
};

export default Button;
