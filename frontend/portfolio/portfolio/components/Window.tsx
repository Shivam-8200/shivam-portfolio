"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";

type WindowProps = {
  title: string;
  icon?: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus?: () => void;
  zIndex: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  accent?: "teal" | "amber";
  maximized?: boolean;
};

function TrafficLight({
  color,
  hoverColor,
  onClick,
  label,
  glyph,
}: {
  color: string;
  hoverColor: string;
  onClick: () => void;
  label: string;
  glyph: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="w-3 h-3 rounded-full flex items-center justify-center group/dot transition-transform hover:scale-110 active:scale-95"
      style={{ background: color }}
    >
      <span
        className="opacity-0 group-hover/dot:opacity-100 transition-opacity leading-none"
        style={{ color: hoverColor, fontSize: 8, transform: "translateY(-0.5px)" }}
      >
        {glyph}
      </span>
    </button>
  );
}

export default function Window({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  zIndex,
  width = 560,
  height = 420,
  x = 80,
  y = 60,
  accent = "teal",
  maximized = false,
}: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const accentColor = accent === "teal" ? "var(--accent)" : "var(--accent-2)";

  const chrome = (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="glass-window rounded-[12px] overflow-hidden flex flex-col w-full h-full"
      style={{
        boxShadow: "var(--shadow-window)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Title bar - macOS style */}
      <div
        className="window-handle flex items-center px-3.5 py-2.5 select-none relative shrink-0"
        style={{
          background: "var(--titlebar)",
          borderBottom: "1px solid var(--border)",
          cursor: maximized ? "default" : "grab",
        }}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2 z-10">
          <TrafficLight
            color="#FF5F57"
            hoverColor="#4d0000"
            label="Close"
            onClick={onClose}
            glyph="✕"
          />
          <TrafficLight
            color="#FEBC2E"
            hoverColor="#5c3d00"
            label="Minimize"
            onClick={onMinimize}
            glyph="−"
          />
          <TrafficLight
            color="#28C840"
            hoverColor="#003d0a"
            label="Maximize"
            onClick={onMaximize}
            glyph="⤢"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-1.5 pointer-events-none">
          {icon && <span className="text-xs leading-none">{icon}</span>}
          <span className="mono text-[11px] tracking-wide truncate max-w-[60%]" style={{ color: "var(--text-muted)" }}>
            {title}
          </span>
        </div>

        <div
          className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
          style={{ background: accentColor, opacity: 0.5 }}
        />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
    </motion.div>
  );

  if (maximized) {
    return (
      <motion.div
        layout
        style={{ position: "absolute", zIndex, inset: "44px 12px 84px 12px" }}
        onMouseDown={onFocus}
      >
        {chrome}
      </motion.div>
    );
  }

  return (
    <Draggable nodeRef={nodeRef} handle=".window-handle" defaultPosition={{ x, y }} bounds="parent">
      <div
        ref={nodeRef}
        style={{ position: "absolute", zIndex, width, height, maxWidth: "92vw", maxHeight: "78vh" }}
        onMouseDown={onFocus}
      >
        <AnimatePresence>{chrome}</AnimatePresence>
      </div>
    </Draggable>
  );
}
