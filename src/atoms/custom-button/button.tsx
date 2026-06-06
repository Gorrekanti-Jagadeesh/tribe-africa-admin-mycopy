interface customeBtnProps {
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const Button: React.FC<customeBtnProps> = ({
  title,
  type = 'button',
  disabled = false,
  onClick,
  children,
  className,
  style,
  ...props
}) => {
  return (
    <button
      className={`bg-brand-orange text-white font-poppins font-semibold text-base px-6 py-2.5 rounded-[10px] transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      style={{ ...style }}
      type={type}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E05A00';
      }}
      onMouseLeave={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF6600';
      }}
      {...props}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
