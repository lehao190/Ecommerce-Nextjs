import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  checked: boolean;
  text: string;
  value: string;
};

const CustomCheckbox = ({ text, value }: Props) => {
  return (
    <div className="flex space-x-2">
      <Checkbox id={value} value={value} className="mb-2" />

      <label
        htmlFor={value}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
};

export default CustomCheckbox;
