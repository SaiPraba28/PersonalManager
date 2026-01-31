const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button class="complete-btn">${task.completed ? "✔️" : "✅"}</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    // Complete task
    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks(filter);
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    });

    taskList.appendChild(li);
  });
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName === "") return alert("Please enter a task!");
  tasks.push({ name: taskName, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// Filter tasks
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});

// Initial render
renderTasks();
