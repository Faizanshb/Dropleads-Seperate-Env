export function BlogCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="aspect-[16/9] bg-gray-200 animate-pulse" />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        </div>
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        </div>
      </div>
    </div>
  );
}
