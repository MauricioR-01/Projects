import React from "react";

export default function ClientList({ clients, setClients }){
    const removeClient = (indexToRemove) => {
        const updatedClients = clients.filter((_, index) => index !== indexToRemove);
        setClients(updatedClients);
        localStorage.setItem("clients", JSON.stringify(updatedClients));
    };

    return (
        <div id="clientList">
            <h2>Miembros suscritos a M-ReyC Gym</h2>
            {clients.length === 0 ?(
                <p>No hay miembros suscritos</p>
            ):(
                <ul>
                    {clients.map((client, index) => (
                        <li key={index}>
                            <span>
                                {client.clientName}. Contactar por Teléfono: {client.phone}, e-mail: {client.email}<br/>
                                Suscrito del {client.startDate} al {client.endDate} (plan 
                                {{  'visit': ' visita',
                                    'weekly': ' semanal',
                                    'biweek': ' quincenal',
                                    'monthly': ' mensual',
                                    'annual': ' anual'}[client.plan]})
                                {client.particularInstructor && " | Contrató instructor privado"}<br/>
                                Edad: {client.age} años (Cumpleaños {client.birthday})
                            </span>
                            <button type="button" onClick={() => removeClient(index)} style={{ background: "red", color: "white" }}>
                                Cancelar suscripción
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}