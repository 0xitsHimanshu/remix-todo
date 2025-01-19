import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, json, useLoaderData } from "@remix-run/react";
import { todos } from "~/lib/db.server";


export const meta: MetaFunction = () => {
  return [
    { title: "Welcome to Todo App" },
    { name: "description", content: "A minimal todo app built with Remix!" },
  ];
};

export async function loader() {
  return json({ tasks: await todos.read() });
}

export async function action({request}: ActionFunctionArgs){
  const formdata = await request.formData();

  const { description } = Object.fromEntries(formdata);
  await todos.create(description as string);

  return json({ok: true});
}

export default function Index() {
 
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-1 items-center h-screen flex-col">
      <header className="mb-12 pt-6 px-6 flex items-center justify-between w-full">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Todo</h1>
        <select className="appearance-none rounded-3xl border border-gray-200 bg-gray-50 px-4 py-2 text-center ">
          <option>System</option>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </header>
      <main className="flex-1 space-y-8">
        <Form
          method="post" 
          className="rounded-full border border-gray-200 bg-white/90 shadow-md "
        >
          <fieldset className="flex items-center gap-2 p-2 text-sm">
            <input
              type="text"
              name="description"
              placeholder="Create a new todo..."
              required
              className="flex-1 rounded-full border-2 border-gray-200 px-3 py-2 text-sm font-bold text-black dark:border-white/50"
            />
            <button className="rounded-full border-2 border-gray-200/50  px-3 py-2 text-base font-black transition hover:scale-105 hover:border-gray-500 sm:px-6 ">
              Add
            </button>
          </fieldset>
        </Form>
 
        <div className="rounded-3xl border border-gray-200 bg-white/90 px-4 py-2">
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>{task.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-center leading-7">No tasks available</p>
          )}
        </div>
 
        <div className="rounded-3xl border border-gray-200 bg-white/90 px-4 py-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-center leading-7">
              {tasks.length} {tasks.length === 1 ? "item" : "items"} left
            </p>
            <div className="flex items-center gap-4">
              <button className="text-red-400 transition hover:text-red-600">
                Clear Completed
              </button>
              <button className="text-red-400 transition hover:text-red-600">
                Delete All
              </button>
            </div>
          </div>
        </div>
 
        <div className="rounded-3xl border border-gray-200 bg-white/90 px-4 py-2">
          <div className="flex items-center justify-center gap-12 text-sm">
            <button
              aria-label="View all tasks"
              className="opacity-50 transition hover:opacity-100"
            >
              All
            </button>
            <button
              aria-label="View active tasks"
              className="opacity-50 transition hover:opacity-100"
            >
              Active
            </button>
            <button
              aria-label="View completed"
              className="opacity-50 transition hover:opacity-100"
            >
              Completed
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-12 px-6">
        <p className="text-sm text-center leading-loose">
          Built by {" "}
          <Link
            to={'https://github.com/0xitsHimanshu'}
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full dark:text-blue-500 dark:after:bg-blue-500"
          >
            Himanshu
          </Link>
          {" "} with ❤️. The source code is available on {" "}
          <Link
            to={'https://github.com/0xitsHimanshu/remix-todo'}
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full dark:text-blue-500 dark:after:bg-blue-500"
          >
            Github
          </Link>
        </p>
      </footer>
    </div>
  );
}


