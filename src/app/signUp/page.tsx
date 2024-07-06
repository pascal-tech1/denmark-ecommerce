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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
// Import the custom hook
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import useUploadMutation from "@/hooks/useUploadMutation";

const formSchema = z.object({
  firstName: z.string().nonempty({ message: "name is required" }),
  lastName: z.string().nonempty({ message: "lastname is required" }),
  email: z.string().nonempty({ message: "email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter."
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter."
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character."
    })
    .nonempty({ message: "Password is required." }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number format"
    })
});

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
  });
  const { toast } = useToast()

  const { data, error, mutate, isPending } = useUploadMutation("/routes/signup", [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutate(values);
      toast({

        description: 'You have successfully created your Account',
        action:
          <ToastAction altText="Login">
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          </ToastAction>
      })

      console.log('Success:', values);
    } catch (err: any) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <ContentLayout title="Sign Up">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Register</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-10 border border-opacity-20"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="phone number"
                      international
                      countryCallingCodeEditable={false}
                      {...field}
                      defaultCountry="NG"
                    />
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
        <p className="mt-6">
          Already have an account?{" "}
          <Link className="text-blue-400" href="/login">
            Log In
          </Link>
        </p>

      </PlaceholderContent>
    </ContentLayout>
  );
}
