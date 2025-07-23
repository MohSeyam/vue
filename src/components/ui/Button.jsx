import React from "react";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "font-semibold rounded px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent";
  const variants = {
    primary:
      "bg-light-accent dark:bg-dark-accent text-light-text dark:text-dark-background border border-light-accent dark:border-dark-accent hover:bg-[#33e4c4] hover:border-[#33e4c4] dark:hover:bg-[#33e4c4] dark:hover:border-[#33e4c4]",
    secondary:
      "bg-transparent text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-background dark:hover:bg-dark-background hover:border-[#ced4da] dark:hover:border-dark-border",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
