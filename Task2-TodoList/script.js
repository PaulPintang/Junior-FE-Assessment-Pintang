// Model
// If localstorage has a todos array, then use it
// Otherwise use the default array.
let todos;

// Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos"));
// Check if it's an array
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "Take a bath",
      id: "1",
    },
    {
      title: "Learn to code",
      id: "2",
    },
    {
      title: "Sleep",
      id: "3",
    },
  ];
}

// Creates a todo
const createTodo = (title, status) => {
  const id = "" + new Date().getTime();

  todos.push({
    title,
    status,
    id,
  });

  saveTodos();
};

// Deletes a todo
const removeTodo = (idToDelete) => {
  todos = todos.filter((todo) => {
    // If the id of this todo matches idToDelete, return false
    // For everything else, return true
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });

  saveTodos();
};

// Update todo status
const updateTodoStatus = (idToUpdate) => {
  todos = todos.map((todo) => {
    // If the id of this todo matches idToUpdate, return false
    // For everything else, return true
    if (todo.id === idToUpdate) {
      const updatedTodo = {
        ...todo,
        status: todo.status === "pending" ? "completed" : "pending",
      };
      return updatedTodo;
    } else {
      return todo;
    }
  });

  saveTodos();
};

// Edit todo name
const renameTodoName = (idToEdit) => {
  const submitBtn = document.getElementById("submit-btn");
  const textbox = document.getElementById("todo-title");
  todos = todos.map((todo) => {
    // If the id of this todo matches idToEdit, return false
    // For everything else, return true
    if (todo.id === idToEdit) {
      const updatedTodo = {
        ...todo,
        title: textbox.value,
      };
      return updatedTodo;
    } else {
      return todo;
    }
  });

  textbox.value = "";
  submitBtn.textContent = "Add";
  submitBtn.onclick = addTodo;
  submitBtn.style.backgroundColor = "black";
  saveTodos();
  render();
};

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Controller
const addTodo = () => {
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;
  const status = "pending";

  createTodo(title, status);
  render();
  textbox.value = "";
};

const deleteTodo = (event) => {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
};

const updateTodo = (event) => {
  const checkbox = event.target;
  const idToUpdate = checkbox.id;

  updateTodoStatus(idToUpdate);
  render();
};

const editTodo = (event, title) => {
  // pass the todo to input and get id
  const editButton = event.target;
  const idToEdit = editButton.id;

  const textbox = document.getElementById("todo-title");
  const submitBtn = document.getElementById("submit-btn");

  textbox.value = title;
  submitBtn.style.backgroundColor = "rgb(56, 196, 119)";
  submitBtn.textContent = "Update";
  submitBtn.onclick = () => renameTodoName(idToEdit);
};

// View
const render = () => {
  // reset our list
  document.getElementById("todo-list").innerHTML = "";

  if (todos.length === 0) {
    const todoList = document.getElementById("todo-list");
    const emptyTodo = document.createElement("p");
    emptyTodo.textContent = "Yuuhooo, you have no todo list yet !";
    emptyTodo.style.color = "gray";
    todoList.appendChild(emptyTodo);
  }

  todos.forEach((todo) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-todo-container";

    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.id = todo.id;
    todoCheckbox.onchange = updateTodo;

    if (todo.status === "completed") {
      todoCheckbox.checked = true;
    }

    const todoText = document.createElement("p");
    todoText.textContent = todo.title;

    if (todo.status === "completed") {
      todoText.style.textDecoration = "line-through";
      todoText.style.fontStyle = "italic";
      todoText.style.color = "gray";
    }

    todoDiv.appendChild(todoCheckbox);
    todoDiv.appendChild(todoText);

    const actionDiv = document.createElement("div");
    actionDiv.className = "action";

    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.onclick = (e) => editTodo(e, todo.title);
    editButton.id = todo.id;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;

    actionDiv.appendChild(editButton);
    actionDiv.appendChild(deleteButton);

    taskItem.appendChild(todoDiv);
    taskItem.appendChild(actionDiv);

    const todoList = document.getElementById("todo-list");
    todoList.appendChild(taskItem);
  });
};

render();
