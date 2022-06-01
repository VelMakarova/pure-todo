const list = [];
const input = document.getElementById('input');
const destination = document.getElementById('list');
const form = document.getElementById('form');

function addTask (e) {
  e.preventDefault();
  const text = input.value;
  const duplicates = list.find(i => i.title === text)
  if(text.length && !duplicates) {
    list.push({title: text, isDone: false})
    renderListOfTodos();
    input.value = '';
  } else {
    alert('This todo already exist');
    input.value = '';
  }
}

function setChecked (e) {
  const index = list.findIndex(i => i.title === e.target.name);
  list[index].isDone = !list[index].isDone;
  renderListOfTodos();
}

function deleteTask (e, title) {
  const index = list.findIndex(i => i.title === title);
  list.splice(index, 1);
  renderListOfTodos();
}

function createDeleteBtn (title) {
  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn delete';
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTask(title))
  return deleteBtn;
}

function createTaskTitle (title) {
  let taskTitle = document.createElement('span');
  taskTitle.className = 'task__title';
  taskTitle.innerHTML = title;
  return taskTitle
}

function createCheckbox (title, isChecked) {
  let label = document.createElement('label');
  label.className = 'checkbox';
  let input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = isChecked;
  input.name = title;
  input.addEventListener('change', setChecked);
  let tick = document.createElement('i');
  tick.className = 'checkbox-tick';
  label.append(input, tick);
  return label;
}

function createTask (listItem) {
  let li = document.createElement('li');
  li.className = listItem.isDone ? 'task is-done' : 'task';
  li.append(createCheckbox(listItem.title, listItem.isDone));
  li.append(createTaskTitle(listItem.title));
  li.append(createDeleteBtn(listItem.title))
  return li;
}

function createEmpty () {
  let li = document.createElement('li');
  li.className = 'list-empty';
  li.innerHTML = 'List of Tasks is empty';
  return li;
}

function renderListOfTodos() {
  destination.innerHTML = '';
  if (list.length) {
    list.forEach(item => destination.append(createTask(item)))
  } else {
    destination.append(createEmpty())
  }
}
form.addEventListener('submit', addTask);