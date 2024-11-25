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
      className={`bg-orange-500 text-white p-2 rounded hover:bg-white hover:text-black duration-300 disabled:bg-gray-500 ${className}`}
      type={type}
      onClick={onClick}
      style={style}
      {...props}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
