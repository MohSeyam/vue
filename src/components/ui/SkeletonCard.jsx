import React from "react";

export default function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 shadow animate-pulse flex flex-col gap-3 ${className}`}
    >
      <div className="h-6 w-1/3 bg-slate-200 dark:bg-zinc-700 rounded mb-2" />
      <div className="h-4 w-2/3 bg-slate-100 dark:bg-zinc-800 rounded mb-2" />
      <div className="h-4 w-1/2 bg-slate-100 dark:bg-zinc-800 rounded mb-2" />
      <div className="h-8 w-full bg-slate-100 dark:bg-zinc-800 rounded" />
    </div>
  );
}