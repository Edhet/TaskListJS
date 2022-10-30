let counter = 0;

let addBtn = document.getElementById('addBtn');
const taskBox = 'taskBox';
const taskList = 'taskList';

addBtn.onclick = () => {
    let taskName = document.getElementById(taskBox).value;
    if (taskName == "" || taskName == null) {
        return;
    }
   
    createTask(taskBox, taskName, ++counter);
}

function createTask(id, taskName, counter) {
    const box = document.createElement('div');
    box.id = 'taskDiv' + counter;

    box.setAttribute('class', 'd-flex justify-content-center mx-auto my-2 align-items-end border border-primary p-3 rounded-3');

    const deleteTask = document.createElement('button');
    deleteTask.innerHTML = "Finish task"
    deleteTask.id = 'taskButton' + counter;

    deleteTask.setAttribute('class', 'btn btn-outline-primary btn-sm ms-2 my-auto');

    deleteTask.addEventListener('click', () => {
        document.getElementById(box.id).remove();
    });
    
    const task = document.createElement('p');
    task.innerHTML = taskName;
    task.id = 'taskP' + counter;

    task.setAttribute('class', 'my-auto');

    box.appendChild(task);
    box.appendChild(deleteTask);

    document.getElementById(taskList).appendChild(box);
    resetInputBox(id);
}

function resetInputBox(id) {
    document.getElementById(id).value = "";
}