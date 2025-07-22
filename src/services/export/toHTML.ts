// خدمة تصدير الملاحظات/اليوميات إلى HTML
export function exportToHTML(data: any, options?: { filename?: string }): string {
  let html = '';
  if (typeof data === 'string') {
    html = `<div>${data}</div>`;
  } else {
    if (data.title) html += `<h1>${data.title}</h1>`;
    if (data.content) html += `<p>${data.content}</p>`;
    if (Array.isArray(data.items)) {
      html += '<ul>' + data.items.map((item: any) => `<li>${item}</li>`).join('') + '</ul>';
    }
    if (!html) html = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
  // خيار: حفظ الملف مباشرة إذا طلب
  if (options?.filename) {
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = options.filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
  return html;
}