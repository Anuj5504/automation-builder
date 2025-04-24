'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EditUserProfileSchema } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

type Props = {}

const ProfileForm = (props: Props) => {
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: 'onChange',
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })
  return (
    <Form {...form}>
      <form className='flex flex-col gap-6' onSubmit={() => { }}>
        <FormField disabled={isLoading} control={form.control} name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User full name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                />
              </FormControl>
              <FormMessage   />
            </FormItem>
          )}
        />
        <FormField disabled={isLoading} control={form.control} name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email"
                />
              </FormControl>
              <FormMessage   />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ProfileForm