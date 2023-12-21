'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Camera, Loader2, XCircle } from 'lucide-react';
import { gql } from 'graphql-request';
import { AlertComponent } from '@/components/customs/callouts/Alert';
import { parse } from 'graphql';
import { handleRequest } from '@/utils/handle-requests';
import FormComponent from '@/components/customs/forms/Form';
import Link from 'next/link';

// Sign up response type
type TEditUserResponse = {
  user: {
    id: number;
    username: string;
    email: string;
  };
};

const ALERT_MESSAGES = {
  400: 'Bad request',
  403: 'Wrong password. Try again.',
  404: 'Email does not exist. Please provide the correct one.',
  409: 'Email already exists. Please provide another one.'
};

const editUserSchema = z.object({
  username: z.string().min(8, {
    message: 'Username must be at least 8 characters'
  }),
  email: z
    .string()
    .min(8, {
      message: 'Email must be at leaset 8 characters.'
    })
    .email({
      message: 'Email is not valid!'
    })
});

// Sign up fields
type TProductFields = z.infer<typeof editUserSchema>;

const EditUser = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const form = useForm<TProductFields>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: 'John Doe',
      email: 'test@yahoo.com'
    }
  });

  const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
    console.log('Submit: ', values);
  };

  return (
    <section className="dark:bg-gray-900">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl mb-8">
        Edit User
      </h1>

      {alertMessage ? AlertComponent(alertMessage) : null}

      <FormComponent<TProductFields>
        fieldNames={[
          {
            field: 'email',
            type: 'text'
          },
          {
            field: 'username',
            type: 'text'
          }
        ]}
        form={form}
        onSubmit={onSubmit}
      >
        <div className="flex justify-end">
          <Link
            href="/login#"
            className="text-sm font-medium text-primary hover:underline dark:text-primary-500"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          disabled={loading}
          type="submit"
          className="w-full text-white bg-primary hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? (
            <Loader2 size={30} className="mr-2 animate-spin" />
          ) : (
            'Edit User'
          )}
        </Button>
      </FormComponent>
    </section>
  );
};

export default EditUser;
