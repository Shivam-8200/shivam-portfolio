"use client";

import { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";

import {
  Folder,
  TerminalSquare,
  Sparkles,
  Mail,
  FileText,
  Github,
  Images,
} from "lucide-react";


import BootScreen from "./BootScreen";
import MenuBar from "./MenuBar";
import Dock, { DockApp } from "./Dock";
import StartMenu from "./StartMenu";
import { FolderIcon, FileIcon } from "./FolderIcon";
import Window from "./Window";

import AboutWindow from "./windows/AboutWindow";
import SkillsWindow from "./windows/SkillsWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import TerminalWindow from "./windows/TerminalWindow";
import ChatWindow from "./windows/ChatWindow";
import ContactWindow from "./windows/ContactWindow";
import ProjectDetailWindow from "./windows/ProjectDetailWindow";
import FinderWindow from "./windows/FinderWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import PhotosWindow from "./windows/PhotosWindow";

import { PROFILE, PROJECTS } from "@/lib/data";


/* =========================================================
   APPLICATION TYPES
   ========================================================= */

type AppId =
  | "finder"
  | "projects"
  | "photos"
  | "about"
  | "skills"
  | "experience"
  | "terminal"
  | "chat"
  | "contact";


type WinKind = "app" | "project";


type OpenWindow = {
  key: string;
  kind: WinKind;
  id: string;
  z: number;
  x: number;
  y: number;
  minimized: boolean;
  maximized: boolean;
};


let zCounter = 10;


/* =========================================================
   APPLICATION METADATA
   ========================================================= */

const APP_META: Record<
  AppId,
  {
    title: string;
    icon: string;
    width: number;
    height: number;
    accent: "teal" | "amber";
  }
> = {
  finder: {
    title: "Finder",
    icon: "📁",
    width: 620,
    height: 470,
    accent: "teal",
  },

  projects: {
  title: "Projects",
  icon: "🚀",
  width: 760,
  height: 520,
  accent: "teal",
},

photos: {
  title: "Photos",
  icon: "📸",
  width: 760,
  height: 520,
  accent: "teal",
},

  about: {
    title: "about-me.md",
    icon: "👤",
    width: 480,
    height: 380,
    accent: "teal",
  },

  skills: {
    title: "skills.json",
    icon: "🧩",
    width: 500,
    height: 450,
    accent: "amber",
  },

  experience: {
    title: "experience.log",
    icon: "💼",
    width: 520,
    height: 360,
    accent: "amber",
  },

  terminal: {
    title: "terminal",
    icon: "⌨️",
    width: 560,
    height: 400,
    accent: "teal",
  },

  chat: {
    title: "ask-ai.exe",
    icon: "✦",
    width: 460,
    height: 520,
    accent: "amber",
  },

  contact: {
    title: "contact.form",
    icon: "✉️",
    width: 440,
    height: 480,
    accent: "teal",
  },
};


/* =========================================================
   APPLICATION COMPONENTS
   ========================================================= */

const APP_COMPONENTS: Record<
  Exclude<AppId, "finder" | "projects" | "photos">,
  React.ComponentType
> = {
  about: AboutWindow,
  skills: SkillsWindow,
  experience: ExperienceWindow,
  terminal: TerminalWindow,
  chat: ChatWindow,
  contact: ContactWindow,
};
/* =========================================================
   DESKTOP DOCK
   ========================================================= */

const DOCK_APPS: DockApp[] = [
  {
    id: "finder",
    label: "Finder",
    icon: <Folder size={22} color="#ffffff" strokeWidth={2.2} />,
    bg: "linear-gradient(135deg, #38bdf8, #2563eb)",
  },

  {
    id: "projects",
    label: "Projects",
    icon: <Folder size={22} color="#ffffff" strokeWidth={2.2} />,
    bg: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },

  {
    id: "photos",
    label: "Photos",
    icon: <Images size={22} color="#ffffff" strokeWidth={2.2} />,
    bg: "conic-gradient(from 210deg, #38bdf8, #a78bfa, #f472b6, #38bdf8)",
  },

  {
    id: "terminal",
    label: "Terminal",
    icon: (
      <TerminalSquare
        size={22}
        color="#7dd3fc"
        strokeWidth={2.2}
      />
    ),
    bg: "linear-gradient(160deg, #182235, #05070d)",
  },

  {
    id: "chat",
    label: "AI",
    icon: (
      <Sparkles
        size={22}
        color="#ffffff"
        strokeWidth={2.2}
      />
    ),
    bg: "linear-gradient(135deg, #7c3aed, #4f46e5)",
  },

  {
    id: "resume",
    label: "Resume",
    icon: (
      <FileText
        size={22}
        color="#ffffff"
        strokeWidth={2.2}
      />
    ),
    bg: "linear-gradient(135deg, #64748b, #334155)",
  },

  {
    id: "github",
    label: "GitHub",
    icon: (
      <Github
        size={22}
        color="#ffffff"
        strokeWidth={2.2}
      />
    ),
    bg: "linear-gradient(135deg, #374151, #111827)",
  },

  {
    id: "contact",
    label: "Contact",
    icon: (
      <Mail
        size={22}
        color="#ffffff"
        strokeWidth={2.2}
      />
    ),
    bg: "linear-gradient(135deg, #06b6d4, #0e7490)",
  },
];



/* =========================================================
   INTERACTIVE HERO NAME
   ========================================================= */

function InteractiveName() {
  const [activeLetter, setActiveLetter] =
    useState<number | null>(null);

  const name = "Shivam Prasad";

  return (
    <span
      className="inline-flex flex-wrap justify-center"
      aria-label={name}
      onMouseLeave={() => setActiveLetter(null)}
    >
      {name.split("").map((letter, index) => {
        const distance =
          activeLetter === null
            ? 99
            : Math.abs(index - activeLetter);

        const scale =
          distance === 0
            ? 1.1
            : distance === 1
              ? 1.045
              : distance === 2
                ? 1.018
                : 1;

        const translateY =
          distance === 0
            ? -4
            : distance === 1
              ? -2
              : 0;

        const isActive =
          distance === 0;

        return (
          <span
            key={`${letter}-${index}`}
            onMouseEnter={() =>
              setActiveLetter(index)
            }
            className="inline-block"
            style={{
              transform: `translateY(${translateY}px) scale(${scale})`,
              color: isActive
                ? "var(--accent)"
                : "var(--text)",
              textShadow: isActive
                ? "0 0 24px rgba(125, 211, 252, 0.38)"
                : "none",
              transition:
                "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), color 180ms ease, text-shadow 180ms ease",
              willChange: "transform",
              whiteSpace:
                letter === " "
                  ? "pre"
                  : undefined,
            }}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
}











/* =========================================================
   DESKTOP
   ========================================================= */

export default function Desktop() {
  const [booted, setBooted] = useState(false);

  const [startOpen, setStartOpen] = useState(false);

  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);


  /* =======================================================
     OPEN WINDOW
     ======================================================= */

  const launch = useCallback(
    (kind: WinKind, id: string) => {
      setStartOpen(false);

      const key = `${kind}:${id}`;

      setOpenWindows((prev) => {
        const existing = prev.find(
          (window) => window.key === key
        );

        zCounter += 1;

        if (existing) {
          return prev.map((window) =>
            window.key === key
              ? {
                  ...window,
                  z: zCounter,
                  minimized: false,
                }
              : window
          );
        }

        const offset = Math.min(prev.length * 24, 120);

        return [
          ...prev,
          {
            key,
            kind,
            id,
            z: zCounter,
            x: 80 + offset,
            y: 70 + offset,
            minimized: false,
            maximized: false,
          },
        ];
      });
    },
    []
  );


  /* =======================================================
     CLOSE
     ======================================================= */

  const closeWindow = useCallback((key: string) => {
    setOpenWindows((prev) =>
      prev.filter((window) => window.key !== key)
    );
  }, []);


  /* =======================================================
     MINIMIZE
     ======================================================= */

  const minimizeWindow = useCallback((key: string) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.key === key
          ? {
              ...window,
              minimized: true,
            }
          : window
      )
    );
  }, []);


  /* =======================================================
     MAXIMIZE
     ======================================================= */

  const toggleMaximize = useCallback((key: string) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.key === key
          ? {
              ...window,
              maximized: !window.maximized,
            }
          : window
      )
    );
  }, []);


  /* =======================================================
     FOCUS
     ======================================================= */

  const focusWindow = useCallback((key: string) => {
    zCounter += 1;

    setOpenWindows((prev) =>
      prev.map((window) =>
        window.key === key
          ? {
              ...window,
              z: zCounter,
            }
          : window
      )
    );
  }, []);


  /* =======================================================
     OPEN INTERNAL APP
     ======================================================= */

  const openApp = useCallback(
    (id: AppId) => {
      launch("app", id);
    },
    [launch]
  );


  /* =======================================================
     OPEN PROJECT
     ======================================================= */

  const openProject = useCallback(
    (id: string) => {
      launch("project", id);
    },
    [launch]
  );


  /* =======================================================
     DOCK ACTIONS
     ======================================================= */

  const dockClick = useCallback(
    (id: string) => {
      switch (id) {
        case "finder":
          openApp("finder");
          return;

        case "terminal":
          openApp("terminal");
          return;

        case "chat":
          openApp("chat");
          return;

        case "contact":
          openApp("contact");
          return;

        case "projects":
  openApp("projects");
  return;

        case "resume":
          if (PROFILE.resumeUrl) {
            window.open(
              PROFILE.resumeUrl,
              "_blank",
              "noopener,noreferrer"
            );
          }
          return;

        case "github":
          if (PROFILE.github) {
            window.open(
              PROFILE.github,
              "_blank",
              "noopener,noreferrer"
            );
          }
          return;

        case "photos":
  openApp("photos");
  return;

        default:
          return;
      }
    },
    [openApp, openProject]
  );


  /* =======================================================
     FINDER → EXISTING WINDOWS
     ======================================================= */

  const finderOpen = useCallback(
    (id: "about" | "skills" | "experience") => {
      openApp(id);
    },
    [openApp]
  );


  /* =======================================================
     DOCK STATE
     ======================================================= */

  const dockApps: DockApp[] = useMemo(() => {
  return DOCK_APPS.map((app) => {
    const isOpen = openWindows.some(
      (window) =>
        window.key === `app:${app.id}` &&
        !window.minimized
    );

    const hasProjectWindow =
      app.id === "projects" &&
      openWindows.some(
        (window) => window.kind === "project"
      );

    return {
      ...app,
      running: isOpen || hasProjectWindow,
    };
  });
}, [openWindows]);

  /* =======================================================
     FOCUSED WINDOW
     ======================================================= */

  const focusedWindow = useMemo(() => {
    const visible = openWindows.filter(
      (window) => !window.minimized
    );

    if (visible.length === 0) {
      return undefined;
    }

    return visible.reduce(
      (top, window) =>
        window.z > top.z ? window : top,
      visible[0]
    );
  }, [openWindows]);


  /* =======================================================
     MENU BAR TITLE
     ======================================================= */

  const activeTitle = useMemo(() => {
    if (!focusedWindow) {
      return undefined;
    }

    if (focusedWindow.kind === "app") {
      return APP_META[
        focusedWindow.id as AppId
      ]?.title;
    }

    const project = PROJECTS.find(
      (project) =>
        project.id === focusedWindow.id
    );

    return project?.name;
  }, [focusedWindow]);


  /* =======================================================
     BOOT
     ======================================================= */

  if (!booted) {
    return (
      <BootScreen
        onDone={() => setBooted(true)}
      />
    );
  }


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      className="relative w-full h-[100dvh] overflow-hidden"
      onClick={() =>
        startOpen && setStartOpen(false)
      }
    >

      {/* Background */}

      <div className="wallpaper" />

      <div className="wallpaper-grain" />

      <div className="wallpaper-vignette" />


      {/* Menu bar */}

      <MenuBar
        activeTitle={activeTitle}
        onLogoClick={() =>
          setStartOpen((value) => !value)
        }
      />


      {/* =================================================
          DESKTOP SHORTCUTS
          ================================================= */}

      <div
        className="hidden sm:flex absolute top-16 left-5 flex-col gap-3 z-10"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <FolderIcon
  label="Projects"
  onClick={() => openApp("projects")}
/>

        <FolderIcon
          label="About"
          onClick={() =>
            openApp("about")
          }
        />

        <FileIcon
          label="Resume.pdf"
          href={PROFILE.resumeUrl}
        />

      </div>


      {/* =================================================
          HERO / DESKTOP CENTER
          ================================================= */}

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
          px-6
          text-center
          z-[2]
        "
      >

        <div className="max-w-3xl">

          <div
            className="
              mono
              text-[10px]
              md:text-xs
              tracking-[0.28em]
              uppercase
              mb-5
            "
            style={{
              color: "var(--accent)",
            }}
          >
            SHIVAM.DEV / WORKSPACE
          </div>


          <h1
  className="
    display
    text-5xl
    md:text-7xl
    lg:text-8xl
    font-semibold
    tracking-tight
    pointer-events-auto
    cursor-default
  "
  style={{
    color: "var(--text)",
  }}
>
  <InteractiveName />
</h1>


          <p
            className="
              mt-4
              text-base
              md:text-lg
              max-w-xl
              mx-auto
            "
            style={{
              color: "var(--text-muted)",
            }}
          >
            Full-Stack Developer · AI · Automation
          </p>


          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
              text-xs
            "
            style={{
              color: "var(--text-faint)",
            }}
          >

            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "#4ade80",
                boxShadow:
                  "0 0 12px rgba(74,222,128,0.65)",
              }}
            />

            <span>
              Open to opportunities
            </span>

            <span>·</span>

            <span>
              B.Tech CSE · 2026
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          OPEN WINDOWS
          ================================================= */}

      <AnimatePresence>
        {openWindows
          .filter(
            (window) => !window.minimized
          )
          .map((window) => {

            const meta =
              window.kind === "app"
                ? APP_META[
                    window.id as AppId
                  ]
                : null;

            const project =
              window.kind === "project"
                ? PROJECTS.find(
                    (item) =>
                      item.id === window.id
                  )
                : null;

            const title =
              meta?.title ||
              project?.name ||
              "";

            const icon =
              meta?.icon ||
              "📁";

            const width =
              meta?.width ||
              520;

            const height =
              meta?.height ||
              460;

            const accent =
              meta?.accent ||
              "teal";


            let content: React.ReactNode = null;


            if (window.kind === "app") {

  if (window.id === "finder") {
  content = (
    <FinderWindow
      onOpen={finderOpen}
    />
  );
} else if (window.id === "projects") {
  content = (
    <ProjectsWindow
      onOpenProject={openProject}
    />
  );
} else if (window.id === "photos") {
  content = <PhotosWindow />;
} else {
  const Comp =
    APP_COMPONENTS[
      window.id as Exclude<AppId, "finder" | "projects" | "photos">
    ];

  content = <Comp />;
}

} else if (project) {
              content = (
                <ProjectDetailWindow
                  project={project}
                />
              );

            }


            return (
              <Window
                key={window.key}
                title={title}
                icon={icon}
                width={width}
                height={height}
                x={window.x}
                y={window.y}
                zIndex={window.z}
                accent={accent}
                maximized={
                  window.maximized
                }
                onClose={() =>
                  closeWindow(
                    window.key
                  )
                }
                onMinimize={() =>
                  minimizeWindow(
                    window.key
                  )
                }
                onMaximize={() =>
                  toggleMaximize(
                    window.key
                  )
                }
                onFocus={() =>
                  focusWindow(
                    window.key
                  )
                }
              >
                {content}
              </Window>
            );
          })}
      </AnimatePresence>


      {/* =================================================
          START MENU
          ================================================= */}

      <AnimatePresence>
        {startOpen && (
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <StartMenu
              onLaunch={(id) =>
                openApp(id)
              }
            />
          </div>
        )}
      </AnimatePresence>


      {/* =================================================
          DOCK
          ================================================= */}

      <Dock
        apps={dockApps}
        onLaunch={dockClick}
      />

    </div>
  );
}