"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

type Photo = {
  id: number;
  src: string;
  title: string;
  category: "Personal" | "KIIT" | "Projects";
};

const PHOTOS: Photo[] = [
  // ─────────────────────────────
  // PERSONAL
  // ─────────────────────────────

  {
    id: 1,
    src: "/photos/myphoto.png",
    title: "Shivam",
    category: "Personal",
  },

  // ─────────────────────────────
  // KIIT UNIVERSITY
  // ─────────────────────────────

  {
    id: 2,
    src: "/photos/kiit1.jpg",
    title: "KIIT University",
    category: "KIIT",
  },
  {
    id: 3,
    src: "/photos/kiit2.jpg",
    title: "KIIT Campus",
    category: "KIIT",
  },
  {
    id: 4,
    src: "/photos/kiit3.jpg",
    title: "KIIT Campus",
    category: "KIIT",
  },
  {
    id: 5,
    src: "/photos/kiit4.jpg",
    title: "KIIT University",
    category: "KIIT",
  },
  {
    id: 6,
    src: "/photos/kiit5.jpg",
    title: "KIIT Campus",
    category: "KIIT",
  },
  {
    id: 7,
    src: "/photos/kiit6.jpg",
    title: "KIIT University",
    category: "KIIT",
  },

  // ─────────────────────────────
  // PROJECTS
  // ─────────────────────────────

  {
    id: 8,
    src: "/photos/project1.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 9,
    src: "/photos/project2.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 10,
    src: "/photos/project3.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 11,
    src: "/photos/project4.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 12,
    src: "/photos/project5.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 13,
    src: "/photos/project6.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 14,
    src: "/photos/project7.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 15,
    src: "/photos/project8.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 16,
    src: "/photos/project9.png",
    title: "Project Preview",
    category: "Projects",
  },
  {
    id: 17,
    src: "/photos/project10.png",
    title: "Project Preview",
    category: "Projects",
  },
];

const FILTERS = ["All", "Personal", "KIIT", "Projects"] as const;

type Filter = (typeof FILTERS)[number];

export default function PhotosWindow() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredPhotos =
    filter === "All"
      ? PHOTOS
      : PHOTOS.filter((photo) => photo.category === filter);

  const selectedPhoto =
    selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  function closePreview() {
    setSelectedIndex(null);
  }

  function previousPhoto() {
    if (selectedIndex === null || filteredPhotos.length === 0) return;

    setSelectedIndex(
      selectedIndex === 0
        ? filteredPhotos.length - 1
        : selectedIndex - 1
    );
  }

  function nextPhoto() {
    if (selectedIndex === null || filteredPhotos.length === 0) return;

    setSelectedIndex(
      selectedIndex === filteredPhotos.length - 1
        ? 0
        : selectedIndex + 1
    );
  }

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="shrink-0 mb-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div
                className="mono text-[9px] uppercase tracking-[0.2em] mb-1.5"
                style={{ color: "var(--text-faint)" }}
              >
                PERSONAL GALLERY
              </div>

              <h2
                className="display text-2xl font-semibold tracking-tight"
                style={{ color: "var(--text)" }}
              >
                Photos
              </h2>

              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                A few moments behind the developer.
              </p>
            </div>

            <div
              className="mono text-[9px] px-2.5 py-1.5 rounded-md"
              style={{
                color: "var(--text-faint)",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid var(--border)",
              }}
            >
              {filteredPhotos.length}{" "}
              {filteredPhotos.length === 1 ? "PHOTO" : "PHOTOS"}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {FILTERS.map((item) => {
              const active = filter === item;

              return (
                <button
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setSelectedIndex(null);
                  }}
                  className="mono text-[9px] px-3 py-1.5 rounded-full transition-all"
                  style={{
                    color: active
                      ? "#06100e"
                      : "var(--text-muted)",
                    background: active
                      ? "var(--accent)"
                      : "rgba(255,255,255,0.035)",
                    border: active
                      ? "1px solid transparent"
                      : "1px solid var(--border)",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto pr-1">
          {filteredPhotos.length === 0 ? (
            <div
              className="h-full min-h-48 flex items-center justify-center rounded-xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px dashed var(--border)",
              }}
            >
              <p
                className="text-xs"
                style={{ color: "var(--text-faint)" }}
              >
                No photos in this collection yet.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredPhotos.map((photo, index) => (
                  <motion.button
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => setSelectedIndex(index)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl text-left"
                    style={{
                      background: "var(--surface-alt)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* Hover overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-200
                        flex
                        items-end
                      "
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.72), transparent 65%)",
                      }}
                    >
                      <div className="p-3">
                        <div
                          className="text-[11px] font-medium"
                          style={{ color: "#fff" }}
                        >
                          {photo.title}
                        </div>

                        <div
                          className="mono text-[8px] uppercase tracking-wider mt-0.5"
                          style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                          {photo.category}
                        </div>
                      </div>
                    </div>

                    {/* Preview icon */}
                    <div
                      className="
                        absolute
                        top-2.5
                        right-2.5
                        w-7
                        h-7
                        rounded-full
                        flex
                        items-center
                        justify-center
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                      "
                      style={{
                        background: "rgba(0,0,0,0.45)",
                        backdropFilter: "blur(10px)",
                        color: "#fff",
                      }}
                    >
                      <Maximize2 size={12} />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* =================================================
          PHOTO PREVIEW
      ================================================= */}

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.78)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            onClick={closePreview}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 25,
              }}
              className="relative max-w-[92vw] max-h-[88vh]"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="
                  max-w-[92vw]
                  max-h-[78vh]
                  object-contain
                  rounded-xl
                  shadow-2xl
                "
              />

              {/* Close */}
              <button
                onClick={closePreview}
                aria-label="Close photo"
                className="
                  absolute
                  -top-3
                  -right-3
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background: "rgba(20,24,32,0.9)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                <X size={16} />
              </button>

              {/* Previous */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={previousPhoto}
                  aria-label="Previous photo"
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    background: "rgba(20,24,32,0.8)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Next */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={nextPhoto}
                  aria-label="Next photo"
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    background: "rgba(20,24,32,0.8)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              )}

              {/* Caption */}
              <div
                className="absolute left-0 right-0 -bottom-12 text-center"
              >
                <div
                  className="text-xs font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {selectedPhoto.title}
                </div>

                <div
                  className="mono text-[8px] uppercase tracking-wider mt-1"
                  style={{ color: "var(--text-faint)" }}
                >
                  {selectedPhoto.category}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}