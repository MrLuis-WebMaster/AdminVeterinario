// Seleccionar los inputs

const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// formulario 
const formulario = document.querySelector("#nueva-cita");

// variable tipo bandera

let editando;

// contenedor citas

const ContenedorCitas = document.querySelector("#citas");

//CLASES
//Administrador de citas
class Citas {
    constructor () {
        this.citas= []
    }

    AgregarCita (cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

    EliminarCita (id) {
        this.citas = this.citas.filter( cita => cita.id !== id)
    }

    EditarCita (citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);

    }
}

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

//Instancias globales

const ui = new UI();
const AdministradorCitas = new Citas();

// Eventos 
Eventos();
function Eventos () {
    mascotaInput.addEventListener("input",datosCita);
    propietarioInput.addEventListener("input",datosCita);
    horaInput.addEventListener("input",datosCita);
    sintomasInput.addEventListener("input",datosCita);
    telefonoInput.addEventListener("input",datosCita);
    fechaInput.addEventListener("input",datosCita);
    formulario.addEventListener("submit",AgregarCita);
}

//objeto para leer datos del formulario
const DatoCita = {
    mascota:"",
    propietario:"",
    telefono:"",
    fecha:"",
    hora:"",
    sintomas:""
}

//Funciones

function datosCita (e) {
    DatoCita[e.target.name] = e.target.value;
}

function AgregarCita (e) {
    e.preventDefault();

    const {mascota,propietario,telefono,fecha,hora,sintomas} = DatoCita;
    // Validando la cita
    if (mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta("Faltan campos","error");
        return;
    }

    if (editando) {
        ui.imprimirAlerta("Editado Correctamente");

        //pasar el objeto a editar
        AdministradorCitas.EditarCita({...DatoCita})

        formulario.querySelector('button[type="submit"]').textContent = "CREAR CITA";


        // Desactivar modo edicion

        editando = false;
    } else {
    /* Generamos un ID */
        DatoCita.id = Date.now();

        // Creando una nueva cita
        
        AdministradorCitas.AgregarCita({...DatoCita});

        // mensaje
        
        ui.imprimirAlerta("Agregado Correctamente");

    }

    //agregando la nueva cita

    //reiniciar el obejto

    reiniciarObjeto();

    // reiniciar el formulario

    formulario.reset();

    // mostrar el html

    ui.CitasHTML(AdministradorCitas);



}

function EliminarCita (id) {

    // eliminar cita

    AdministradorCitas.EliminarCita(id);

    //mostrar mensaje

    ui.imprimirAlerta("Eliminado Correctamente")

    //refrescar citas

    ui.CitasHTML(AdministradorCitas);


}

function EditarCita (cita) {
    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar objeto
    DatoCita.mascota=mascota;
    DatoCita.propietario=propietario;
    DatoCita.telefono=telefono;
    DatoCita.fecha=fecha;
    DatoCita.hora=hora;
    DatoCita.sintomas=sintomas;

    //cambiar texto del boton 

    formulario.querySelector('button[type="submit"]').textContent = "Guardar cambios";

    // editando

    editando = true;

}

function reiniciarObjeto () {
    DatoCita.mascota="";
    DatoCita.propietario="";
    DatoCita.telefono="";
    DatoCita.fecha="";
    DatoCita.hora="";
    DatoCita.sintomas="";

}

















