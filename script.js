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
        checkedElement(tasksList)
        todoTasksFilter();
        doneTasksFilter()
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

function checkedElement (list) {
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

function todoTasksFilter () {
let todoFilter = document.querySelectorAll(".btn-outline-primary")
todoFilter.forEach((filter, i) => {
    filter.addEventListener("click", function (e) {
        e.preventDefault()
        let activeBtn = document.querySelector(".btn-outline-primary.active")
        activeBtn.classList.remove("active")
        filter.classList.add("active")
    })
})
}


//Essayer : masquer toutes les tâches PUIS afficher que celles que je souhaite
function doneTasksFilter () {
//Lors du clique sur "faites"
//afficher seulement les element AVEC la class "done"
//cacher les autres avec display none
}

//Ensuite gérer la class "active" selon sur quel filtre on est.
todoList();