import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {
  defaultValue?: string;

  radioGroupItems: {
    text: string;
    value: string;
  }[];
};

const CustomRadioGroup = ({ radioGroupItems, defaultValue }: Props) => {
  return (
    <RadioGroup defaultValue={defaultValue}>
      {radioGroupItems.map((radioGroupItem, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={radioGroupItem.value} id={`radio_item_${index}`} />
          <Label htmlFor={`radio_item_${index}`}>{radioGroupItem.text}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default CustomRadioGroup;
