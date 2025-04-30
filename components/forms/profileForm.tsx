'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EditUserProfileSchema } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField disabled={true} control={form.control} name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder="Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-64 self-star cursor-pointer bg-white text-black hover:bg-[#2F0068] hover:text-white' variant='default'>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving Changes

            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm