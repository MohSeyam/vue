// دوال مساعدة للتواريخ
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('ar-EG')
}

export function getWeekNumber(date: Date) {
  // حساب رقم الأسبوع في السنة
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
  return Math.ceil((((d as any) - (yearStart as any)) / 86400000 + 1)/7)
}