//Ajouter une tâche CHECK
//Supprimer une tâche CHECK
//cocher ou décocher une tâche
//afficher les éléments selon s'ils sont cochés ou non
//Enregistrer localStorage

let fullList = document.querySelector(".list-group");

function todoList () {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((response) => response.json())
    .then(tasksList => {
        displayList(tasksList)
        addListElement(tasksList)
        deleteListElement(tasksList);
        checkedElement()
        tasksFilter();
    });
};

function displayList (list) {
    fullList.innerHTML = "";
    for (let i = 0; i < list.length; i ++) {
        displayListElement (list[i]);
    }
}

function displayListElement (element) {
    let li = document.createElement("li");
    li.classList.add("todo", "list-group-item", "d-flex", "align-items-center");
    li.innerHTML = /* html */
    `   <input class="form-check-input" type="checkbox" id="todo-${element.id}">
        <label class="ms-2 form-check-label" for="todo-${element.id}"> ${element.title}
        </label>
        <label class="ms-auto btn btn-danger btn-sm">
            <i class="bi-trash">
            </i>
        </label>
    `
    fullList.appendChild(li);
}

function addListElement (list) {
    let submitBtn = document.querySelector("form");
    submitBtn.addEventListener("submit", function (e) {
        e.preventDefault();
        let listId = list.length
        let newTask = new FormData(e.currentTarget).get("title").toString().trim()
        if(newTask === "") {
            //Afficher un message
            return
        }
        let task = {
            id: `${listId + 1}`,
            title: `${newTask}`,
            completed: false
        }
        list.push(task)
        displayList(list)
        deleteListElement(list)
    });
}

function deleteListElement (list) {
    let btnTrashcan = document.querySelectorAll(".btn-danger");
    btnTrashcan.forEach((btn, i) => {
        btn.addEventListener("click", function () {
            list.splice(i, 1)
            displayList(list)
            deleteListElement(list)
        })
    })
}

function checkedElement () {
    let checkboxs = document.querySelectorAll(".form-check-input");
    checkboxs.forEach((checkbox, i) => {
        checkbox.addEventListener("change", function (e) {
            e.preventDefault()
            if (checkbox.checked) {
                checkbox.parentNode.classList.add("done")
            } else {
                checkbox.parentNode.classList.remove("done")
            }
        })
    })
}

function tasksFilter () {
let taskFilter = document.querySelectorAll(".btn-outline-primary")
taskFilter.forEach((filter, i) => {
    filter.addEventListener("click", function (e) {
        e.preventDefault()
        let activeBtn = document.querySelector(".btn-outline-primary.active")
        activeBtn.classList.remove("active")
        filter.classList.add("active")
        showTasksFilter(filter);
    })
})
}

//Essayer : masquer toutes les tâches PUIS afficher que celles que je souhaite
function showTasksFilter (filter) {
    let allTasks = document.querySelector(".list-group")
        if (filter.dataset.filter === "done") {
            allTasks.classList.add("hide-task-todo")
            allTasks.classList.remove("hide-task-completed")
        } else if (filter.dataset.filter === "todo") {
            allTasks.classList.add("hide-task-completed")
            allTasks.classList.remove("hide-task-todo")
        } else {
            allTasks.classList.remove("hide-task-todo")
            allTasks.classList.remove("hide-task-completed")
        }
//Lors du clique sur "faites"
//afficher seulement les element AVEC la class "done"
//cacher les autres avec display none
}

todoList();