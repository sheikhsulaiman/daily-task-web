import { z } from "zod";
import { statuses } from "./data";

const defaultStatus = statuses[0].value;
const statusExceptFirst: string[] = [];
for (let i = 1; i < statuses.length; i++) {
  statusExceptFirst.push(statuses[i].value);
}

export const taskSchema = z.object({
  id: z.string(),
  title: z
    .string({ required_error: "A title is required" })
    .min(3, "Must be of atleast three charecters."),
  status: z.string({ required_error: "You need to select one." }),
  label: z.string({ required_error: "You need to select one." }),
  priority: z.string({ required_error: "You need to select one." }),
});

export type Task = z.infer<typeof taskSchema>;
