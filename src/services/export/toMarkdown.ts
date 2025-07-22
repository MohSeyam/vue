// خدمة تصدير الملاحظات/اليوميات إلى Markdown
export function exportToMarkdown(data: any, options?: { filename?: string }): string {
  if (typeof data === 'string') return data;
  let md = '';
  if (data.title) md += `# ${data.title}\n\n`;
  if (data.content) md += `${data.content}\n\n`;
  if (Array.isArray(data.items)) {
    md += data.items.map((item: any) => `- ${item}`).join('\n') + '\n';
  }
  if (!md) md = '```json\n' + JSON.stringify(data, null, 2) + '\n```';
  // خيار: حفظ الملف مباشرة إذا طلب
  if (options?.filename) {
    const blob = new Blob([md], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = options.filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
  return md;
}