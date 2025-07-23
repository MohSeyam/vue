import React from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const typeIcons = {
  video: <span title="فيديو">🎬</span>,
  article: <span title="مقالة">📄</span>,
  link: <span title="رابط">🔗</span>,
  book: <span title="كتاب">📚</span>,
  course: <span title="دورة">🎓</span>,
  podcast: <span title="بودكاست">🎧</span>,
  pdf: <span title="PDF">📑</span>,
  default: <span title="مرجع">🔖</span>,
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
          <option value="book">{t("book", "كتاب")}</option>
          <option value="course">{t("course", "دورة")}</option>
          <option value="podcast">{t("podcast", "بودكاست")}</option>
          <option value="pdf">{t("pdf", "PDF")}</option>
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