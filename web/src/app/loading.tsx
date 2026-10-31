import { ItemCardSkeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return <main className="mx-auto max-w-6xl space-y-5 p-6" aria-busy="true"><p role="status">در حال بارگذاری…</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((id) => <ItemCardSkeleton key={id} />)}</div></main>;
}
