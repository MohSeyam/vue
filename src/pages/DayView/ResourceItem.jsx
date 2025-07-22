import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

const typeIcons = {
  video: <i className="i-lucide-youtube text-red-500" />,
  article: <i className="i-lucide-file-text text-blue-500" />,
  link: <i className="i-lucide-link text-emerald-500" />,
  default: <i className="i-lucide-link text-slate-400" />
};

export default function ResourceItem({ resource }) {
  const { lang } = useApp();
  const { t } = useTranslation();
  const icon = typeIcons[resource.type] || typeIcons.default;
  return (
    <li className="flex items-center gap-2 text-sm py-1">
      <span className="text-lg">{icon}</span>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-blue-700 dark:text-sky-400 font-medium"
        aria-label={resource.title}
      >
        {resource.title}
      </a>
    </li>
  );
}