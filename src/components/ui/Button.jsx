import React from "react";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "font-semibold rounded px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent shadow-sm hover:shadow-lg";
  const variants = {
    primary:
      "bg-light-accent dark:bg-dark-accent text-light-text dark:text-dark-text border border-light-accent dark:border-dark-accent hover:bg-yellow-400 hover:border-yellow-400 dark:hover:bg-yellow-500 dark:hover:border-yellow-500",
    secondary:
      "bg-transparent text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-background dark:hover:bg-dark-background hover:border-[#f3e9c7] dark:hover:border-dark-border",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
