// src/components/common/ComponentCard.tsx

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      // YOSHH! Di sinilah rahasia Aktivitas Admin berubah jadi abu-abu elegan #24303F
      className={`rounded-2xl border border-gray-700 bg-[#24303F] shadow-sm ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-white">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      {/* Garis pembatasnya juga digelapkan pakai border-gray-700 */}
      <div className="p-4 border-t border-gray-700 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;