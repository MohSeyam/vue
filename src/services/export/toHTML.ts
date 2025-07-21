// خدمة تصدير الملاحظات/اليوميات إلى HTML
export function exportToHTML(data: any, options?: any): string {
  // TODO: تحويل البيانات إلى HTML
  // مثال مبدئي:
  return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}