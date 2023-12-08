import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  checked: boolean;
  text: string;
  value: string;
};

const FilterCheckbox = ({ checked, text, value }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={value} checked={checked} className="mb-2" />

      <label
        htmlFor={value}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
};

export default FilterCheckbox;
