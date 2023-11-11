import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

export default function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type || "text"}
      className={clsx(
        "rounded-xl w-full border-primary-outline bg-white border-2 px-2 py-1 outline-none focus:border-primary-200",
        className
      )}
      {...props}
    />
  );
}
