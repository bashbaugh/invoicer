import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-button-bg rounded-xl py-2 px-3 font-heading font-medium text-primary-800",
        className
      )}
    >
      {children}
    </button>
  );
}
