// NotFound.jsx

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">الصفحة غير موجودة</p>
      <a href="/" className="text-cyan-700 hover:underline">العودة للصفحة الرئيسية</a>
    </div>
  );
}
