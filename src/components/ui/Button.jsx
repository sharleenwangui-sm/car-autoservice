export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-primary hover:bg-primary-dark text-secondary",
    secondary: "bg-gray-dark hover:bg-gray-700 text-white",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-secondary",
    ghost: "text-white hover:text-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-md gap-1.5",
    md: "px-6 py-3 text-sm rounded-lg gap-2",
    lg: "px-8 py-4 text-base rounded-lg gap-2",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}
