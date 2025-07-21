// تنظيف HTML من أي كود ضار (XSS)
export function sanitizeHtml(html: string): string {
  // إذا كانت DOMPurify متوفرة استخدمها
  if (typeof window !== 'undefined' && (window as any).DOMPurify) {
    return (window as any).DOMPurify.sanitize(html);
  }
  // بديل بسيط: إزالة السكريبتات
  return html.replace(/<script.*?>.*?<\/script>/gi, '');
}