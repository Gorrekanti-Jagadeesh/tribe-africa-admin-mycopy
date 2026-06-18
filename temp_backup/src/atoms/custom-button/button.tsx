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
      className={`border bg-orange-500 text-white p-2 rounded hover:bg-white hover:text-black hover:border hover:border-orange-400 duration-300 disabled:bg-gray-500 ${className}`}
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
