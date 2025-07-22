// ResourceList.jsx
export default function ResourceList({ resources }) {
  if (!resources.length) return null;
  return (
    <div className="mb-2">
      <div className="font-semibold text-xs text-gray-500 mb-1">الموارد:</div>
      <ul className="space-y-1">
        {resources.map((res, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-xs bg-gray-200 dark:bg-zinc-800 rounded px-2 py-0.5">{res.type}</span>
            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">{res.title || res.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}