const input = document.getElementById("input");
const boton = document.getElementById("boton");
const lista = document.getElementById("lista");

let tasks = [];

function renderTasks(){
  lista.innerHTML = "";
  tasks.forEach((task, i) => {const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.textContent = task.text;
    li.addEventListener("click", () => {task.completed = !task.completed;
      renderTasks();});
    li.addEventListener("dblclick", () => {tasks.splice(i, 1);
      renderTasks();});
    lista.appendChild(li);
  });
}

boton.addEventListener("click", () => {const texto = input.value.trim();
  input.value = "";
  if (texto === "") return;
  tasks.push({text: texto, completed: false});
  renderTasks();});