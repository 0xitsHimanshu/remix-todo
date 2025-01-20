import type { Item } from "~/type";
 
import TodoItem from "~/components/TodoItem";
 
export default function TodoList({ todos }: { todos: Item[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}