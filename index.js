const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearListButton = document.getElementById('clearListButton');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      taskList.innerHTML = '<p class="grayed-out">Нет задач</p>';
      clearListButton.disabled = true;
    } else {
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.verified = task.completed;
        checkbox.addEventListener('change', () => {
          tasks[index].verified = checkbox.verified;
          renderTasks();
        });
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskList.appendChild(taskItem);
      });
      clearListButton.disabled = false;
    }
  }
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      tasks.push({text: taskText, completed: false });
      saveTasks();
      taskInput.value = '';
      renderTasks();
    }
  });
  clearListButton.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    renderTasks();
  });
  renderTasks();