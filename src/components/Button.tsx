import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  onClick,
  children,
  className,
  icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-button-bg flex items-center gap-1 rounded-xl py-2 px-3 font-heading font-medium text-primary-800",
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
