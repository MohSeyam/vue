import jsPDF from 'jspdf';

export function exportToPDF(data: any, options?: { filename?: string }) {
  const doc = new jsPDF();
  const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  doc.text(content, 10, 10);
  doc.save(options?.filename || 'export.pdf');
}