//Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// load all event listeners
loadEventListeners();

function loadEventListeners() {
    //add task
    form.addEventListener("submit", addTask);
    //remove task
    taskList.addEventListener("click", removeTask);
    //clear tasks
    clearBtn.addEventListener("click", clearTasks);
    //filter tasks
    filter.addEventListener("keyup", filterTasks);
    //DOM load
    document.addEventListener("DOMContentLoaded", getTasks);
}

function addTask(e) {
    console.log(e);
    if (taskInput.value == "") {
        alert("Add a task")
    } else {
        //create li element
        const li = document.createElement("li");
        //add class
        li.className = "collection-item";
        //create text node and append to li
        const textNode = document.createTextNode(taskInput.value);
        li.appendChild(textNode)
            //create link
        link = document.createElement("a");
        //add class
        link.className = "delete-item secondary-content";
        //add icon html
        link.innerHTML = "<i class='fa fa-remove'></i>";
        //append the link to li
        li.appendChild(link);

        //append the li to ul
        taskList.appendChild(li);

        //store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //clear input
        taskInput.value = "";

    }


    // console.log(li);
    e.preventDefault();
}

function removeTask(e) {
    console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target);
        if (confirm("Are you Sure")) {
            e.target.parentElement.parentElement.remove();
            //remove from Local STorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    }


}

function clearTasks() {
    // taskList.remove()

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    //clear LS
    clearTasksFromLocalStorage();
}

function filterTasks(e) {
    text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll(".collection-item").forEach(function(task) {
        // console.log(task);
        const item = task.firstChild.textContent;
        // console.log(item)
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
        //create li element
        const li = document.createElement("li");
        //add class
        li.className = "collection-item";
        //create text node and append to li
        const textNode = document.createTextNode(task);
        li.appendChild(textNode)
            //create link
        link = document.createElement("a");
        //add class
        link.className = "delete-item secondary-content";
        //add icon html
        link.innerHTML = "<i class='fa fa-remove'></i>";
        //append the link to li
        li.appendChild(link);

        //append the li to ul
        taskList.appendChild(li);
    })

}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent == task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}