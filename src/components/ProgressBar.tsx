type ProgressBarProps = {
  stages: string[];
  currentIndex: number;
  onSelect?: (index: number) => void;
};

export function ProgressBar({ stages, currentIndex, onSelect }: ProgressBarProps) {
  return (
    <div className="w-full rounded-2xl border border-border bg-surface p-3 sm:p-4">
      <div className="flex gap-1.5 sm:gap-2">
        {stages.map((stage, index) => {
          const clickable = index <= currentIndex;

          return (
            <button
              key={stage}
              type="button"
              disabled={!clickable}
              onClick={() => onSelect?.(index)}
              title={clickable ? `Изменить этап «${stage}»` : undefined}
              className={`group flex flex-1 flex-col items-stretch gap-2 rounded-md ${
                clickable ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <span
                  style={{ transformOrigin: "left" }}
                  className={`block h-full origin-left rounded-full bg-accent transition-transform duration-700 ease-out ${
                    index <= currentIndex ? "scale-x-100" : "scale-x-0"
                  } ${
                    index === currentIndex
                      ? "shadow-[0_0_10px_rgba(214,169,74,0.6)]"
                      : ""
                  } ${clickable ? "group-hover:brightness-125" : ""}`}
                />
              </span>
              <span
                className={`text-center text-[9px] uppercase tracking-wide transition-all duration-500 sm:text-[11px] ${
                  index === currentIndex
                    ? "scale-105 font-medium text-accent"
                    : index < currentIndex
                      ? "text-foreground/70 group-hover:text-accent"
                      : "text-muted"
                }`}
              >
                {stage}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
