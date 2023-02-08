const taskContainerBoxClass = 'd-flex w-100 p-3 border-bottom flex-wrap';
const strikedTextClass = 'my-auto me-auto text-decoration-line-through fst-italic text-wrap text-break';
const normalTextClass = 'my-auto me-auto text-wrap text-break';
const checkboxClass = 'my-auto mx-2 w-16 bigger-checkbox';
const deleteBtnClass = 'btn btn-primary btn-sm ms-2 my-auto';

let addBtn = document.getElementById('addBtn');
const taskInput =  document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let taskCounter = 0;
let taskArray = [];
let taskBoxesArray = [];

if (localStorage.tasks) {
    taskArray = JSON.parse(localStorage.tasks);
    taskArray.forEach(task => {
        addTaskToList(task);
        taskCounter++;
    });
}

taskInput.addEventListener('keyup', keyPress => {
    if (keyPress.key === "Enter" && taskInput.value)
        createTask(taskInput.value);
});

addBtn.addEventListener('click', () => {
    if (taskInput.value)
        createTask(taskInput.value);
});

function createTask(taskName) {
    let newTask = { name: taskName, completed: false };
    taskArray.push(newTask);
    localStorage.tasks = JSON.stringify(taskArray);
    addTaskToList(newTask);
    taskCounter++;
}

function addTaskToList(savedTask) {
    const box = document.createElement('div');
    box.setAttribute('id', taskCounter.toString());
    box.setAttribute('class', taskContainerBoxClass);
    taskBoxesArray.push(box);

    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.textContent = "Delete"
    deleteTaskBtn.setAttribute('class', deleteBtnClass);
    deleteTaskBtn.addEventListener('click', () => {
        removeTask(box.id);
        box.remove();
    });

    const task = document.createElement('p');
    task.textContent = savedTask.name;
    task.setAttribute('class',(savedTask.completed) ? strikedTextClass : normalTextClass);

    const completeTaskBtn = document.createElement('Input');
    completeTaskBtn.setAttribute('type', 'checkbox');
    completeTaskBtn.setAttribute('class', checkboxClass);
    completeTaskBtn.addEventListener('change', () => {
        changeTaskState(box.id);
        task.setAttribute('class', (completeTaskBtn.checked) ? strikedTextClass : normalTextClass)
    });

    if (savedTask.completed)
        completeTaskBtn.setAttribute('checked', 'true');

    box.appendChild(task);
    box.appendChild(completeTaskBtn);
    box.appendChild(deleteTaskBtn);
    taskList.appendChild(box);
    taskInput.value = "";
    adjustListBorders();
}

function removeTask(taskIndex) {
    taskArray.splice(taskIndex, 1);
    taskBoxesArray.splice(taskIndex, 1);
    localStorage.tasks = JSON.stringify(taskArray);

    let newCounter = 0;
    taskBoxesArray.forEach(box => {
        box.id = newCounter.toString();
        newCounter++;
    });
    taskCounter = newCounter;
    adjustListBorders();
}

function changeTaskState(taskIndex) {
    taskArray[Number(taskIndex)].completed = !taskArray[Number(taskIndex)].completed;
    localStorage.tasks = JSON.stringify(taskArray);
}

function adjustListBorders() {
    for (let index in taskBoxesArray) {
        if (Number(index) == taskBoxesArray.length - 1)
            taskBoxesArray[index].className = 'd-flex justify-content-center align-items-end w-100 p-3';
        else
            taskBoxesArray[index].className = 'd-flex justify-content-center align-items-end w-100 p-3 border-bottom';
    }
}
