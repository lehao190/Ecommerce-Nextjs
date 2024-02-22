'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import FormComponent from '../../forms/Form';
import { Button } from '@/components/ui/button';

const commentSchema = z.object({
  comment: z.string().min(8, {
    message: 'Comment must be at leaset 8 characters.'
  }),
  rating: z.coerce.number().positive().gt(0).lt(6)
});

// Login form's fields
type TCommentFields = z.infer<typeof commentSchema>;

const CommentForm = () => {
  const form = useForm<TCommentFields>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
      rating: 0
    }
  });

  const onSubmit = async (values: TCommentFields) => {
    console.log('Submit Comment: ', values);
  };

  return (
    <>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          You need to login to be able to review.
        </AlertDescription>
      </Alert>

      <FormComponent<TCommentFields>
        fieldNames={[
          {
            field: 'rating',
            type: 'number'
          },
          {
            field: 'comment',
            type: 'textarea'
          }
        ]}
        form={form}
        onSubmit={onSubmit}
      >
        <Button
          type="submit"
          className="text-white bg-primary hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </Button>
      </FormComponent>
    </>
  );
};

export default CommentForm;
