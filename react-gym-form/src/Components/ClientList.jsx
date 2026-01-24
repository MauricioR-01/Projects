import React from "react";

export default function ClientList({ clients }){
    return (
        <div id="clientList">
            <h2>Miembros suscritos a M-ReyC Gym</h2>
            {clients.length === 0 ?(
                <p>No hay miembros suscritos</p>
            ):(
                <ul>
                    {clients.map((client, index) => (
                        <li key={index}>
                            {client.clientName}. Contactar por Teléfono: {client.phone}, e-mail: {client.email}<br/>
                            Suscrito del {client.startDate} al {client.endDate} (plan 
                            {{  'visit': ' visita',
                                'weekly': ' semanal',
                                'biweek': ' quincenal',
                                'monthly': ' mensual',
                                'annual': ' anual'}[client.plan]})
                            {client.particularInstructor && " | Contrató instructor privado"}<br/>
                            Edad: {client.age} años (Cumpleaños {client.birthday})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}