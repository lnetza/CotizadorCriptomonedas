class Interfaz{

    constructor(){
        this.init();
    }
    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas =>{
                //Crear un select de opciones
                const select = document.querySelector('#criptomoneda');

                //iterar por los resultados de la API con Object.entries iteramos en los objetos
                for(const [key, value] of Object.entries(monedas.monedas.Data)){
                   //Añadir el Symbol y el Nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value=value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    mostrarMensaje(mensaje,clases){
        const div = document.createElement('div');
        div.className=clases;
        div.appendChild(document.createTextNode(mensaje));

        //Seleccionar div mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        
        //Mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes').remove();
        }, 3000);
    }

    //Imprime el resultado de la cotización
    mostrarResultado(resultado,moneda,crypto){
        
        const resultadoAnterior = document.querySelector('#resultado > div');

        if(resultadoAnterior){
            resultadoAnterior.remove();
        }

        //console.log(resultado[crypto][moneda]);

        const datosMoneda = resultado[crypto][moneda];

        //recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            precioVariacion = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE*1000).toLocaleDateString('es-MX');

        //Construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda 
                    ${datosMoneda.TOSYMBOL} es de: $ ${precio}
                    </p>
                    <p>Variación último día: % ${precioVariacion}</p>
                    <p>Última actualización: ${actualizado}</p>
                </div>
            </div>
        `;

        this.mostrarSpinner('block');

        setTimeout(()=>{
            //Insertar el resultado
            document.querySelector('#resultado').innerHTML=templateHTML;
            
            //ocultar spinner
            this.mostrarSpinner('none');
        }, 3000);
        
    }

    //Mostrar un spinner de carga al enviar la cotización
    mostrarSpinner(vista){
        const spinner= document.querySelector('.contenido-spinner');
        spinner.style.display=vista;
    }
}