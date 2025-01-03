interface customeBtnProps {
  children?: string;
}

const Button: React.FC<customeBtnProps> = ({ children }) => {
  return <button className="bg-[#FF6600] text-white font-bold py-2 px-4 rounded focus:outline-none">{children}</button>;
};
export default Button;
