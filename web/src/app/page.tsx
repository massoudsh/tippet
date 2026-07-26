export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-brand">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">تیپت</h1>
        <p className="mt-1 text-sm text-gray-500">
          کشف هوشمند لباس دست‌دوم، متناسب با سلیقه‌ی تو
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold">فید کشف</h2>
        <p className="text-sm text-gray-500">
          این نسخه‌ی اسکلت اولیه است. فید پیشنهاد هوشمند و کارت‌های آیتم در فاز
          پیاده‌سازی فیچرها اضافه می‌شود.
        </p>
      </section>
    </main>
  );
}
