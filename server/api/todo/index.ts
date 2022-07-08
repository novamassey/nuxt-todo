import { db } from "../../db";
import { v4 as uuid } from "uuid";
import { createError, sendError } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === "GET") {
    console.log(db.todos);
    return db.todos;
  }

  if (method === "POST") {
    const body = await useBody(event);

    if (!body.item) {
      const todoPostError = createError({
        statusCode: 400,
        statusMessage: "Unable to add your todo item",
        data: {},
      });
      sendError(event, todoPostError);
    }

    const newTodo = {
      id: uuid(),
      item: body.item,
      completed: false,
    };

    db.todos.push(newTodo);

    return newTodo;
  }
});
