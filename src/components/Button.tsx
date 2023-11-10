interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-button-bg rounded-xl py-2 px-3 font-heading font-medium text-primary-800"
    >
      {children}
    </button>
  );
}
