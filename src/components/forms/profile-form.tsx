import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/firebase/config";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  // bio: z.string().max(160).min(4),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     })
  //   )
  //   .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  // bio: "I own a computer.",
  // urls: [
  //   { value: "https://shadcn.com" },
  //   { value: "http://twitter.com/shadcn" },
  // ],
};

export function ProfileForm() {
  const [updateProfile, updating, error] = useUpdateProfile(auth);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

  if (error) {
    toast(error.message);
  }

  async function onSubmit(data: ProfileFormValues) {
    const success = await updateProfile({ displayName: data.username });
    if (success) {
      toast("Updated successfully.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="sulaiman" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div> */}
        <Button
          className="flex items-center justify-center gap-2"
          type="submit"
        >
          {updating && <Loader2Icon className="h-3 w-3 animate-spin" />}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
