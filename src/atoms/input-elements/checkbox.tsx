interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange }) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" onChange={(e) => onChange(e.target.checked)} className="mr-2" />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
