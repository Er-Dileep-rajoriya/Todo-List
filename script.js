const form = document.getElementById("form");
const todayList = document.getElementById("today-list");
const futureList = document.querySelector(
  ".task-list:nth-of-type(2) .list-container"
);
const completedList = document.querySelector(
  ".task-list:nth-of-type(3) .list-container"
);
const data = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveDataToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(data));
}

// Add a new task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const date = form.date.value;
  const priority = form.priority.value;

  // Validate fields
  if (!name || !date || !priority) {
    alert("Please fill all fields.");
    return;
  }

  // Add the task to the array and save it
  data.push({ name, date, priority, completed: false });
  saveDataToLocalStorage();

  // Reset the form and refresh the display
  form.reset();
  displayTasks();
});

// Display tasks in appropriate lists
function displayTasks() {
  todayList.innerHTML = "";
  futureList.innerHTML = "";
  completedList.innerHTML = "";

  const currentDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format, calculated each time

  data.forEach((item, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "list";

    if (item.completed == true) {
      taskDiv.style.background = "white";
      taskDiv.style.color = "black";
    }

    taskDiv.innerHTML = `
      <span>${index + 1}. ${item.name}</span>
      <span>${item.date}</span>
      <span>${item.priority}</span>
      <span>
        <i class="fa-regular fa-circle-check" onclick="toggleComplete(${index})" style="cursor: pointer; color: ${
      item.completed ? "green" : "grey"
    };"></i>
        &nbsp;
        <i class="fa-solid fa-trash" onclick="deleteTask(${index})" style="cursor: pointer;"></i>
      </span>`;

    if (item.completed) {
      completedList.appendChild(taskDiv);
    } else if (item.date <= currentDate) {
      todayList.appendChild(taskDiv);
    } else if (item.date > currentDate) {
      futureList.appendChild(taskDiv);
    }
  });
}

// Mark a task as completed
function toggleComplete(index) {
  data[index].completed = true;
  saveDataToLocalStorage();
  displayTasks();
}

// Delete a task
function deleteTask(index) {
  data.splice(index, 1);
  saveDataToLocalStorage();
  displayTasks();
}

// Initial display of tasks
displayTasks();
