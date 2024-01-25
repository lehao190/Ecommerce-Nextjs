'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AlertComponent } from '@/components/customs/callouts/Alert';
import FormComponent from '@/components/customs/forms/Form';

const ALERT_MESSAGES = {
  403: 'Wrong password. Try again.',
  404: 'Email does not exist. Please provide the correct one.'
};

const loginSchema = z.object({
  email: z
    .string()
    .min(8, {
      message: 'Email must be at leaset 8 characters.'
    })
    .email({
      message: 'Email is not valid!'
    }),
  password: z.string().min(8, {
    message: 'Password must be at leaset 8 characters.'
  })
});

// Login form's fields
type TLoginFields = z.infer<typeof loginSchema>;

// Login Component
const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const form = useForm<TLoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Sign in
  const onSubmit = async (values: TLoginFields) => {
    setLoading(true);

    const response = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password
    });

    if (response?.ok) {
      setLoading(false);
      router.push('/');
    } else {
      setLoading(false);
      const statusCode = Number(response?.error);

      if (statusCode === 403) {
        setAlertMessage(ALERT_MESSAGES[403]);
      } else if (statusCode === 404) {
        setAlertMessage(ALERT_MESSAGES[404]);
      }
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
              Login
            </h1>

            {alertMessage ? AlertComponent(alertMessage) : null}

            {
              <FormComponent<TLoginFields>
                fieldNames={[
                  {
                    field: 'email',
                    type: 'text'
                  },
                  {
                    field: 'password',
                    type: 'password'
                  }
                ]}
                form={form}
                onSubmit={onSubmit}
              >
                <div className="flex justify-end">
                  <Link
                    href="/login#"
                    className="text-sm font-medium text-primary hover:underline dark:text-primary-500"
                    onClick={() => signOut({ redirect: false })}
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
                    'Login'
                  )}
                </Button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="font-medium text-primary hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </Link>
                </p>
              </FormComponent>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
