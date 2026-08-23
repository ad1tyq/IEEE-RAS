"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-nav {
          position: relative;
        }
        .glass-nav ul {
          anchor-name: --nav-indicator;
        }
        .glass-nav a:hover,
        .glass-nav a:focus-visible {
          anchor-name: --nav-indicator;
        }
        .glass-nav::before,
        .glass-nav::after {
          content: "";
          position: absolute;
          position-anchor: --nav-indicator;
          top: calc(anchor(bottom) - 4px);
          right: calc(anchor(right) + 1rem);
          bottom: anchor(bottom);
          left: calc(anchor(left) + 1rem);
          transition: 500ms;
          transition-timing-function: linear(
            0, 0.008 1.1%, 0.031 2.2%, 0.129 4.8%, 0.257 7.2%, 0.671 14.2%,
            0.789 16.5%, 0.881 18.6%, 0.957 20.7%, 1.019 22.9%, 1.063 25.1%,
            1.094 27.4%, 1.114 30.7%, 1.112 34.5%, 1.018 49.9%, 0.99 59.1%, 1
          );
          border-radius: 9999px;
          pointer-events: none;
        }
        .glass-nav::before {
          background-color: rgba(255, 255, 255, 0.15);
          z-index: -2;
        }
        .glass-nav::after {
          backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.05);
          z-index: -1;
        }
        .glass-nav:has(a:hover, a:focus-visible)::before,
        .glass-nav:has(a:hover, a:focus-visible)::after {
          top: anchor(top);
          right: anchor(right);
          left: anchor(left);
        }
        .dark .glass-nav::before {
          background-color: rgba(255, 255, 255, 0.2);
        }
      ` }} />
      <div
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <nav className="glass-nav flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-2 py-1.5 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] backdrop-blur-2xl dark:border-white/10 dark:bg-transparent dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          {/* Nav items container */}
          <ul className="flex items-center gap-1 m-0 p-0 list-none">
            {navItems.map((navItem, idx: number) => (
              <li key={`link-${idx}`}>
                <a
                  href={navItem.link}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                  )}
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
