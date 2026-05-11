// INITIALISATION DU LOCALSTORAGE

//localStorage.todos = JSON.stringify([
//  {
//    id: 1,
//    content: "tache 1",
//    completed: true,
// },
//   {
//    id: 2,
//    content: "tache 2",
//    completed: false,
//  },
//]);

const todos = JSON.parse(localStorage.todos) ||  "[]";

const appElement = document.querySelector(".todoapp");
const addInputElement = appElement.querySelector(".new-todo");
const todosContainer = appElement.querySelector(".todo-list");
const notCompletedCountElement = appElement.querySelector(".todo-count");

// ajout initial des items dans le DOM
// ajout d'un item dans le DOM
function appendNewItemInDOM(item) {
  const newItem = document.createElement("div");
  todosContainer.append(newItem);
  newItem.outerHTML = `
    <li data-id="${item.id}" class="${item.completed ? "completed" : ""}">
            <div class="view">
              <input class="toggle" type="checkbox" ${item.completed ? "checked" : ""} />
              <label>${item.content}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" value="${item.content}"/>
          </li>
          `;
  renderNotCompletedCount();
}

// mise à jour du notCompleted
function renderNotCompletedCount() {
  const count = todos.filter((item) => !item.completed).length;
  notCompletedCountElement.textContent = `${count} active item${count > 1 ? "s" : ""} left`;
}

// ajout d'un item dans le tableau
function appendNewItemInARRAY(newItem) {
  todos.push(newItem);
}

// mise à jour du localStorage
function updateLocalStorage() {
  localStorage.todos = JSON.stringify(todos);
}

// ajout de tous les items du localStorage dans le DOM
todos.forEach((item) => {
  appendNewItemInDOM(item);
});

// gestion de l'ajout d'un item

addInputElement.addEventListener("change", function (e) {
  const newItem = { id: Date.now(), content: this.value, completed: false };
  appendNewItemInARRAY(newItem);
  appendNewItemInDOM(newItem);

  updateLocalStorage();
  this.value = "";
  renderFilteredTodos();
});

// gestion des completed

todosContainer.addEventListener("click", function (e) {
  const itemElement = e.target.closest("li");
  const item = todos.find((item) => item.id == itemElement.dataset.id);

  if (e.target.matches(".toggle")) {
    item.completed = !item.completed;
    itemElement.classList.toggle("completed");
    updateLocalStorage();
    renderNotCompletedCount();
    renderFilteredTodos();
  }

  // gestion de la suppression

  if (e.target.matches(".destroy")) {
    const index = todos.findIndex((item) => item.id == itemElement.dataset.id);
    if (index === -1){
    todos.splice(index, 1);
    itemElement.remove();
    updateLocalStorage();
    renderNotCompletedCount();
    renderFilteredTodos();
    }
  }
});


// filtre ALL / Active / Completed 

const filterLinks = document.querySelectorAll(".filters a");
let currentFilter = "all"; // all | active | completed

function renderFilteredTodos() {
  const items = todosContainer.querySelectorAll("li");

  items.forEach((li) => {
    const id = li.dataset.id;
    const item = todos.find((t) => t.id == id);

    if (currentFilter === "active" && item.completed) {
      li.style.display = "none";
    } else if (currentFilter === "completed" && !item.completed) {
      li.style.display = "none";
    } else {
      li.style.display = "";
    }
  });
}

filterLinks.forEach((link) => {
  link.addEventListener("click", function () {
    filterLinks.forEach((l) => l.classList.remove("selected"));
    this.classList.add("selected");

    if (this.getAttribute("href") === "#/active") {
      currentFilter = "active";
    } else if (this.getAttribute("href") === "#/completed") {
      currentFilter = "completed";
    } else {
      currentFilter = "all";
    }

    renderFilteredTodos();
  });
});

// clear completed

const clearCompletedBtn = document.querySelector(".clear-completed");

clearCompletedBtn.addEventListener("click", function () {
  // supprimer du tableau
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1);
    }
  }

  // supprimer du DOM
  const completedItems = todosContainer.querySelectorAll("li.completed");
  completedItems.forEach((li) => li.remove());

  updateLocalStorage();
  renderNotCompletedCount();
  renderFilteredTodos();
});

