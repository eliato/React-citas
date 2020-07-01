import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import PropTypes from "prop-types";

function App() {
  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use useEffect para realiza ciertas operacion cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  //funcion que tome las citas actulaes y agregue la nueva cita
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //funcion que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //mensaje conficional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus Cita";
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>
              {titulo}
              {citas.map((cita) => (
                <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
              ))}
            </h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};
export default App;
