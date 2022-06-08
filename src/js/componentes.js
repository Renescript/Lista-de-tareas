import { Todo } from "../classes/todo.class";
import { todoList } from "../index";

//referencias HTML

const divTodoList = document.querySelector(".todo-list");
const textInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFilter = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
    `;

  const todoDiv = document.createElement("div");
  todoDiv.innerHTML = htmlTodo;

  divTodoList.append(todoDiv.firstElementChild);

  return todoDiv.firstElementChild;
};

//events

textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && textInput.value.length > 0) {
    const nuevoTodo = new Todo(textInput.value);
    todoList.nuevoTodo(nuevoTodo);

    crearTodoHtml(nuevoTodo);
    textInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const nombreElemento = event.target.localName;
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");

  if (nombreElemento.includes("input")) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");

  } else if (nombreElemento.includes("button")) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild( todoElemento )

  }

  console.log(todoList);
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length -1; i >= 0; i--){

        const elemento = divTodoList.children[i]

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento)
        }


    }

});

ulFilter.addEventListener('click', (event) => {

  const filtro = event.target.text ;
  if(!filtro){
    return
  }

  anchorFiltros.forEach( elem => elem.classList.remove('selected'))
  event.target.classList.add('selected')

  for(const elemento of divTodoList.children){
    
    elemento.classList.remove('hidden')
    const completado = elemento.classList.contains('completed')

    switch(filtro) {

      case 'Pendientes':
        if(completado){
          elemento.classList.add('hidden')
        }
        break;

      case 'Completados':
        if(!completado){
          elemento.classList.add('hidden')
        }



    }


  }

})