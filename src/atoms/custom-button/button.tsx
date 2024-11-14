interface customeBtnProps {
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLButtonElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<customeBtnProps> = ({
  title,
  type = 'button',
  onClick,
  children,
  className,
  style,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`bg-orange-500 text-white p-2 rounded hover:bg-white hover:text-black disabled:bg-gray-200 ${className}`}
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
