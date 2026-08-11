"use client";

function FolderGlyph() {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
      <defs>
        <linearGradient id="folderGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DE8DB" />
          <stop offset="100%" stopColor="#3FB9A8" />
        </linearGradient>
      </defs>
      <path
        d="M1 4.5C1 3.12 2.12 2 3.5 2H11l2.2 2.6H26.5C27.88 4.6 29 5.72 29 7.1V19.5C29 20.88 27.88 22 26.5 22H3.5C2.12 22 1 20.88 1 19.5V4.5Z"
        fill="url(#folderGrad)"
      />
      <path d="M1 8H29V19.5C29 20.88 27.88 22 26.5 22H3.5C2.12 22 1 20.88 1 19.5V8Z" fill="#5EEAD4" fillOpacity="0.35" />
    </svg>
  );
}

function FileGlyph() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
      <path
        d="M3 2C3 0.9 3.9 0 5 0H14L21 7V26C21 27.1 20.1 28 19 28H5C3.9 28 3 27.1 3 26V2Z"
        fill="#F4F6FA"
      />
      <path d="M14 0L21 7H16C14.9 7 14 6.1 14 5V0Z" fill="#C7CEDA" />
      <rect x="6.5" y="12" width="11" height="1.4" rx="0.7" fill="#9AA3B5" />
      <rect x="6.5" y="16" width="11" height="1.4" rx="0.7" fill="#9AA3B5" />
      <rect x="6.5" y="20" width="7" height="1.4" rx="0.7" fill="#9AA3B5" />
    </svg>
  );
}

export function FolderIcon({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onDoubleClick={onClick}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 w-24 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-150 group"
    >
      <div className="w-11 h-11 flex items-center justify-center transition-transform duration-150 group-hover:scale-110 group-hover:-translate-y-0.5">
        <FolderGlyph />
      </div>
      <span
        className="text-[11px] text-center leading-tight px-1.5 py-0.5 rounded"
        style={{ color: "var(--text)" }}
      >
        {label}
      </span>
    </button>
  );
}

export function FileIcon({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center gap-1.5 w-24 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-150 group"
    >
      <div className="w-11 h-11 flex items-center justify-center transition-transform duration-150 group-hover:scale-110 group-hover:-translate-y-0.5">
        <FileGlyph />
      </div>
      <span
        className="text-[11px] text-center leading-tight px-1.5 py-0.5 rounded"
        style={{ color: "var(--text)" }}
      >
        {label}
      </span>
    </a>
  );
}
