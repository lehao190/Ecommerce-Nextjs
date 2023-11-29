'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
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
import { initializeGraphqlClient } from '@/lib/graphql';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type TRegisterResponse = {
  register: {
    id: number;
    username: string;
    email: string;
    avatar?: string;
  };
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
      message: 'Email must be at leaset 8 characters.'
    }),
    confirmPassword: z.string().min(8, {
      message: 'Email must be at leaset 8 characters.'
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

const Register = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const convertFileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data: prefix and the mime type from the result
        const base64 = reader.result as string;
        const base64WithoutPrefix = base64.split(',')[1];
        resolve(base64WithoutPrefix);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const signUp = async (values: z.infer<typeof signUpSchema>) => {
    let base64Avatar: string | null = null;

    if (values.avatar) {
      base64Avatar = await convertFileToBase64(values.avatar);
    }

    const signUpCredentials = gql`
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
    `;

    const { register: data } =
      await initializeGraphqlClient().request<TRegisterResponse>(
        signUpCredentials,
        {
          username: values.username,
          email: values.email,
          password: values.password,
          avatar: base64Avatar
        }
      );
  };

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);

    try {
      await signUp(values);

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
        console.error('Server error: ', response?.error);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      return;
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-[80px]">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
              Create an account
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload file</FormLabel>
                      <FormControl>
                        <label
                          htmlFor="avatar-input"
                          className="cursor-pointer flex justify-center items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {avatar ? (
                            <Avatar className="h-[80px] w-[80px]">
                              <AvatarImage src={avatar} />
                              <AvatarFallback className="bg-inherit">
                                <XCircle
                                  size={80}
                                  strokeWidth={1}
                                  color="red"
                                />
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
                                setAvatar(
                                  URL.createObjectURL(e.target.files[0])
                                );
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
