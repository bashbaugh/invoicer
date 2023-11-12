interface InputGroupProps {
  label: string;
  details?: string;
  children: React.ReactNode;
}

export default function InputGroup({
  label,
  details,
  children,
}: InputGroupProps) {
  return (
    <label className="w-full flex flex-col gap-1">
      <span className="font-heading font-medium">{label}</span>
      {children}
      <div className="text-xs text-gray-400">{details}</div>
    </label>
  );
}
