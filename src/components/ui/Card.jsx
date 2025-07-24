import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`
        bg-light-card dark:bg-dark-card
        border border-light-border dark:border-dark-border
        text-light-text dark:text-dark-text
        rounded-xl
        p-6
        shadow-[0_4px_16px_-2px_rgba(0,0,0,0.10),0_2px_8px_-1px_rgba(0,0,0,0.08)]
        dark:shadow-[0_10px_40px_-10px_rgba(2,12,27,0.8)]
        transition-all duration-200
        hover:-translate-y-2 hover:scale-105 hover:shadow-2xl
        [&_.card-secondary]:text-light-textSecondary dark:[&_.card-secondary]:text-dark-textSecondary
        border-2 border-light-border dark:border-dark-border
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
