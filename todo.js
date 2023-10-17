window.onload = function () {
    document.querySelector('#view').style.display = 'none';
}
const todos = [];
const tasks = document.getElementById('tasks');
const taskEdit = document.getElementById('taskEdit');
let taskIdCounter = 0;

document.querySelector('#add').addEventListener('click', (e) => {
    document.querySelector('.form').style.display = 'block';

})

//adding new task details
document.querySelector('#addd').addEventListener('click', (e) => {
    e.preventDefault();
    const newTask = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const date = new Date (document.getElementById('date').value);
    const currentDate = new Date();


    if (date < currentDate) {
        alert('Date cannot be in the past');
        return;
    }
    else {
        if (newTask.trim() && description.trim() && isNaN(date) !== '') {
            const taskcontainer = document.createElement('div');
            taskcontainer.classList.add('task-container');


            const taskTitle = document.createElement('p');
            const taskDescription = document.createElement('p');
            const taskDate = document.createElement('p');

            const editButton = document.createElement('button');
            editButton.classList.add('edit-button');

            const checklistText = document.createElement('span');
            checklistText.textContent = 'Check: ';
            checklistText.classList.add('spann');


            const checkList = document.createElement('input');
            checkList.type = 'checkbox';
            checkList.classList.add('checklist-button');


            const descriptionText = document.createElement('span');
            descriptionText.classList.add('spann')
            descriptionText.textContent = 'Description: ';

            const dateText = document.createElement('span');
            dateText.classList.add('spann')
            dateText.textContent = 'Date: ';

            const titleText = document.createElement('span');
            titleText.classList.add('spann')
            titleText.textContent = 'Title: ';

            taskTitle.textContent = newTask;
            taskDescription.textContent = description
            taskDate.textContent = date
            editButton.textContent = 'Edit';

            tasks.appendChild(taskcontainer);
            taskcontainer.appendChild(titleText);
            taskcontainer.appendChild(taskTitle);

            taskcontainer.appendChild(descriptionText);
            taskcontainer.appendChild(taskDescription);

            taskcontainer.appendChild(dateText);
            taskcontainer.appendChild(taskDate);

            taskcontainer.appendChild(editButton);

            taskcontainer.appendChild(checklistText);
            taskcontainer.appendChild(checkList);

            document.getElementById('task').value = '';
            document.getElementById('description').value = '';
            document.getElementById('date').value = '';

            alert("task added successfully");
            document.querySelector('.form').style.display = 'none';
            document.querySelector('#view').style.display = 'block';


            //store todo's in array
            const taskDetails = {
                id: taskIdCounter,
                title: newTask,
                description: description,
                date: date
            };

            taskIdCounter++;

            todos.push(taskDetails);
            console.log(todos);

            //view details
            const viewButton = document.getElementById('view');
            viewButton.addEventListener('click', () => {

                document.querySelector('.left').style.display = 'block';
                document.querySelector('#add').style.display = 'none';
                document.querySelector('#view').style.display = 'none';
                document.querySelector('#back').style.display = 'block';
                document.querySelector('.form').style.display = 'none';

            });

            //back
            const backButton = document.getElementById('back');
            backButton.addEventListener('click', () => {
                document.querySelector('#add').style.display = 'block';
                document.querySelector('#view').style.display = 'block';
                document.querySelector('#back').style.display = 'none';
                document.querySelector('.left').style.display = 'none';
                document.querySelector('.right').style.display = 'none';


            });

            editButton.addEventListener('click', () => {
                taskEdit.innerHTML = '';
                document.querySelector('.right').style.display = 'block';
                document.querySelector('.left').style.display = 'none';

                const taskForm = document.createElement('form');
                taskForm.classList.add('taskform');

                // Title 
                const titleInput = document.createElement('input');
                titleInput.classList.add('inputt');
                titleInput.type = 'text';
                titleInput.value = taskDetails.title;
                titleInput.name = 'title';
                taskForm.appendChild(titleInput);

                // Description 
                const descriptionInput = document.createElement('textarea');
                descriptionInput.classList.add('inputtt');
                descriptionInput.textContent = taskDetails.description;
                descriptionInput.name = 'description';
                taskForm.appendChild(descriptionInput);

                // Date 
                const dateInput = document.createElement('input');
                dateInput.classList.add('inputt');
                dateInput.type = 'date';
                dateInput.value = taskDetails.date;
                dateInput.name = 'date';
                taskForm.appendChild(dateInput);

                // Save Changes button
                const saveButton = document.createElement('button');
                saveButton.classList.add('save-btn');
                saveButton.textContent = 'Save Changes';
                taskForm.appendChild(saveButton);

                // delete button
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('deleted');
                deleteButton.textContent = 'Delete';
                taskForm.appendChild(deleteButton);


                // delete task
                deleteButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    taskEdit.removeChild(taskForm);
                    tasks.removeChild(taskcontainer);
                    const taskId = taskDetails.id;
                    const taskIndex = todos.findIndex(task => task.id === taskId);
                    if (taskIndex !== -1) {
                        todos.splice(taskIndex, 1);
                    }
                    document.querySelector('.left').style.display = 'block';
                });

                // save changes
                taskForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const formData = new FormData(taskForm);
                    const updatedTask = {
                        id: taskDetails.id,
                        title: formData.get('title'),
                        description: formData.get('description'),
                        date: formData.get('date')
                    };

                    // Update the task in the 'todos' array
                    const taskIndex = todos.findIndex(task => task.id === updatedTask.id);
                    if (taskIndex !== -1) {
                        todos[taskIndex] = updatedTask;
                    }
                    console.log(todos)

                });
                taskEdit.appendChild(taskForm);
            });


        }
        else {
            alert('fill all inputs');
        }

    }

})



