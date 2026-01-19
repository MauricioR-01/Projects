const input = document.getElementById("input");
const boton = document.getElementById("boton");
const lista = document.getElementById("lista");

boton.addEventListener("click", () => {if (input.value.trim() == "") return;
    const li = document.createElement("li");
  li.textContent = input.value;
    lista.appendChild(li);
    input.value = "";});