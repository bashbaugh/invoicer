import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  textarea?: boolean;
  placeholder?: string;
}

export default function Input({
  textarea,
  className,
  type,
  ...props
}: InputProps) {
  const Elem: any = textarea ? "textarea" : "input";
  return (
    <Elem
      type={type || "text"}
      rows={textarea ? 3 : undefined}
      className={clsx(
        "rounded-xl w-full border-primary-outline bg-white border-2 px-2 py-1 outline-none focus:border-primary-200",
        className
      )}
      onKeyDown={
        !textarea &&
        ((e: any) => {
          if (e.key === "Enter") {
            (e.target as any).blur();
          }
        })
      }
      {...props}
    />
  );
}
