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

const todos = JSON.parse(localStorage.todos) || [];

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
  notCompletedCountElement.textContent = `${count} item${count > 1 ? "s" : ""} left`;
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
  }

  // gestion de la suppression

  if (e.target.matches(".destroy")) {
    const index = todos.findIndex((item) => item.id == itemElement.dataset.id);
    todos.splice(index, 1);
    itemElement.remove();
    updateLocalStorage();
    renderNotCompletedCount();
  }
});
