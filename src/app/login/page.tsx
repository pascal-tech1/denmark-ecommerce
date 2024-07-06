"use client";
import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "zustand";
import { useLoginUser } from "@/hooks/use-User";

import { useEffect } from "react";
import useUploadMutation from "@/hooks/useUploadMutation";


export default function Login() {
  const formSchema = z.object({
    password: z.string().nonempty({ message: "Password is required." }),
    email: z.string().email().nonempty({ message: "email is required" })
  });

  const { isSuccess, data, error, mutate, isPending } = useUploadMutation("/routes/login", [])

  const { toast } = useToast()

  const { updatUser } = useStore(useLoginUser, (state) => state);

  // 1. Define  form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: ""
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutate(values);
    } catch (err: any) {
      console.error('Error submitting form:', err);
    }
  };
  useEffect(() => {

    if (isSuccess) {
      toast({

        description: 'Login Successfully',
        action:
          <ToastAction altText="Home">
            <Button>
              <Link href="/">Home</Link>
            </Button>
          </ToastAction>
      })

      updatUser(data?.data?.user)
    }
  }, [data, toast, updatUser, isSuccess])
  return (
    <ContentLayout title="Login">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Login</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 p-10  border  border-opacity-20">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                    <Input placeholder="Enter Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </form>
        </Form>
        <p className=" mt-6">
          Don&apos;t have account <Link className=" text-blue-400" href="/signUp">Sign Up</Link>
        </p>
      </PlaceholderContent>
    </ContentLayout>
  );
}
