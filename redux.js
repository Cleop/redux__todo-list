const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
    return state.concat(
      {
        id: action.id,
        text: action.text,
        completed: false
      }
    );
    case 'TOGGLE_TODO':
    return state.map(todoItem => {
      if(todoItem.id !== action.id) {
        return todoItem;
      }
      todoItem.completed = !todoItem.completed;
      return todoItem;
    }
  );
  default:
  return state;
}
};

const { createStore } = Redux; // Redux is GLOBAL Object from redux.min.js
// create the store for our mini-app using the todos reducer
const store = createStore(todos);

const render = () => { // render function updates DOM with todos values
  createListElement();
  // document.querySelector('.todo-list').innerHTML = '<li>'+(store.getState()[0]).text+'</li>'
}

function createListElement() {
  var ul = document.getElementsByClassName('todo-list');
  var li = document.createElement("li");
  li.appendChild(document.createTextNode((store.getState()[0]).text));
  ul.appendChild(li);
}

store.subscribe(render); // all actions re-render the DOM

// listen for click event on the create button
document.querySelector('.create-btn').addEventListener('click', () => {
  store.dispatch({type:'ADD_TODO', id: 1, text: 'Buy milk'}); // create new todo item
});
