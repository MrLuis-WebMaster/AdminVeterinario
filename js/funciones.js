import Citas from './clases/citas.js';
import UI from './clases/UI.js';

import {mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario,
    ContenedorCitas} from './selectores.js';

//Instancias globales

const ui = new UI();
const AdministradorCitas = new Citas();

// variable tipo bandera

let editando;

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

export function datosCita (e) {
    DatoCita[e.target.name] = e.target.value;
}

export function AgregarCita (e) {
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

export function EliminarCita (id) {

    // eliminar cita

    AdministradorCitas.EliminarCita(id);

    //mostrar mensaje

    ui.imprimirAlerta("Eliminado Correctamente")

    //refrescar citas

    ui.CitasHTML(AdministradorCitas);


}

export function EditarCita (cita) {
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

export function reiniciarObjeto () {
    DatoCita.mascota="";
    DatoCita.propietario="";
    DatoCita.telefono="";
    DatoCita.fecha="";
    DatoCita.hora="";
    DatoCita.sintomas="";

}