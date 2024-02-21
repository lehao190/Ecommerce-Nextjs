'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch } from 'react-redux';
import { addCategoryCriteria, filterProductByCategories, removeCategoryCriteria } from '@/lib/redux/features/shop/shopSlice';
import { TProductCategory } from '@/types/product.types';

type Props = {
  checked: boolean;
  text: string;
  value: TProductCategory;
};

const CustomCheckbox = ({ text, value, checked }: Props) => {
  const [isChecked, setIsChecked] = useState(checked);
  const dispatch = useDispatch();

  // Update URL query when checkbox state changes
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    
    if (isChecked) {
      queryParams.set(value, 'true');
      dispatch(addCategoryCriteria(value));
      dispatch(filterProductByCategories());
    } else {
      queryParams.delete(value);
      dispatch(removeCategoryCriteria(value));
      dispatch(filterProductByCategories());
    }
    
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [isChecked, value]);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex space-x-2">
      <Checkbox
        id={value}
        value={value}
        className="mb-2"
        checked={isChecked}
        onCheckedChange={handleChange}
      />

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
