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

    const boxClassAttribute = document.createAttribute('class');
    boxClassAttribute.value = 'd-flex justify-content-center m-2 align-items-end';
    box.setAttributeNode(boxClassAttribute);

    const deleteTask = document.createElement('button');
    deleteTask.innerHTML = "Finish task"
    deleteTask.id = 'taskButton' + counter;

    const btnClassAttribute = document.createAttribute('class');
    btnClassAttribute.value = 'btn btn-outline-primary btn-sm ms-2 my-auto';
    deleteTask.setAttributeNode(btnClassAttribute);

    deleteTask.addEventListener('click', () => {
        document.getElementById(box.id).remove();
    });
    
    const task = document.createElement('p');
    task.innerHTML = taskName;
    task.id = 'taskP' + counter;

    const pClassAttribute = document.createAttribute('class');
    pClassAttribute.value = 'my-auto';
    task.setAttributeNode(pClassAttribute);

    box.appendChild(task);
    box.appendChild(deleteTask);

    document.getElementById(taskList).appendChild(box);
    resetInputBox(id);
}

function resetInputBox(id) {
    document.getElementById(id).value = "";
}