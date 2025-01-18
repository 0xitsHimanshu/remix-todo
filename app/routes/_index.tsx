import type { MetaFunction } from "@remix-run/node";
// import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Welcome to Todo App" },
    { name: "description", content: "A minimal todo app built with Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <header className="flex justify-between w-full p-4">
        <h1>Todo</h1>
        <select>
          <option>System</option>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </header>
      <h1 className="text-2xl font-bold">Hello, World!</h1>
    </div>
  );
}


