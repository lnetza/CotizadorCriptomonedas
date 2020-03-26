const cotizador = new API('b69f6b1096ea23bf1ea14f6916f38bd5a7e3d85749fb32f1ab2fa13b29555673');
const ui = new Interfaz();


//Leer el formulario

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit',e =>{
    e.preventDefault();

    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    

    //Leer cripto
    const criptoSelect = document.querySelector('#criptomoneda');
    const criptoSeleccionada = criptoSelect.options[criptoSelect.selectedIndex].value;

    //Comprobar que ambos campos tengan algo selccionado
    if(monedaSeleccionada ===''||criptoSeleccionada===''){
        //Arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios','alert bg-danger text-center');
    }else{
        //Todo bien, consultar la API
        cotizador.obtenerValores(monedaSeleccionada,criptoSeleccionada)
            .then(data=>{
                ui.mostrarResultado(data.resultado.RAW,monedaSeleccionada,criptoSeleccionada);
            })
    }

})