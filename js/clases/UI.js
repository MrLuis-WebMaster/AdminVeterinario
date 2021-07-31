import {EditarCita,EliminarCita} from '../funciones.js';
import {ContenedorCitas} from '../selectores.js';

//USER INTERFACE

class UI {

    imprimirAlerta(mensaje,tipo) {
        const div = document.createElement("div");
        div.textContent = mensaje;
        div.classList.add("text-center","alert","col-12","d-block");
        if (tipo === "error") {
            div.classList.add("alert-danger");

        } else {
            div.classList.add("alert-success")
        }

        document.querySelector("#contenido").insertBefore(div, document.querySelector(".agregar-cita"));

        setTimeout(() => {
            div.remove();
        }, 2500);
    }

    CitasHTML ({citas}) {
        this.LimpiarHTML();
        citas.forEach(cita => {
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

            const CitaDiv = document.createElement("div");
            CitaDiv.classList.add("cita","p-3");
            CitaDiv.dataset.id = id;

            //Scripting 

            const mascotaParrafo = document.createElement("h2");
            mascotaParrafo.classList.add("card-title","font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("p");
            propietarioParrafo.innerHTML = `
                <span class = "font-weight-bolder"> PROPIETARIO:</span> ${propietario}
            `;

            const telefonoParrafo = document.createElement("p");
            telefonoParrafo.innerHTML = `
                <span class = "font-weight-bolder"> TELEFONO:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement("p");
            fechaParrafo.innerHTML = `
                <span class = "font-weight-bolder"> FECHA:</span> ${fecha}
            `;

            const horaParrafo = document.createElement("p");
            horaParrafo.innerHTML = `
                <span class = "font-weight-bolder"> HORA:</span> ${hora}
            `;
            const sintomasParrafo = document.createElement("p");
            sintomasParrafo.innerHTML = `
                <span class = "font-weight-bolder"> SINTOMAS:</span> ${sintomas}
            `;

            //boton eliminar 
            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn","btn-danger","mr-2");
            btnEliminar.innerHTML = 'Eliminar';
            btnEliminar.onclick = () => EliminarCita(id); 
            //boton edicion
            const btnEditar= document.createElement("button");
            btnEditar.classList.add("btn","btn-info");
            btnEditar.innerHTML = 'Editar';
            btnEditar.onclick = () => EditarCita(cita); 

            //CitaDiv

            CitaDiv.appendChild(mascotaParrafo);
            CitaDiv.appendChild(propietarioParrafo);
            CitaDiv.appendChild(telefonoParrafo);
            CitaDiv.appendChild(fechaParrafo);
            CitaDiv.appendChild(horaParrafo);
            CitaDiv.appendChild(sintomasParrafo);
            CitaDiv.appendChild(btnEliminar);
            CitaDiv.appendChild(btnEditar);

            // Mostrar en el HTML

            ContenedorCitas.appendChild(CitaDiv);

        });
    }

    LimpiarHTML() {
        while(ContenedorCitas.firstChild){
            ContenedorCitas.removeChild(ContenedorCitas.firstChild);
        }
    }

}

export default UI;