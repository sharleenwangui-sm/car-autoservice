export function Input({
  type = "text",
  placeholder,
  className = "",
  icon,
  ...props
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors ${icon ? "pr-12" : ""} ${className}`}
        {...props}
      />
      {icon && (
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary hover:bg-primary-dark rounded-lg flex items-center justify-center transition-colors"
        >
          {icon}
        </button>
      )}
    </div>
  );
}
