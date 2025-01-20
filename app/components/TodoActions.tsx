import { useFetcher } from "@remix-run/react";
import { Item } from "~/type";

export default function TodoActions({tasks}: {tasks: Item[]}) {
   const fetcher = useFetcher();
   
   return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-center leading-7">{tasks.length}  {tasks.length === 1 ? "item" : "items"} left</p>
            <fetcher.Form
                method="post"
                className="flex items-center gap-4"
                onSubmit={(event) => {
                    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
                    if (
                        submitter.value === "clear completed" &&
                        !confirm("Are you sure you want to clear all completed tasks?")
                      ) {
                        event.preventDefault();
                        return;
                      } else if (
                        submitter.value === "delete all" &&
                        !confirm("Are you sure you want to delete all tasks?")
                      ) {
                        event.preventDefault();
                        return;
                      }
                }}
            >

            </fetcher.Form>
        </div>
   )
}``