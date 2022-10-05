const addToDoButton = document.getElementById('add-todo');
const toDoList = document.getElementById('todo-list');
const noToDoHeader = document.getElementById('no-todo-header');
const toDoInput = document.getElementById('todo-input');
const inProgressList = document.getElementById('in-progress-list');
const completedList = document.getElementById('completed-list');
const completedToDoList = document.getElementById('completed-todo-list');
const inProgressCount = document.getElementById('in-progress-count');
let toDoCount = 0;

// Load appData from localStorage, initializing if it doesn't exist
let appData = JSON.parse(localStorage.getItem('app'));
if (!appData) {
  appData = {
    inProgress: [],
    completed: []
  }
  localStorage.setItem('app', JSON.stringify(appData));
}

appData.inProgress.forEach(todo => {
  addToDo(toDoList, todo)
});

appData.completed.forEach(todo => {
  addToDo(completedToDoList, todo)
});

function addToDo(list, todo) {

  // Create the HTML element 'li' and add class names
  let todoItem = document.createElement('li');
  todoItem.classList.add('bg-zinc-300', 'px-4', 'py-4', 'mb-4', 'text-xl', 'rounded', 'flex', 'justify-between');

  // Create the HTML element 'span' and create the text node
  let todoTextEl = document.createElement('span');
  // let todoText = document.createTextNode(`ToDo #${toDoCount}`);
  let todoText = document.createTextNode(todo.text);

  toDoInput.value = ''

  // Insert the text into the span and insert the span into the li
  todoTextEl.appendChild(todoText);
  todoItem.appendChild(todoTextEl);

  // Create a wrapper div for the icons
  let iconWrapper = document.createElement('div');

  // Create the checkmark icon element 'i' add the class names
  if (list.id == 'todo-list') {
    let completeIcon = document.createElement('i');
    completeIcon.classList.add('fa-solid', 'fa-circle-check', 'cursor-pointer', 'mx-2');
  
    completeIcon.addEventListener('click', function (event) {
      appData.completed.push(todo);
      appData.inProgress.splice(appData.inProgress.findIndex(function (inProgressTodo) {
        return todo.id == inProgressTodo.id
      }), 1);
      localStorage.setItem('app', JSON.stringify(appData));
      completedToDoList.appendChild(todoItem);
      completedList.classList.remove('hidden');
      event.target.remove();
    });
  
    iconWrapper.appendChild(completeIcon);
  }

  // Create the trash icon element 'i', add the class names
  let trashIcon = document.createElement('i');
  trashIcon.classList.add('fa-solid', 'fa-trash', 'cursor-pointer', 'mx-2');
  
  // Add event listener to trash icon
  trashIcon.addEventListener('click', function () {
    todoItem.remove()
    switch (list.id) {
      case 'todo-list':
        appData.inProgress.splice(appData.inProgress.findIndex(function (inProgressTodo) {
          return todo.id == inProgressTodo.id
        }), 1);
      case 'completed-todo-list':
        appData.completed.splice(appData.completed.findIndex(function (completedTodo) {
          return todo.id == completedTodo.id
        }), 1);
    }
    localStorage.setItem('app', JSON.stringify(appData));

    if (appData.inProgress.length == 0 && appData.completed.length == 0) {
      noToDoHeader.classList.remove('hidden');
      completedList.classList.add('hidden');
    }
    if (appData.inProgress.length == 0) {
      inProgressList.classList.add('hidden');
    }
  })

  // insert trash Icon into the li
  iconWrapper.appendChild(trashIcon);

  // Insert icon wrapper into todoItem
  todoItem.appendChild(iconWrapper);

  // Insert the li into the ul
  list.appendChild(todoItem);

  noToDoHeader.classList.add('hidden');
  inProgressList.classList.remove('hidden');
  completedList.classList.remove('hidden');
}

addToDoButton.addEventListener('click', function () {
  let todo = {
    id: Date.now(),
    text: toDoInput.value
  }
  addToDo(toDoList, todo)
  appData.inProgress.push(todo);
  localStorage.setItem('app', JSON.stringify(appData));
});

toDoInput.addEventListener('keypress', function (event) {
  if (event.code == 'Enter') {
    let todo = {
      id: Date.now(),
      text: toDoInput.value
    }
    addToDo(toDoList, todo);
    appData.inProgress.push(todo);
    localStorage.setItem('app', JSON.stringify(appData));
  }
});