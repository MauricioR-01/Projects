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

export default function ClientForm(){
    return (
        <form id="clientForm">
            <fieldset id="subscriptionPeriod">
                <legend>Periodo de suscripción</legend>
                <div className="fieldsetRow">
                    <div className="period">
                        <label htmlfor="startDate">Suscripción inicia: </label><input id="startDate" name="startDate" type="date" readOnly />
                    </div>
                    <div className="period">
                        <label htmlfor="endDate">Suscripción termina: </label><input id="endDate" name="endDate" type="date" readOnly />
                    </div>
                </div>
            </fieldset>

            <fieldset id="personalData">
                <legend>Datos personales</legend>
                <div className="field">
                    <label htmlfor="clientName">Nombre completo</label><input id="clientName" name="clientName" type="text" placeholder="Nombre y apellidos" required />
                </div>
                <div className="field">
                    <label htmlfor="email">e-mail</label><input id="email" name="email" type="email" placeholder="abc123@ejemplo.com" required />
                </div>
                <div className="field">
                    <label htmlfor="phone">Teléfono</label>
                    <select id="ladaCountry" name="lada" required>
                        <option value="" disabled selected>País</option>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>{country.countryName}</option>)   // <img src={country.flag} alt={country.clientName}/>
                        )}
                    </select>
                    <input id="lada" name="lada" type="text" placeholder="Lada" readOnly />
                    <input id="phone" name="phone" type="tel" placeholder="XXX-XXX-XXXX" required />
                </div>
                <div className="field">
                    <label htmlfor="birthday">Fecha de nacimiento</label><input id="birthday" name="birthday" type="date" required />
                </div>
                <div className="field">
                    <label htmlfor="age">Edad</label><input id="age" name="age" type="number" placeholder="Edad" readOnly />
                </div>
            </fieldset>

            <fieldset id="subscriptionDetails">
                <legend>Detalles de suscripción</legend>
                <div className="field">
                    <label htmlfor="plan">Plan</label>
                    <select id="plan" name="plan" required>
                        <option value="" disabled selected>Selecciona un plan</option>
                        {plans.map((planned) => (
                            <option key={planned.value} value={planned.value}>{planned.label}</option>)
                        )}
                    </select>
                </div>
                <div className="check">
                    <label htmlfor="particularInstructor"><input id="particularInstructor" name="particularInstructor" type="checkbox" />¿Paga instructor particular?</label>
                </div>
                <div className="check">
                    <label htmlfor="acceptedTerms"><input id="acceptedTerms" name="acceptedTerms" type="checkbox" required />Acepto términos y condiciones</label>
                </div>
            </fieldset>

            <button id="submit" type="submit">Suscribirse</button>
        </form>
    )
}