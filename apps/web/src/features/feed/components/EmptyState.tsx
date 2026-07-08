import Image from "next/image";

type EmptyStateProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex w-full max-w-[250px] flex-col items-center justify-center text-center">
      <Image
        src="/empty.svg"
        alt="Empty state illustration"
        width={250}
        height={120}
        className="mb-4 h-auto w-full max-w-[220px]"
      />

      <h2 className="text-[20px] font-bold text-primary-red">{title}</h2>

      {description && (
        <p className="text-[14px] font-medium text-dark-gray text-center">
          {description}
        </p>
      )}

      {buttonText && (
        <button
          type="button"
          className="text-sm font-medium text-dark-gray transition hover:opacity-90"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
