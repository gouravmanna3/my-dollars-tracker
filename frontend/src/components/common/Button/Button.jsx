import React from "react";

const Button = ({ label, icon, onClick, className }) => {
  return (
    <div className={`btn ${className}`} onClick={onClick}>
      {icon} {label}
    </div>
  );
};

export default Button;
