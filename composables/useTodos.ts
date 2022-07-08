const useTodos = () => {
  const { data: todos, refresh } = useAsyncData("todos", () => {
    return $fetch("/api/todo");
  });

  const input = ref("");
  const addTodo = async (item) => {
    if (!item) return;

    await $fetch("/api/todo", { method: "POST", body: { item } });
    refresh();
  };

  const updateTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, { method: "PUT" });
    refresh();
  };

  const deleteTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, { method: "DELETE" });
    refresh();
  };
  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodos;
