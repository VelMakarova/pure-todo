class TodoList {
  constructor() {
    this.list = [];
    this.input = document.getElementById('input');
    this.destination = document.getElementById('list');
    this.addFormHandler();
    this.renderListOfTodos();
  }

  clearForm = () => {
    this.input.value = '';
  }

  addTask = (e) => {
    e.preventDefault();
    const text = this.input.value;
    const duplicates = this.list.find(i => i.title === text)
    if(text.length && !duplicates) {
      this.list.push({title: text, isDone: false})
      this.renderListOfTodos();
      this.clearForm();
    } else {
      alert('This todo already exist');
      this.clearForm();
    }
  }

  setChecked = (e) => {
    const index = this.list.findIndex(i => i.title === e.target.name);
    this.list[index].isDone = !this.list[index].isDone;
    this.renderListOfTodos();
  }

  deleteTask = (e, title) => {
    const index = this.list.findIndex(i => i.title === title);
    this.list.splice(index, 1);
    this.renderListOfTodos();
  }

  createDeleteBtn = (title) => {
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn delete';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.addEventListener('click', () => this.deleteTask(title))
    return deleteBtn;
  }

  createTaskTitle = (title) => {
    let taskTitle = document.createElement('span');
    taskTitle.className = 'task__title';
    taskTitle.innerHTML = title;
    return taskTitle
  }

  createCheckbox = (title, isChecked) => {
    let label = document.createElement('label');
    label.className = 'checkbox';
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = isChecked;
    input.name = title;
    input.addEventListener('change', this.setChecked);
    let tick = document.createElement('i');
    tick.className = 'checkbox-tick';
    label.append(input, tick);
    return label;
  }

  createTask = (listItem) => {
    let li = document.createElement('li');
    li.className = listItem.isDone ? 'task is-done' : 'task';
    li.append(this.createCheckbox(listItem.title, listItem.isDone));
    li.append(this.createTaskTitle(listItem.title));
    li.append(this.createDeleteBtn(listItem.title))
    return li;
  }

  createEmpty = () => {
    let li = document.createElement('li');
    li.className = 'list-empty';
    li.innerHTML = 'List of Tasks is empty';
    return li;
  }

  renderListOfTodos = () => {
    this.destination.innerHTML = '';
    if (this.list.length) {
      this.list.forEach(item => this.destination.append(this.createTask(item)))
    } else {
      this.destination.append(this.createEmpty())
    }
  }

  addFormHandler = () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', this.addTask);
  }
}

const todo = new TodoList();