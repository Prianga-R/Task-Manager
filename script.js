document.addEventListener("DOMContentLoaded", function() {
  displayTasks();
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateTimeInput = document.getElementById("dateTimeInput");

  if (taskInput.value === "" || dateTimeInput.value === "") {
    alert("Please enter both task and date/time.");
    return;
  }

  const task = {
    text: taskInput.value,
    datetime: dateTimeInput.value,
    completed: false
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
  taskInput.value = "";
  dateTimeInput.value = "";
}

function displayTasks() {
  const activeTasksList = document.getElementById("activeTasks");
  const completedTasksList = document.getElementById("completedTasks");

  activeTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function(task, index) {
    const li = document.createElement("li");
    li.textContent = task.text + " - " + task.datetime;

    if (!task.completed) {
      const editButton = document.createElement("button");
      editButton.textContent = "Edit Task";
      editButton.onclick = function() {
        editTask(index);
      };

      const completeButton = document.createElement("button");
      completeButton.textContent = "Done";
      completeButton.onclick = function() {
        completeTask(index);
      };

      li.appendChild(editButton);
      li.appendChild(completeButton);
      activeTasksList.appendChild(li);
    } else {
      completedTasksList.appendChild(li);
    }
  });
}

function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newText = prompt("Edit Task:");
  if (newText !== null) {
    tasks[index].text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }
}

function completeTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}
