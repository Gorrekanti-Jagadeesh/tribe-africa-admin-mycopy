interface DateInputProps {
  value?: string;
  onChange: (date: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500"
    />
  );
};

export default DateInput;
