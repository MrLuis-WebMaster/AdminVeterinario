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

export default Citas; // Exporto la clase