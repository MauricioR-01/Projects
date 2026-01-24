import React from "react"
import { useState } from "react";

import ClientForm from "./Components/ClientForm"
import ClientList from "./Components/ClientList"

export default function App(){
  const [clients, setClients] = useState([]);
  return (
    <>
      <h1>Membresía de M-ReyC Gym</h1>
      <ClientForm addClient={(client) => setClients([...clients, client])} />
      <ClientList clients={clients} />
    </>
  )
}
