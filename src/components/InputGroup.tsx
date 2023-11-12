import clsx from "clsx";

interface InputGroupProps {
  label: string;
  details?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function InputGroup({
  label,
  details,
  children,
  className,
}: InputGroupProps) {
  return (
    <label className={clsx("w-full flex flex-col gap-1", className)}>
      <span className="font-heading font-medium">{label}</span>
      {children}
      <div className="text-xs text-gray-400">{details}</div>
    </label>
  );
}
