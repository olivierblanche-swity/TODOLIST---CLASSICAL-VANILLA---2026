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
todos.forEach(item => {
    const newItem = document.createElement('div');
    todosContainer.append(newItem);
    newItem.outerHTML = `
    <li data-id="${item.id}" class="${item.completed ? 'completed' : ''}">
            <div class="view">
              <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''} />
              <label>${item.content}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" value="${item.content}"/>
          </li>
          `;
});

