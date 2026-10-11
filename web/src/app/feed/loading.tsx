export default function FeedLoading() {
  return <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50"><section className="mx-auto max-w-6xl animate-pulse space-y-6"><div className="h-8 w-32 rounded bg-white/10" /><div className="h-48 rounded-[2rem] bg-white/[0.07]" /><div className="grid gap-4 md:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <div key={index} className="h-64 rounded-3xl bg-white/[0.06]" />)}</div></section></main>;
}
