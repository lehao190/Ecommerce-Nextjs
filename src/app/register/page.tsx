'use client';

import React, { useState } from 'react';
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
import Link from 'next/link';
import { Camera, Loader2, XCircle } from 'lucide-react';
import { gql } from 'graphql-request';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { convertFileToBase64 } from '@/utils/conversion/handle-base64';
import { AlertComponent } from '@/components/customs/callouts/Alert';
import { parse } from 'graphql';
import { handleRequest } from '@/utils/handle-requests';
import FormComponent from '@/components/customs/forms/Form';

// Sign up response type
type TRegisterResponse = {
  register: {
    id: number;
    username: string;
    email: string;
    avatar?: string;
  };
};

const ALERT_MESSAGES = {
  400: 'Bad request',
  403: 'Wrong password. Try again.',
  404: 'Email does not exist. Please provide the correct one.',
  409: 'Email already exists. Please provide another one.'
};
const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ONE_MEGABYTE = 1 * 1024 * 1024;

const signUpSchema = z
  .object({
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
      }),
    password: z.string().min(8, {
      message: 'Password must be at leaset 8 characters.'
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at leaset 8 characters.'
    }),
    avatar: z
      .custom<File>()
      .refine((file) => file.size < ONE_MEGABYTE, {
        message: 'The file must be below 1 MB.'
      })
      .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type), {
        message: 'The file must be of PNG, JPEG, JPG formats.'
      })
      .optional()
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match!',
    path: ['confirmPassword'] // path of error
  });

// Sign up fields
type TSignUpFields = z.infer<typeof signUpSchema>;

// Register component
const Register = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState('');

  const form = useForm<TSignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Sign up user
  const signUp = async (values: TSignUpFields): Promise<boolean> => {
    let base64Avatar: string | null = null;

    // Converting image file to base64 encoding if chosen
    if (values.avatar) {
      base64Avatar = await convertFileToBase64(values.avatar);
    }

    const signUpCredentials = parse(gql`
      mutation Register(
        $username: String!
        $email: String!
        $password: String!
        $avatar: String
      ) {
        register(
          registerInput: {
            username: $username
            email: $email
            password: $password
            avatar: $avatar
          }
        ) {
          id
          username
          email
        }
      }
    `);

    const [_, error] = await handleRequest<TRegisterResponse>(
      signUpCredentials,
      {
        username: values.username,
        email: values.email,
        password: values.password,
        avatar: base64Avatar
      }
    );

    if (error?.status === 409) {
      setAlertMessage(ALERT_MESSAGES[409]);
      return false;
    }

    return true;
  };

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);

    const isSignUpSuccess = await signUp(values);

    if (isSignUpSuccess) {
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
    }

    setLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-[80px]">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
              Create an account
            </h1>

            {alertMessage ? AlertComponent(alertMessage) : null}

            <FormComponent<Omit<TSignUpFields, 'avatar'>>
              fieldNames={[
                {
                  field: 'username',
                  type: 'text',
                },
                {
                  field: 'email',
                  type: 'text',
                },
                {
                  field: 'password',
                  type: 'password',
                },
                {
                  field: 'confirmPassword',
                  type: 'password',
                },
              ]}
              form={form}
              onSubmit={onSubmit}
            >
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload file</FormLabel>
                    <FormControl>
                      <label
                        htmlFor="avatar-input"
                        className="cursor-pointer flex justify-center items-center border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {avatar ? (
                          <Avatar className="h-[80px] w-[80px]">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-inherit">
                              <XCircle size={80} strokeWidth={1} color="red" />
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <Camera
                            className=" text-pink-500"
                            size={80}
                            strokeWidth={1}
                          />
                        )}

                        <Input
                          id="avatar-input"
                          type="file"
                          onChange={(e) => {
                            field.onChange(
                              e.target.files ? e.target.files[0] : null
                            );

                            if (e.target.files?.length) {
                              setAvatar(URL.createObjectURL(e.target.files[0]));
                            } else {
                              setAvatar(undefined);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading}
                type="submit"
                className="w-full text-white bg-primary hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? (
                  <Loader2 size={30} className="mr-2 animate-spin" />
                ) : (
                  'Create an account'
                )}
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </FormComponent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
