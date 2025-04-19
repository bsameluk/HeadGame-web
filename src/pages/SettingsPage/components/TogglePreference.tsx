interface TogglePreferenceProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const TogglePreference: React.FC<TogglePreferenceProps> = ({ title, description, checked, onChange }) => {
  return <div className="flex justify-between items-center">
    <div>
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <input
      type="checkbox"
      className="toggle toggle-neutral"
      checked={checked}
      onChange={() => onChange(!checked)}
    />
  </div>;
};

export default TogglePreference;
