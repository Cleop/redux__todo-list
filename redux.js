if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

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
const getLastItem = () => store.getState().last();

/*
  const render = (state) => html
*/
const render = () => {
  var ul = document.querySelector(".todo-list");
  var content = '';
  store.getState().forEach(
    item => content += `<li><input class="checkbox" type="checkbox" name="completed"> ${item.text}</li>`
  );
  ul.innerHTML = content;
  console.log(store.getState());
}

// Original way of rendering
// const render = () => { // render function updates DOM with todos values
//   var lastItem = getLastItem();
//   var ul = document.querySelector(".todo-list");
//   var li = document.createElement("li");
//   li.appendChild(document.createTextNode(lastItem.text));
//   ul.appendChild(li);
//   // document.querySelector('.todo-list').innerHTML = '<li>'+(store.getState()[0]).text+'</li>'
// }

store.subscribe(render); // all actions re-render the DOM

// listen for click event on the create button
document.querySelector('.create-btn').onclick = () => {
  var inputText = document.querySelector(".todo-input").value;
  var lastItem = getLastItem();
  var id = lastItem ? lastItem.id + 1 : 0;
  store.dispatch({type:'ADD_TODO', id: id, text: inputText}); // create new todo item
};

// document.querySelector('.checkbox').onclick = () => {
//   var id = lastItem ? lastItem.id + 1 : 0;
//   store.dispatch({type:'TOGGLE_TODO', id: id}); // create new todo item
// };
