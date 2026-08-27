interface Props {
  value: number; // 0..100
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, className = '', showLabel = false }: Props) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="mb-1.5 flex justify-between text-xs font-semibold text-white/70">
          <span>PROGRESS</span>
          <span>{Math.round(v)}%</span>
        </div>
      )}
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/12">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6aa6ff] via-[#7bdfff] to-[#ffd24c] transition-all duration-500 ease-out"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
