"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase/config";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(6, { message: "Password must be at-least of six charecters long." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at-least of six charecters long." }),
  })
  .refine(
    (data) => data.password === data.confirmPassword, // Password and confirm must be equal
    {
      message: "Passwords don't match", // Custom error message
      path: ["confirmPassword"], // Path of the error field
    }
  );

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const auth = getAuth(firebaseApp);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createUserWithEmailAndPassword(values.email, values.confirmPassword);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (user) {
    return (
      <h1 className="text-center bg-green-400 font-semibold py-1 rounded-sm">
        {"Logged in as: " + user.user.email}
      </h1>
    );
  }
  if (googleUser) {
    return <h1>{"Logged in as: " + googleUser.user.displayName}</h1>;
  }
  if (githubUser) {
    return <h1>{"Logged in as: " + githubUser.user.displayName}</h1>;
  }

  if (error) {
    toast.error(error.message);
  }
  if (googleError) {
    toast.error(googleError.message);
  }
  if (githubError) {
    toast.error(githubError.message);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="test@example.com"
                    type="email"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Your e-mail will not be reveled to anyone.
                </FormDescription>
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
                    {...field}
                    placeholder="create a password"
                    type="password"
                    disabled={isLoading}
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
                <FormLabel>Re-type Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Re-type to confirm password."
                    type="password"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="block w-full mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          disabled={googleLoading}
          onClick={() => signInWithGoogle()}
        >
          {googleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          disabled={githubLoading}
          onClick={() => signInWithGithub()}
        >
          {githubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </div>
  );
}
