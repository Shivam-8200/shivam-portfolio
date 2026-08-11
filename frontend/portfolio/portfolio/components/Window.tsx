"use client";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion } from "framer-motion";

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
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="w-3 h-3 rounded-full flex items-center justify-center group/dot transition-transform hover:scale-110 active:scale-95"
      style={{
        background: color,
      }}
    >
      <span
        className="opacity-0 group-hover/dot:opacity-100 transition-opacity leading-none"
        style={{
          color: hoverColor,
          fontSize: 8,
          transform: "translateY(-0.5px)",
        }}
      >
        {glyph}
      </span>
    </button>
  );
}

type DragState = {
  active: boolean;
  pointerId: number | null;
  startPointerX: number;
  startPointerY: number;
  startX: number;
  startY: number;
};

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
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x,
    y,
  });

  const dragRef = useRef<DragState>({
    active: false,
    pointerId: null,
    startPointerX: 0,
    startPointerY: 0,
    startX: x,
    startY: y,
  });

  const accentColor =
    accent === "teal"
      ? "var(--accent)"
      : "var(--accent-2)";

  function clampPosition(
    nextX: number,
    nextY: number
  ) {
    const element =
      windowRef.current;

    if (!element) {
      return {
        x: Math.max(0, nextX),
        y: Math.max(0, nextY),
      };
    }

    const parent =
      element.offsetParent as HTMLElement | null;

    if (!parent) {
      return {
        x: Math.max(0, nextX),
        y: Math.max(0, nextY),
      };
    }

    const parentWidth =
      parent.clientWidth;

    const parentHeight =
      parent.clientHeight;

    const windowWidth =
      element.offsetWidth;

    const windowHeight =
      element.offsetHeight;

    const maxX = Math.max(
      0,
      parentWidth - windowWidth
    );

    const maxY = Math.max(
      0,
      parentHeight - windowHeight
    );

    return {
      x: Math.min(
        Math.max(0, nextX),
        maxX
      ),
      y: Math.min(
        Math.max(0, nextY),
        maxY
      ),
    };
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (maximized) {
      return;
    }

    /*
     * Don't start dragging when clicking
     * one of the traffic-light buttons.
     */
    const target =
      event.target as HTMLElement;

    if (target.closest("button")) {
      return;
    }

    event.preventDefault();

    onFocus?.();

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: position.x,
      startY: position.y,
    };

    titleBarRef.current?.setPointerCapture(
      event.pointerId
    );
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    const drag =
      dragRef.current;

    if (
      !drag.active ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      drag.startPointerX;

    const deltaY =
      event.clientY -
      drag.startPointerY;

    const next = clampPosition(
      drag.startX + deltaX,
      drag.startY + deltaY
    );

    setPosition(next);
  }

  function stopDragging(
    event?: ReactPointerEvent<HTMLDivElement>
  ) {
    const drag =
      dragRef.current;

    if (!drag.active) {
      return;
    }

    if (
      event &&
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    dragRef.current = {
      ...drag,
      active: false,
      pointerId: null,
    };

    if (
      event &&
      titleBarRef.current?.hasPointerCapture(
        event.pointerId
      )
    ) {
      titleBarRef.current.releasePointerCapture(
        event.pointerId
      );
    }
  }

  const chrome = (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 12,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        y: 10,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 30,
      }}
      className="glass-window rounded-[12px] overflow-hidden flex flex-col w-full h-full"
      style={{
        boxShadow:
          "0 28px 90px -18px rgba(0,0,0,0.72), 0 0 0 1px var(--border)",
        border:
          "1px solid var(--border)",
      }}
    >
      {/* Title bar */}
      <div
        ref={titleBarRef}
        className="window-handle flex items-center px-3.5 py-2.5 select-none relative shrink-0"
        style={{
          background:
            "var(--titlebar)",
          borderBottom:
            "1px solid var(--border)",
          cursor: maximized
            ? "default"
            : dragRef.current.active
              ? "grabbing"
              : "grab",
          touchAction: "none",
          userSelect: "none",
        }}
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          stopDragging
        }
        onPointerCancel={
          stopDragging
        }
        onPointerLeave={(event) => {
          /*
           * Pointer capture keeps dragging active
           * even when the pointer leaves the title bar.
           */
          if (
            !dragRef.current.active
          ) {
            return;
          }

          handlePointerMove(event);
        }}
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

        <div className="absolute inset-0 flex items-center justify-center gap-1.5 pointer-events-none px-20">
          {icon && (
            <span className="text-xs leading-none shrink-0">
              {icon}
            </span>
          )}

          <span
            className="mono text-[11px] tracking-wide truncate max-w-[60%]"
            style={{
              color:
                "var(--text-muted)",
            }}
          >
            {title}
          </span>
        </div>

        <div
          className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
          style={{
            background:
              accentColor,
            opacity: 0.5,
          }}
        />
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-5 py-4">
        {children}
      </div>
    </motion.div>
  );

  /*
   * MAXIMIZED WINDOW
   */
  if (maximized) {
    return (
      <motion.div
        layout
        style={{
          position: "absolute",
          zIndex,
          inset: "44px 12px 84px 12px",
        }}
        onMouseDown={onFocus}
      >
        {chrome}
      </motion.div>
    );
  }

  return (
    <>
      {/* =====================================================
          DESKTOP
          ===================================================== */}
      <div
        ref={windowRef}
        className="hidden sm:block"
        style={{
          position: "absolute",
          zIndex,
          left: position.x,
          top: position.y,
          width,
          height,
          maxWidth: "92vw",
          maxHeight: "78vh",
        }}
        onMouseDown={onFocus}
      >
        {chrome}
      </div>

      {/* =====================================================
          MOBILE
          ===================================================== */}
      <motion.div
        className="sm:hidden"
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 8,
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
        }}
        style={{
          position: "absolute",
          zIndex,
          top: "58px",
          left: "10px",
          right: "10px",
          bottom: "76px",
        }}
        onMouseDown={onFocus}
      >
        {chrome}
      </motion.div>
    </>
  );
}