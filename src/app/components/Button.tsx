import React from "react";

function BaseballSvg() {
  return (
    <svg
      width="24" // Adjust size for the button
      height="24"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2" // Add margin to the right
    >
      <circle
        cx="25"
        cy="25"
        r="23"
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
      <path
        d="M15 12 C20 18, 30 18, 35 12"
        stroke="red"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M15 38 C20 32, 30 32, 35 38"
        stroke="red"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 15 C18 20, 18 30, 12 35"
        stroke="red"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M38 15 C32 20, 32 30, 38 35"
        stroke="red"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export default function Button({
  children,
  onClick,
  className = "",
  ...buttonProps
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...buttonProps}
      onClick={onClick}
      className={`flex items-center text-center justify-center bg-slate-950 text-slate-300 rounded-md text-sm px-12 md:text-lg md:p-4 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
