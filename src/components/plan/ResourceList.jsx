// ResourceList.jsx
import { useTranslation } from "react-i18next";
export default function ResourceList({ resources, lang }) {
  const { t } = useTranslation();
  if (!resources.length) return null;
  return (
    <div className="mb-2">
      <div className="font-semibold text-xs text-gray-500 mb-1">{t("resources", "الموارد:")}</div>
      <ul className="space-y-1">
        {resources.map((res, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-xs bg-gray-200 dark:bg-zinc-800 rounded px-2 py-0.5">{res.type}</span>
            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">{res.title?.[lang] || res.title || res.name?.[lang] || res.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}