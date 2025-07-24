import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`
        bg-light-card dark:bg-dark-card
        border border-light-border dark:border-dark-border
        text-light-text dark:text-dark-text
        rounded-lg
        p-6
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.04)]
        dark:shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
