export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <div className="h-12 animate-pulse rounded-xl w-80 mx-auto mb-3" />
        <div className="h-5 animate-pulse rounded-lg w-64 mx-auto" />
      </div>
      <div className="flex gap-2 justify-center mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-9 w-20 animate-pulse rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="h-48 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-16 animate-pulse rounded" />
              <div className="h-5 w-3/4 animate-pulse rounded" />
              <div className="h-4 w-full animate-pulse rounded" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-7 w-16 animate-pulse rounded" />
                <div className="h-9 w-20 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
