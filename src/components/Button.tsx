import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  as?: React.ElementType;
}

export default function Button({
  onClick,
  children,
  className,
  icon,
  as,
}: ButtonProps) {
  const Comp = as || "button";

  return (
    <Comp
      onClick={onClick}
      className={clsx(
        "bg-button-bg flex items-center gap-1 rounded-xl py-2 px-3 font-heading font-medium text-primary-800",
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </Comp>
  );
}
