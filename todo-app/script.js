const input = document.getElementById("input");
const boton = document.getElementById("boton");
const lista = document.getElementById("lista");

const mensaje = document.createElement("p");
mensaje.textContent = "No hay tareas pendientes";

let tasks = [];

function saveData(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData(){
  const stored = localStorage.getItem("tasks");
  if (stored)
    tasks = JSON.parse(stored);
}

function renderTasks(){
  lista.innerHTML = "";
  if (tasks.length === 0){lista.appendChild(mensaje);
    return;
  }
  tasks.forEach((task, i) => {const {text, completed} = task;
    const li = document.createElement("li");
    const span = document.createElement("span");
    const eliminar = document.createElement("button");
    li.appendChild(span);
    li.appendChild(eliminar);

    if (completed) li.classList.add("completed");
    span.textContent = text;
    eliminar.textContent = "X";

    li.addEventListener("click", () => {task.completed = !task.completed;
      saveData();
      renderTasks();});
    eliminar.addEventListener("click", (e) => {e.stopPropagation();
      if(!confirm("¿Desea eliminar esta tarea?")) return;
      tasks.splice(i, 1);
      saveData();
      renderTasks();});
    lista.appendChild(li);
  });
}

loadData();
renderTasks();
boton.addEventListener("click", () => {const texto = input.value.trim();
  input.value = "";
  if (texto === "") return;
  tasks.push({text: texto, completed: false});
  saveData();
  renderTasks();});