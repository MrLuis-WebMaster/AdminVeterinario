import {datosCita,AgregarCita} from '../funciones.js';
import {mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario} from '../selectores.js';

class App {
    constructor () {
        this.InitApp();
    }
    InitApp() {
        mascotaInput.addEventListener("input",datosCita);
        propietarioInput.addEventListener("input",datosCita);
        horaInput.addEventListener("input",datosCita);
        sintomasInput.addEventListener("input",datosCita);
        telefonoInput.addEventListener("input",datosCita);
        fechaInput.addEventListener("input",datosCita);
        formulario.addEventListener("submit",AgregarCita);

    }
}

export default App;