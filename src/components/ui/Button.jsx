import React from "react";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "font-semibold rounded px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent shadow-sm hover:shadow-lg hover:scale-105 active:scale-95";
  const variants = {
    primary:
      "bg-light-accent dark:bg-dark-accent text-white dark:text-white border border-light-accent dark:border-dark-accent hover:bg-yellow-400 hover:border-yellow-400 dark:hover:bg-yellow-500 dark:hover:border-yellow-500",
    secondary:
      "bg-light-blue dark:bg-dark-blue text-white dark:text-white border border-light-blue dark:border-dark-blue hover:bg-light-accent dark:hover:bg-dark-accent hover:border-light-accent dark:hover:border-dark-accent",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
