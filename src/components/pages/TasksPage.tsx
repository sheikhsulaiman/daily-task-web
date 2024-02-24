import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { UserNav } from "@/components/user-nav";
import { Task } from "@/data/schema";

import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "@/firebase/config";
import { collection } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function TasksPage() {
  const [value, loading, error] = useCollection(collection(db, "tasks"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const rawData = value?.docs.map((doc) => doc.data() as Task);
  const tasks: Task[] | undefined = rawData;

  return (
    <>
      <div className="flex h-full flex-1 flex-col space-y-8 p-8 ">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            <p>Fetching Data...</p>
          </div>
        )}
        {value && <DataTable data={tasks!} columns={columns} />}
      </div>
    </>
  );
}
