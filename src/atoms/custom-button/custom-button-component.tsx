interface customeBtnProps {
  title?: string;
}

const CustomeButton: React.FC<customeBtnProps> = ({ title }) => {
  return <button className="bg-[#FF6600] text-white font-bold py-2 px-4 rounded focus:outline-none">{title}</button>;
};

export default CustomeButton;
