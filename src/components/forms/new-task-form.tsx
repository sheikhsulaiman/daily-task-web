import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Task, taskSchema } from "@/data/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { labels, priorities, statuses } from "@/data/data";
import { Separator } from "../ui/separator";
const NewTaskForm = () => {
  const newTaskForm = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: "",
      title: "",
      label: labels[0].value,
      priority: priorities[0].value,
      status: statuses[0].value,
    },
  });

  function onSubmit(values: Task) {
    console.log(values);
  }
  return (
    <Form {...newTaskForm}>
      <form onSubmit={newTaskForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="id"
          control={newTaskForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task id</FormLabel>
              <FormControl>
                <Input placeholder="form id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="title"
          control={newTaskForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Buy Milk." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="status"
          control={newTaskForm.control}
          render={({ field }) => (
            <FormItem className="border rounded-sm p-2">
              <FormLabel>Status</FormLabel>
              <Separator />
              <FormControl>
                <RadioGroup
                  defaultChecked={true}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-2 justify-between"
                >
                  {statuses.map((status) => (
                    <FormItem
                      key={status.value}
                      className="flex items-end space-x-2"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={status.value}
                          id={status.label}
                        />
                      </FormControl>
                      <FormLabel
                        className="hover:cursor-pointer max-w-full"
                        htmlFor={status.label}
                      >
                        {status.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2  w-full">
          <FormField
            name="label"
            control={newTaskForm.control}
            render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Label</FormLabel>
                <Separator />
                <FormControl>
                  <RadioGroup
                    defaultChecked={true}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {labels.map((label) => (
                      <FormItem
                        key={label.value}
                        className="flex items-end space-x-2"
                      >
                        <RadioGroupItem value={label.value} id={label.label} />

                        <FormLabel
                          className="hover:cursor-pointer w-full"
                          htmlFor={label.label}
                        >
                          {label.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="priority"
            control={newTaskForm.control}
            render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Priority</FormLabel>
                <Separator />
                <FormControl>
                  <RadioGroup
                    defaultChecked={true}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {priorities.map((priority) => (
                      <FormItem
                        key={priority.value}
                        className="flex items-end space-x-2"
                      >
                        <RadioGroupItem
                          value={priority.value}
                          id={priority.label}
                        />

                        <FormLabel
                          className="hover:cursor-pointer w-full"
                          htmlFor={priority.label}
                        >
                          {priority.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default NewTaskForm;
