export function MiniBarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex h-48 gap-2 sm:gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-brand-500 transition-all"
              style={{ height: `${Math.max((d.value / max) * 100, 4)}%` }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-[11px] font-medium text-gray-500">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
