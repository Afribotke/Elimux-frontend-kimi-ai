export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-200 border-t-teal-700" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
