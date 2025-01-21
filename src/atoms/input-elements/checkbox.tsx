interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mr-2" />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
