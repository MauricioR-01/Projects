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
                                <span class="cName">{client.clientName}</span><br/>
                                Suscrito del {client.startDate} al {client.endDate} ( 
                                {{  'visit': 'visita',
                                    'weekly': 'plan semanal',
                                    'biweek': 'plan quincenal',
                                    'monthly': 'plan mensual',
                                    'annual': 'plan anual'}[client.plan]})
                                {client.particularInstructor && " | Contrató instructor privado"}<br/><br/>
                                {client.email}<br/>
                                Tel: {client.phone}<br/>
                                Edad: {client.age} años ({client.birthday})
                            </span>
                            <button type="button" onClick={() => {const confirmed = window.confirm("¿Seguro que deseas cancelar la suscripción de este miembro?");
                                if (confirmed) removeClient(index); }}>
                                Cancelar suscripción
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}