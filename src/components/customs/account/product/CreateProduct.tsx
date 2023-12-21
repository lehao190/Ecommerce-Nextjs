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
import { useRouter } from 'next/navigation';
import { convertFileToBase64 } from '@/utils/conversion/handle-base64';
import { AlertComponent } from '@/components/customs/callouts/Alert';
import { parse } from 'graphql';
import { handleRequest } from '@/utils/handle-requests';
import FormComponent from '@/components/customs/forms/Form';

// Sign up response type
type TCreateProductResponse = {
  product: {
    id: number;
    name: string;
    description: string;
    quantity: string;
    image?: string;
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

const createProductSchema = z
  .object({
    name: z.string().min(8, {
      message: 'Name must be at least 8 characters'
    }),
    description: z
      .string()
      .min(20, {
        message: 'Desciption must be at leaset 20 characters.'
      }),
    quantity: z.coerce.number().positive(),
    image: z
      .custom<File>()
      .refine((file) => file.size < ONE_MEGABYTE, {
        message: 'The file must be below 1 MB.'
      })
      .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type), {
        message: 'The file must be of PNG, JPEG, JPG formats.'
      })
      .optional()
  })

// Sign up fields
type TProductFields = z.infer<typeof createProductSchema>;

// Register component
const CreateProduct = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState('');

  const form = useForm<TProductFields>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      quantity: 0,
    }
  });

  // const signUp = async (values: TProductFields): Promise<boolean> => {
  //   let base64Avatar: string | null = null;

  //   // Converting image file to base64 encoding if chosen
  //   if (values.image) {
  //     base64Avatar = await convertFileToBase64(values.image);
  //   }

  //   const signUpCredentials = parse(gql`
  //     mutation Register(
  //       $username: String!
  //       $email: String!
  //       $password: String!
  //       $image: String
  //     ) {
  //       register(
  //         registerInput: {
  //           username: $username
  //           email: $email
  //           password: $password
  //           image: $image
  //         }
  //       ) {
  //         id
  //         username
  //         email
  //       }
  //     }
  //   `);

  //   const [_, error] = await handleRequest<TCreateProductResponse>(
  //     signUpCredentials,
  //     {
  //       username: values.username,
  //       email: values.email,
  //       password: values.password,
  //       image: base64Avatar
  //     }
  //   );

  //   if (error?.status === 409) {
  //     setAlertMessage(ALERT_MESSAGES[409]);
  //     return false;
  //   }

  //   return true;
  // };

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    console.log('Submit: ', values);

    // setLoading(true);

    // const isSignUpSuccess = await signUp(values);

    // if (isSignUpSuccess) {
    //   const response = await signIn('credentials', {
    //     redirect: false,
    //     email: values.email,
    //     password: values.password
    //   });

    //   if (response?.ok) {
    //     setLoading(false);
    //     router.push('/');
    //   } else {
    //     setLoading(false);
    //     const statusCode = Number(response?.error);

    //     if (statusCode === 403) {
    //       setAlertMessage(ALERT_MESSAGES[403]);
    //     } else if (statusCode === 404) {
    //       setAlertMessage(ALERT_MESSAGES[404]);
    //     }
    //   }
    // }

    // setLoading(false);
  };

  return (
    <section className="dark:bg-gray-900">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl mb-8">
        Create Product
      </h1>

      {alertMessage ? AlertComponent(alertMessage) : null}

      <FormComponent<Omit<TProductFields, 'image'>>
        fieldNames={[
          {
            field: 'name',
            type: 'text',
          },
          {
            field: 'description',
            type: 'textarea',
          },
          {
            field: 'quantity',
            type: 'number',
          },
        ]}
        form={form}
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload file</FormLabel>
              <FormControl>
                <label
                  htmlFor="image-input"
                  className="cursor-pointer flex justify-center items-center border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {image ? (
                    <Avatar className="h-[80px] w-[80px]">
                      <AvatarImage src={image} />
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
                    id="image-input"
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files ? e.target.files[0] : null);

                      if (e.target.files?.length) {
                        setImage(URL.createObjectURL(e.target.files[0]));
                      } else {
                        setImage(undefined);
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
            'Create Product'
          )}
        </Button>
      </FormComponent>
    </section>
  );
};

export default CreateProduct;
