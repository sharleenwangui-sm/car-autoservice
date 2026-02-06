export function SectionTitle({
  title,
  highlight,
  subtitle,
  centered = false,
  className = "",
}) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title} {highlight && <span className="text-primary">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
