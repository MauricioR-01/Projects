//Formulario de suscripción
const subscriptionForm = document.getElementById("subscriptionForm");
const clientForm = document.getElementById("clientForm");
//Periodo de suscripción
const startDateInput = document.getElementById("startDate");
let startDateValue = new Date();
startDateInput.value = startDateValue.toLocaleDateString('en-CA');
const endDateInput = document.getElementById("endDate");
let endDateValue = new Date(startDateValue);
endDateInput.value = startDateValue.toLocaleDateString('en-CA');
//Datos personales
const ladaCountryInput = document.getElementById("ladaCountry");
let ladaCountryValue = ladaCountryInput.value;
const ladaInput = document.getElementById("lada");
let ladaValue = ladaInput.value;
const birthdayInput = document.getElementById("birthday");
let birthdayValue = new Date(birthdayInput.value);
const ageInput = document.getElementById("age");
let ageValue = ageInput.value;
//Detalles de suscripción
const planInput = document.getElementById("plan");
let planValue = planInput.value;
//Botón Enviar
const submit = document.getElementById("submit");
//Miembros suscritos
const members = document.getElementById("members");
//Mensaje No hay clientes suscritos
const message = document.createElement("p");
message.textContent = "No hay clientes suscritos";

let clients = [];

function saveData(){
    localStorage.setItem("clients", JSON.stringify(clients));
}
function loadData(){
    const stored = localStorage.getItem("clients");
    if (stored)
        clients = JSON.parse(stored);
}

function createClient(formData){
    return{
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        birthday: formData.birthday,
        age: formData.age,
        plan: formData.plan,
        particularInstructor: formData.particularInstructor,
        acceptedTerms: formData.acceptedTerms,
        startDate: formData.startDate,
        endDate: formData.endDate
    };
}

function renderClients(){members.innerHTML="";
    if (clients.length === 0){members.appendChild(message);
        return;
    }
    clients.forEach((client, i) =>{
        const {clientName, email, phone, birthday, age, plan, particularInstructor, acceptedTerms, startDate, endDate} = client;
        const li = document.createElement("li");
        const span = document.createElement("span");
        const eliminar = document.createElement("button");
        li.appendChild(span);
        li.appendChild(eliminar);

        const start = new Date(startDate);
        const end = new Date(endDate);
        const birth = new Date(birthday);
        let spanText = clientName + " | Suscripción del " + start.toLocaleDateString('en-ES') + " al " + end.toLocaleDateString('en-ES') + " | " + email + " | " + phone + " | " + birth.toLocaleDateString('en-ES') + " | " + age.toString() + " años | ";
        if (particularInstructor === true)
            spanText = spanText + " (Pagó instructor particular)"
        span.textContent = spanText;
        eliminar.textContent = "Cancelar suscripción";

        eliminar.addEventListener("click", function(e){e.stopPropagation();
          if(!confirm("¿Desea cancelar la suscripción de este miembro?")) return;
          clients.splice(i, 1);
          saveData();
          renderClients();});

        members.appendChild(li);
    })
}

function dateFromInput(value){
    const [year, month, day] = value.split("-");
    return new Date(year, month - 1, day);
}

loadData();
renderClients();

birthdayInput.addEventListener("change", function(e){birthdayValue = dateFromInput(birthdayInput.value);
    if (birthdayValue >= startDateValue){alert("Fecha de cumpleaños inválida");
        birthdayInput.value = null;
        birthdayValue = null;
        return;
    }
    ageValue = startDateValue.getFullYear() - birthdayValue.getFullYear();
    if (startDateValue.getMonth() <= birthdayValue.getMonth())
        if (startDateValue.getMonth() < birthdayValue.getMonth())
            ageValue = ageValue - 1;
        else
            if (startDateValue.getDate() < birthdayValue.getDate())
                ageValue = ageValue - 1;
    ageInput.value = ageValue;
});
planInput.addEventListener("change", function(e){planValue = planInput.value;
    endDateValue = new Date(startDateValue);
    switch (planValue){
        case "visit":
            endDateValue.setDate(startDateValue.getDate() + 1);
            break;
        case "weekly":
            endDateValue.setDate(startDateValue.getDate() + 7);
            break;
        case "biweek":
            endDateValue.setDate(startDateValue.getDate() + 15);
            break;
        case "monthly":
            endDateValue.setMonth(startDateValue.getMonth() + 1);
            break;
        case "annual":
            endDateValue.setFullYear(startDateValue.getFullYear() + 1);
            break;
    }
    endDateInput.value = endDateValue.toISOString().split('T')[0];
});
ladaCountryInput.addEventListener("change", function(e){ladaCountryValue = ladaCountryInput.value;
    switch (ladaCountryValue){
        case "Mexico":
            ladaValue = "+52";
            break;
        case "Alemania":
            ladaValue = "+49";
            break;
        case "Argentina":
            ladaValue = "+54";
            break;
        case "Belgica":
            ladaValue = "+32";
            break;
        case "Brasil":
            ladaValue = "+55";
            break;
        case "Colombia":
            ladaValue = "+57";
            break;
            case "Ecuador":
            ladaValue = "+593";
            break;
        case "Espana":
            ladaValue = "+34";
            break;
            case "Estados Unidos":
            ladaValue = "+1";
            break;
        case "Finlandia":
            ladaValue = "+358";
            break;
            case "Francia":
            ladaValue = "+33";
            break;
        case "Guatemala":
            ladaValue = "+502";
            break;
            case "Portugal":
            ladaValue = "+351";
            break;
        case "Reino Unido":
            ladaValue = "+44";
            break;
    }
    ladaInput.value = ladaValue;
});
clientForm.addEventListener("submit", function(e){e.preventDefault();
    //DOM
    const clientNameInput = document.getElementById("clientName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const particularInstructorInput = document.getElementById("particularInstructor");
    const acceptedTermsInput = document.getElementById("acceptedTerms");
    //Values
    const clientNameValue = clientNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const particularInstructorValue = particularInstructorInput.checked;
    const acceptedTermsValue = acceptedTermsInput.checked;

    if(!clientNameValue){
        alert("Ingrese su nombre");
        return;
    }
    if(!emailValue){
        alert("Ingrese su correo electrónico");
        return;
    }
    if(!phoneValue){
        alert("Ingrese su número telefónica");
        return;
    }
    if(!ladaCountryValue){
        alert("Ingrese la lada internacional de su número telefónico");
        return;
    }
    if(!planValue){
        alert("Elija el plan de su suscripción");
        return;
    }
    if (isNaN(birthdayValue.getTime())) {
        alert("Fecha de nacimiento inválida");
        return;
    } 
    if(acceptedTermsValue === false){alert("Acepte los términos");
        return;
    }

    const client = createClient({
        clientName: clientNameValue,
        email: emailValue,
        phone: ladaValue + ' ' + phoneValue,
        birthday: birthdayValue,
        age: ageValue,
        plan: planValue,
        particularInstructor: particularInstructorValue,
        acceptedTerms: acceptedTermsValue,
        startDate: startDateValue,
        endDate: endDateValue
    });
    clients.push(client);
    saveData();
    renderClients();

    clientNameInput.value = "";
    emailInput.value = "";
    ladaCountryInput.value = "";
    ladaCountryValue = "";
    ladaInput.value = "";
    ladaValue = "";
    phoneInput.value = "";
    birthdayInput.value = "";
    birthdayValue = null;
    ageInput.value = null;
    ageValue = null;
    planInput.value = "";
    planValue = "";
    particularInstructorInput.checked = false;
    acceptedTermsInput.checked = false;
    startDateValue = new Date();
    startDateInput.value = startDateValue.toLocaleDateString('en-CA');
    endDateValue = new Date(startDateValue);
    endDateInput.value = startDateValue.toLocaleDateString('en-CA');
});