import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn
} from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

type TField<T> = {
  field: Path<T>;
  type: 'text' | 'password' | 'number' | 'textarea';
};

type props<T extends FieldValues> = {
  fieldNames: TField<T>[];
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children?: React.ReactNode;
};

// Reusable Form
const FormComponent = <T extends FieldValues>({
  fieldNames,
  form,
  onSubmit,
  children
}: props<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
      >
        {fieldNames.map((fieldName, index) => (
          <FormField
            key={index}
            name={fieldName.field}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldName.field === 'confirmPassword'
                    ? 'Confirm password'
                    : fieldName.field.charAt(0).toUpperCase() +
                      fieldName.field.slice(1)}
                </FormLabel>
                <FormControl>
                  {fieldName.type === 'textarea' ? (
                    <Textarea 
                      placeholder="Type something here."
                      {...field}
                    />
                  ) : (
                    <Input
                      type={fieldName.type}
                      className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={
                        fieldName.field === 'email'
                          ? 'john@gmail.com'
                          : fieldName.field === 'username'
                          ? 'John Doe'
                          : fieldName.type === 'password'
                          ? '••••••••'
                          : 'Type here.'
                      }
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {children}
      </form>
    </Form>
  );
};

export default FormComponent;
