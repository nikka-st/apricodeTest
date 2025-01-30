interface CheckboxComponentProps {
  checked: boolean;
  onChange: () => void;
}

export const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  checked,
  onChange,
}) => {
  return (
    <input
      className="checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};
