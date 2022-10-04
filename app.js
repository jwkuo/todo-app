const addToDoButton = document.getElementById('add-todo');
const toDoList = document.getElementById('todo-list');
const noToDoHeader = document.getElementById('no-todo-header');
const toDoInput = document.getElementById('todo-input');
const inProgressList = document.getElementById('in-progress-list');
const completedList = document.getElementById('completed-list');
let toDoCount = 0;

function addToDo() {
  toDoCount += 1;

  // Create the HTML element 'li' and add class names
  let todoItem = document.createElement('li');
  todoItem.classList.add('bg-zinc-300', 'px-4', 'py-4', 'mb-4', 'text-xl', 'rounded', 'flex', 'justify-between');

  // Create the HTML element 'span' and create the text node
  let todoTextEl = document.createElement('span');
  // let todoText = document.createTextNode(`ToDo #${toDoCount}`);
  let todoText = document.createTextNode(toDoInput.value);

  toDoInput.value = ''

  // Insert the text into the span and insert the span into the li
  todoTextEl.appendChild(todoText);
  todoItem.appendChild(todoTextEl);

  // Create the trash icon element 'i', add the class names
  let trashIcon = document.createElement('i');
  trashIcon.classList.add('fa-solid', 'fa-trash', 'cursor-pointer');
  
  // Add event listener to trash icon
  trashIcon.addEventListener('click', function () {
    todoItem.remove()

    toDoCount -= 1;
    if (toDoCount == 0) {
      noToDoHeader.classList.remove('hidden');
      inProgressList.classList.add('hidden');
    }
  })

  // insert trash Icon into the li
  todoItem.appendChild(trashIcon);

  // Insert the li into the ul
  toDoList.appendChild(todoItem);

  // toDoList.innerHTML += `
  // <li id="todo-${toDoCount}" class="bg-zinc-300 px-4 py-4 mb-4 text-xl rounded flex justify-between">
  //   <span>ToDo #${toDoCount}</span>
  //   <i id="delete-todo-${toDoCount}" class="fa-solid fa-trash cursor-pointer"></i>
  // </li>`;

  // document.getElementById(`delete-todo-${toDoCount}`).addEventListener('click', function () {
  //   document.getElementById(`todo-${toDoCount}`).remove();

  //   toDoCount -= 1;
  //   if (toDoCount == 0) {
  //     noToDoHeader.classList.remove('hidden');
  //   }
  // });

  // noToDoHeader.style.display = 'none';
  noToDoHeader.classList.add('hidden');
  inProgressList.classList.remove('hidden');
}

addToDoButton.addEventListener('click', addToDo);

toDoInput.addEventListener('keypress', function (event) {
  if (event.code == 'Enter') {
    addToDo();
  }
});