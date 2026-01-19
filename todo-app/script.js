const input = document.getElementById("input");
const boton = document.getElementById("boton");
const lista = document.getElementById("lista");

let tasks = [];

function renderTasks(){
  lista.innerHTML = "";
  tasks.forEach(task => {const li = document.createElement("li");
    li.textContent = task.text;
    lista.appendChild(li);
  })
}

boton.addEventListener("click", () => {const texto = input.value.trim();
  input.value = "";
  if (texto === "") return;
  tasks.push({text: texto, completed: false});
  renderTasks();});