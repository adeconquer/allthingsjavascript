//Model

let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)) {
    todos = savedTodos
} else {
    todos = [{
        title: 'Get groceries',
        dueDate: '2021-10-04',
        id: 'id1'
    }, {
        title: 'Wash car',
        dueDate: '2021-02-03',
        id: 'id2'
    }, {
        title: 'Make dinner',
        dueDate: '2021-03-04',
        id: 'id3'
    }, {
        title: 'Do laundry',
        dueDate: '2021-08-09',
        id: 'id4'
    }];

}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();
    todos.push({
        title,
        dueDate,
        id
    });

    saveTodos();
}

function removeTodo(idToDelete) {
    todos = todos.filter(function(todo) {
        if (todo.id == idToDelete) {
            return false;
        } else {
            return true;
        }
    });
    saveTodos();
}

function toggleTodo(checked, todoID) {

    // console.log(todoID);
    todos.forEach(function(todo) {
        if (todo.id === todoID) {
            todo.isDone = checked
        }
    })

}


function setEditing(todoId) {
    todos.forEach(function(todo) {
        if (todo.id === todoId) {
            todo.isEditing = true;
        }
    });
    saveTodos();
    render()
}

function updateTodo(todoId, newTitle, newDate) {
    todos.forEach(function(todo) {
        if (todo.id === todoId) {
            todo.title = newTitle;
            todo.dueDate = newDate;
            todo.isEditing = false;
        }
    })

    saveTodos()
}




// View
function render() {
    // reset the list
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = ""
        // populate the list
    todos.forEach(function(todo) {
        //create a div
        const element = document.createElement('div');
        if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.id = 'edit-title-' + todo.id;
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.id = 'edit-date-' + todo.id;
            element.appendChild(datePicker);

            updateButton = document.createElement('button');
            updateButton.id = "updateButton";
            updateButton.innerText = 'Update'
            updateButton.dataset.todoId = todo.id;
            updateButton.addEventListener('click', onUpdate);
            element.appendChild(updateButton)

            // 
            // If the todo is not being edited
        } else {
            element.innerText = todo.title + ' ' + todo.dueDate;

            //Add delete Button to element above
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.style = 'margin-left: 12px';
            deleteButton.addEventListener('click', onDelete);
            deleteButton.id = todo.id;

            const checkbox = document.createElement("INPUT");
            checkbox.setAttribute("type", "checkbox");
            checkbox.dataset.todoId = todo.id;
            checkbox.addEventListener('change', onChecked);
            if (todo.isDone === true) {
                checkbox.checked = true;
            }

            element.appendChild(deleteButton);
            element.prepend(checkbox);

            //Add edit button
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style.marginLeft = '12px';
            editButton.dataset.todoId = todo.id;
            editButton.addEventListener('click', onEdit)
            element.insertBefore(editButton, deleteButton);

        }
        //Add div to to-do list
        todoList.appendChild(element);
    });
}


//Controller
const addTodoButton = document.querySelector('#addTodo');
addTodoButton.addEventListener('click', onAdd);

function onAdd() {
    const textbox = document.querySelector('#todo-title');
    let title = textbox.value;
    const datePicker = document.querySelector('#date-picker');
    let dueDate = datePicker.value;

    createTodo(title, dueDate);
    clearFields();
    render();

}

function clearFields() {
    const textbox = document.querySelector('#todo-title');
    textbox.value = "";
    const datePicker = document.querySelector('#date-picker');
    datePicker.value = "";
}

function onDelete(event) {
    // console.log(event);
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTodo(idToDelete)

    render();
}

function onChecked(event) {
    // console.log('Check');
    const checkbox = event.target;
    // console.log(checkbox.checked);
    const todoID = checkbox.dataset.todoId;

    toggleTodo(checkbox.checked, todoID);

    render();
}

function onEdit(event) {
    console.log('editing');
    const editButton = event.target;
    const todoId = editButton.dataset.todoId;

    setEditing(todoId);
    render()


}

function onUpdate(event) {
    const updateButton = event.target;
    // console.log(updateButton);
    const todoId = updateButton.dataset.todoId;
    // console.log(todoId);

    const textBox = document.querySelector('#edit-title-' + todoId);
    // console.log(textBox)
    const newTitle = textBox.value;

    const datePicker = document.querySelector('#edit-date-' + todoId);
    const newDate = datePicker.value;

    updateTodo(todoId, newTitle, newDate);
    render();
}

render();