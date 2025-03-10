"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const navLinks = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/game-schedule", text: "Game Schedule" },
  { href: "/contact", text: "Contact" }
];

function NavItem({
  href,
  children,
  selected = false
}: Readonly<{ href: string; children: React.ReactNode; selected?: Boolean }>) {
  return (
    <li>
      <Link
        href={href}
        className={twMerge(
          "text-yellow-900 text-2xl font-serif hover:bg-yellow-900 hover:text-slate-950 active:text-green-900 rounded",
          selected && "text-green-900"
        )}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Navigation() {
  const pathName = usePathname();
  return (
    <div className="flex justify-center gap-4 font-serif h-16 items-center">
      <nav>
        <ul className="flex justify-center gap-4 font-serif">
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              selected={pathName === link.href}
            >
              {link.text}
            </NavItem>
          ))}
        </ul>
      </nav>
    </div>
  );
}
