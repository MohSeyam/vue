import React from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const typeIcons = {
  video: <i className="i-lucide-youtube text-red-500" />,
  article: <i className="i-lucide-file-text text-blue-500" />,
  link: <i className="i-lucide-link text-emerald-500" />,
  default: <i className="i-lucide-link text-slate-400" />
};

export default function ResourceItem({ resource, onEdit }) {
  const { lang } = useApp();
  const { t } = useTranslation();
  const icon = typeIcons[resource.type] || typeIcons.default;
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...resource });

  function handleSave() {
    onEdit?.(editData);
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="flex items-center gap-2 text-sm py-1">
        <select
          className="rounded border px-2 py-1"
          value={editData.type}
          onChange={e => setEditData({ ...editData, type: e.target.value })}
        >
          <option value="video">{t("video", "فيديو")}</option>
          <option value="article">{t("article", "مقالة")}</option>
          <option value="link">{t("link", "رابط")}</option>
        </select>
        <input
          className="rounded border px-2 py-1 flex-1"
          value={editData.title}
          onChange={e => setEditData({ ...editData, title: e.target.value })}
          placeholder={t("title", "العنوان")}
        />
        <input
          className="rounded border px-2 py-1 flex-1"
          value={editData.url}
          onChange={e => setEditData({ ...editData, url: e.target.value })}
          placeholder={t("url", "الرابط")}
        />
        <button className="ml-2 text-green-600" onClick={handleSave}><i className="i-lucide-check" /></button>
        <button className="ml-1 text-slate-400" onClick={() => setEditing(false)}><i className="i-lucide-x" /></button>
      </li>
    );
  }

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
      <button className="ml-2 text-slate-400 hover:text-blue-600" title={t("editResource", "تعديل المرجع")}
        onClick={() => setEditing(true)}>
        <i className="i-lucide-pencil" />
      </button>
    </li>
  );
}