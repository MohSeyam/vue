import React from "react";
import ResourceItem from "./ResourceItem";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function ResourceList({ resources: initialResources }) {
  const { t } = useTranslation();
  const [resources, setResources] = useState(initialResources || []);
  if (!resources || !resources.length) return null;
  function handleEditResource(idx, updated) {
    setResources(resources => resources.map((r, i) => i === idx ? updated : r));
  }
  return (
    <div className="mt-6">
      <details className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-zinc-900 shadow">
        <summary className="cursor-pointer px-4 py-2 font-bold text-blue-700 dark:text-sky-400 select-none">
          {t("resources", "المراجع والموارد المقترحة")}
        </summary>
        <ul className="p-4 flex flex-col gap-2">
          {resources.map((res, idx) => (
            <ResourceItem key={idx} resource={res} onEdit={updated => handleEditResource(idx, updated)} />
          ))}
        </ul>
      </details>
    </div>
  );
}