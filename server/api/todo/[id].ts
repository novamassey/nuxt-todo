import { db } from "../../db";
import { sendError } from "h3";

export default defineEventHandler((event) => {
  const method = event.req.method;
  const context = event.context;
  const { id } = context.params;

  const findById = (todoId) => {
    //find the todo related to parameter
    let index;
    const todo = db.todos.find((td, i) => {
      if (td.id === todoId) {
        index = i;
        return true;
      }
      return false;
    });
    //if not found throw an error
    if (!todo) {
      const TodoNotFound = createError({
        statusCode: 404,
        statusMessage: "Todo Not Found",
        data: {},
      });
      sendError(event, TodoNotFound);
    }

    return { todo, index };
  };

  if (method === "PUT") {
    const { todo, index } = findById(id);
    // console.log("todo", todo, "index", index);

    // update todo found by destructure the returns from the function
    let updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    console.log(updatedTodo);
    //return updated todo
    db.todos[index] = updatedTodo;
    // todo.completed = updatedTodo.completed;
    return updatedTodo;
  }

  if (method === "DELETE") {
    const { todo, index } = findById(id);
    console.log("todo in delete", todo);

    db.todos.splice(index, 1);
    return {
      message: "item deleted",
    };
  }
});

