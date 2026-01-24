import React, { useEffect } from "react"
import { useState } from "react";

import ClientForm from "./Components/ClientForm"
import ClientList from "./Components/ClientList"

export default function App(){
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const addClient = (client) => {
    const newClients = [...clients, client];
    setClients(newClients);
    localStorage.setItem("clients", JSON.stringify(newClients));
  };
  
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  return (
    <>
      <div class="fondo"></div>
      <h1>Membresía de M-ReyC Gym</h1>
      <main class="container">
        <section id="subscriptionForm" class="card">
          <h2>Formulario de suscripción</h2>
          <ClientForm addClient={(client) => setClients([...clients, client])} />
        </section>
        <section id="subscriptions" class="card"> 
          <ClientList clients={clients} setClients={setClients} removeClient= {(i) => {const updated = clients.filter((_, index) => index !== i);
            setClients(updated);
            localStorage.setItem("clients", JSON.stringify(updated));}} />
        </section>
      </main>
    </>
  )
}
