'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect } from 'react';

type Props = {
  defaultValue?: string;

  radioGroupItems: {
    text: string;
    value: string;
  }[];
};

const CustomRadioGroup = ({ radioGroupItems, defaultValue }: Props) => {
  const handleChange = (value: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('price_filter', value);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    // Dispatch filter action here
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('price_filter', defaultValue ?? '');
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    // Dispatch filter action here
  }, []);

  return (
    <RadioGroup defaultValue={defaultValue} onValueChange={handleChange}>
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
