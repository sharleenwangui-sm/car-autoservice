import { forwardRef } from "react";

export const Card = forwardRef(function Card(
  { children, className = "", hover = true, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl shadow-lg ${hover ? "hover:shadow-xl transition-shadow duration-300" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

export function CardHeader({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}

export function CardIcon({ children, className = "" }) {
  return (
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${className}`}
    >
      {children}
    </div>
  );
}
