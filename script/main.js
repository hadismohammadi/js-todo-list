let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTasksHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

// New todo item handler
let handleCreateNewListItem = (taskString) => {
  //Create list item parrent
  let listItem = document.createElement("li");

  let checkBox = document.createElement("input"); // checkbox
  let label = document.createElement("label");
  let editInput = document.createElement("input"); // text
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";

  // Insert text for each button
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  // Appending each element and create the whole list
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Add a new task handler
let handleAddNewTask = function () {
  let listItem = handleCreateNewListItem(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, handleCompleteTask);
  taskInput.value = "";
};

// Edit an existing task
let handleEditTask = function () {
  let listItem = this.parentNode;

  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");

  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle("editMode");
};

// Delete an existing task
let handleDeleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

// Mark a task as complete
let handleCompleteTask = function () {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, handleIncompleteTask);
};

// Mark a task as incomplete
let handleIncompleteTask = function () {
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, handleCompleteTask);
};

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = handleEditTask;
  deleteButton.onclick = handleDeleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", handleAddNewTask);

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], handleCompleteTask);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], handleIncompleteTask);
}
