interface customeBtnProps {
  title?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const Button: React.FC<customeBtnProps> = ({ title, onClick, children, className, style, ...props }) => {
  return (
    <button
      className={`bg-orange-500 text-white p-2 rounded hover:bg-white hover:text-black ${className}`}
      onClick={onClick}
      style={style}
      {...props}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
