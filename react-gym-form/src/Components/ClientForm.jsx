import { useState, useEffect } from "react";

const plans = [
    {value: "visit", label: "Visita"},
    {value: "weekly", label: "Semanal"},
    {value: "biweek", label: "Quincenal"},
    {value: "monthly", label: "Mensual"},
    {value: "annual", label: "Anual"}
];
const countries = [
    {countryName: "México", value: "+52", flag: "https://flagcdn.com/w20/mx.png"},
    {countryName: "Alemania", value: "+49", flag: "https://flagcdn.com/w20/ge.png"},
    {countryName: "Argentina", value: "+54", flag: "https://flagcdn.com/w20/ar.png"},
    {countryName: "Bélgica", value: "+32", flag: "https://flagcdn.com/w20/be.png"},
    {countryName: "Brasil", value: "+55", flag: "https://flagcdn.com/w20/br.png"},
    {countryName: "Colombia", value: "+57", flag: "https://flagcdn.com/w20/co.png"},
    {countryName: "Ecuador", value: "+593", flag: "https://flagcdn.com/w20/ec.png"},
    {countryName: "España", value: "+34", flag: "https://flagcdn.com/w20/es.png"},
    {countryName: "Estados Unidos", value: "+1", flag: "https://flagcdn.com/w20/us.png"},
    {countryName: "Finlandia", value: "+358", flag: "https://flagcdn.com/w20/fi.png"},
    {countryName: "Francia", value: "+33", flag: "https://flagcdn.com/w20/fr.png"},
    {countryName: "Guatemala", value: "+502", flag: "https://flagcdn.com/w20/gt.png"},
    {countryName: "Portugal", value: "+351", flag: "https://flagcdn.com/w20/pt.png"},
    {countryName: "Reino Unido", value: "+44", flag: "https://flagcdn.com/w20/gb.png"}
];

export default function ClientForm({ addClient }){
    const today = new Date().toISOString().slice(0,10);
    const [client, setClient] = useState({
    clientName: "",
    email: "",
    phone: "",
    birthday: "",
    age: "",
    plan: "",
    particularInstructor: false,
    acceptedTerms: false,
    startDate: today,
    endDate: today
    });
    
    const handleSubmit = (e) => {
    e.preventDefault();
    addClient(client);
    setClient({
      clientName: "",
      email: "",
      phone: "",
      birthday: "",
      age: "",
      plan: "",
      particularInstructor: false,
      acceptedTerms: false,
      startDate: today,
      endDate: today
    });
    };

    const [selectedCountry, setSelectedCountry] = useState("");
    
    function dateFromInput(value){
        const [year, month, day] = value.split("-");
        return new Date(year, month - 1, day);
    }

    useEffect(() => {if (!client.plan) return;
        let finishDate = new Date(dateFromInput(client.startDate));
        switch (client.plan){
            case "visit":
                finishDate.setDate(finishDate.getDate() + 1);
                break;
            case "weekly":
                finishDate.setDate(finishDate.getDate() + 7);
                break;
            case "biweek":
                finishDate.setDate(finishDate.getDate() + 15);
                break;
            case "monthly":
                finishDate.setMonth(finishDate.getMonth() + 1);
                break;
            case "annual":
                finishDate.setFullYear(finishDate.getFullYear() + 1);
                break;
            default:
                break;
        }
        finishDate.setHours(0,0,0,0);
        let endDate = finishDate.toISOString().slice(0,10);
        setClient((prev) => ({ ...prev, endDate}));
    }, [client.plan, client.startDate]);
    
    useEffect(() => {if (client.birthday){
            const birthDate = new Date(client.birthday);
            const today = new Date();
            if (birthDate >= today){alert("Fecha de cumpleaños inválida");
                setClient((prev) => ({ ...prev, birthday: "", age: "" }));
                return;
            }
            let age = today.getFullYear() - birthDate.getFullYear();
            if ((today.getMonth() < birthDate.getMonth()) || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()))
                age --;
            setClient((prev) => ({ ...prev, age }));
        } else setClient((prev) => ({ ...prev, age: "" }));
    }, [client.birthday]);

    return (
        <form id="clientForm" onSubmit={handleSubmit}>
            <fieldset id="subscriptionPeriod">
                <legend>Periodo de suscripción</legend>
                <div className="fieldsetRow">
                    <div className="period">
                        <label htmlFor="startDate">Suscripción inicia: </label><input id="startDate" name="startDate" type="date" value={client.startDate} readOnly />
                    </div>
                    <div className="period">
                        <label htmlFor="endDate">Suscripción termina: </label><input id="endDate" name="endDate" type="date" value={client.endDate} readOnly />
                    </div>
                </div>
            </fieldset>

            <fieldset id="personalData">
                <legend>Datos personales</legend>
                <div className="field">
                    <label htmlFor="clientName">Nombre completo</label><input id="clientName" name="clientName" type="text" placeholder="Nombre y apellidos" value={client.clientName}
                        onChange={(e) => setClient({ ...client, clientName: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="email">e-mail</label><input id="email" name="email" type="email" placeholder="abc123@ejemplo.com"value={client.email}
                        onChange={(e) => setClient({ ...client, email: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="phone">Teléfono</label>
                    <select id="ladaCountry" name="lada" value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)} required>
                        <option value="" disabled>País</option>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>{country.countryName}</option>)   // <img src={country.flag} alt={country.clientName}/>
                        )}
                    </select>
                    <input id="phone" name="phone" type="tel" placeholder="XXX-XXX-XXXX" value={selectedCountry ? `${selectedCountry} ${client.phone}` : client.phone}
                        onChange={(e) => {const numberOnly = e.target.value.replace(/^\+\d+\s?/, ""); 
                            setClient({ ...client, phone: numberOnly });}}  required />
                </div>
                <div className="field">
                    <label htmlFor="birthday">Fecha de nacimiento</label><input id="birthday" name="birthday" type="date" value={client.birthday}
                        onChange={(e) => setClient({ ...client, birthday: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="age">Edad</label><input id="age" name="age" type="number" placeholder="Edad" value={client.age} readOnly />
                </div>
            </fieldset>

            <fieldset id="subscriptionDetails">
                <legend>Detalles de suscripción</legend>
                <div className="field">
                    <label htmlFor="plan">Plan</label>
                    <select id="plan" name="plan" value={client.plan}
                        onChange={(e) => setClient({ ...client, plan: e.target.value })} required>
                        <option value="" disabled>Selecciona un plan</option>
                        {plans.map((planned) => (
                            <option key={planned.value} value={planned.value}>{planned.label}</option>)
                        )}
                    </select>
                </div>
                <div className="check">
                    <label htmlFor="particularInstructor"><input id="particularInstructor" name="particularInstructor" type="checkbox" checked={client.particularInstructor}
                        onChange={(e) => setClient({ ...client, particularInstructor: e.target.checked })}/>¿Paga instructor particular?</label>
                </div>
                <div className="check">
                    <label htmlFor="acceptedTerms"><input id="acceptedTerms" name="acceptedTerms" type="checkbox" checked={client.acceptedTerms}
                        onChange={(e) => setClient({ ...client, acceptedTerms: e.target.checked })} required />Acepto términos y condiciones</label>
                </div>
            </fieldset>

            <button id="submit" type="submit">Suscribirse</button>
        </form>
    );
}