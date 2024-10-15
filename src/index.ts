import { v4 as uuidV4 } from 'uuid';

console.log(uuidV4());

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

// Handle form submission
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input?.value.trim()) return;

  const taskId = uuidV4();
  const createdAt = new Date().toLocaleString();

  createTaskElement(taskId, input.value, createdAt);
  input.value = ''; // Clear input field
});

// Function to create a new task element
function createTaskElement(id: string, title: string, createdAt: string) {
  const li = document.createElement('li');
  li.dataset.id = id;

  const taskContent = document.createElement('span');
  taskContent.textContent = `${title} (Created At: ${createdAt})`;

  const taskActions = document.createElement('div');
  taskActions.className = 'task-actions';

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit';
  editButton.addEventListener('click', () => editTask(taskContent));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';
  deleteButton.addEventListener('click', () => deleteTask(li));

  taskActions.append(editButton, deleteButton);
  li.append(taskContent, taskActions);
  list?.appendChild(li);
}

// Function to handle task editing
function editTask(taskContent: HTMLSpanElement) {
  const newTitle = prompt('Edit your task:', taskContent.textContent?.split(' (')[0]);
  if (newTitle?.trim()) {
    const createdAt = new Date().toLocaleString();
    taskContent.textContent = `${newTitle} (Edited At: ${createdAt})`;
  }
}

// Function to handle task deletion
function deleteTask(li: HTMLLIElement) {
  li.remove();
}
