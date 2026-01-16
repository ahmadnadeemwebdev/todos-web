import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Toggle finished tasks
  const toggleFinished = () => setShowFinished(!showFinished);

  // Save to localStorage
  const saveToLS = (todos) => localStorage.setItem("todos", JSON.stringify(todos));

  // Add Todo
  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    saveToLS(newTodos);
    setTodo("");
  };

  const handleChange = (e) => setTodo(e.target.value);

  // Edit Todo
  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);

    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Delete Todo
  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Toggle completed
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Load todos from localStorage
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) setTodos(JSON.parse(todoString));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 rounded-xl p-5 bg-violet-200 min-h-[80vh] w-full md:w-1/2 shadow-lg">
        
        {/* Add Todo Section */}
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-extrabold text-violet-900 mb-2">
            View Completed Todos
          </h2>
          <input
            type="text"
            placeholder="Enter your task"
            value={todo}
            onChange={handleChange}
            className="w-full h-10 rounded-md px-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 0}
            className="w-full md:w-auto bg-violet-800 text-white px-4 py-2 rounded-lg
              shadow-md hover:bg-violet-900 active:scale-95 active:shadow-sm
              transition-all duration-150 disabled:bg-violet-600"
          >
            Add
          </button>
        </div>

        {/* Show Finished Toggle */}
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
            className="w-5 h-5"
          />
          <span>Show Finished</span>
        </label>

        {/* Todos Title */}
        <h2 className="text-2xl font-extrabold text-center text-gray-800 tracking-wide mb-4">
          Your Todos
        </h2>

        {/* Todo List */}
        <div className="todos flex flex-col gap-3">
          {todos.length === 0 && (
            <div className="my-5 text-center text-gray-600">No Todos To Display</div>
          )}
          {todos.map(
            (item) =>
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white p-3 rounded-lg shadow-md"
                >
                  {/* Left: Checkbox + Todo Text */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <input
                      type="checkbox"
                      name={item.id}
                      checked={item.isCompleted}
                      onChange={handleCheckbox}
                      className="w-5 h-5"
                    />
                    <div className={item.isCompleted ? "line-through text-gray-400" : "text-gray-800"}>
                      {item.todo}
                    </div>
                  </div>

                  {/* Right: Buttons */}
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
