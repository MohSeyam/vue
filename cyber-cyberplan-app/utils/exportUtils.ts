import { exportToPDF } from '../services/export/toPDF';
import { exportToMarkdown } from '../services/export/toMarkdown';
import { exportToHTML } from '../services/export/toHTML';

export function exportData(data: any, format: 'pdf' | 'md' | 'html', options?: { filename?: string }) {
  if (format === 'pdf') {
    exportToPDF(data, options);
  } else if (format === 'md') {
    exportToMarkdown(data, options);
  } else if (format === 'html') {
    exportToHTML(data, options);
  }
}