export function Badge({ children, variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-primary text-secondary",
    secondary: "bg-gray-dark text-white",
    outline: "border border-primary text-primary bg-transparent",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
