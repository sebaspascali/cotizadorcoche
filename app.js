// Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// realiza la cotizcion con los datos
 Seguro.prototype.cotizarSeguro = function (){

    /* 
        1= Americano 1.15
        2= Asiatico 1
        3= Europeo 1.55
    */

    let cantidad;

    const base = 500;
     switch (this.marca) {
         case'1':
            cantidad = base * 1.15;
            break;
         case'2':
         cantidad = base * 1;
         break;
         case'3':
         cantidad = base * 1.55;
         break;
         default:
             break;
     }

     // leer el año 
     const diferencia = new Date().getFullYear() - this.year;

     // cada año que la diferencia es mayor, el costo va a reducirce un 3%
     cantidad -= ((diferencia * 3) * cantidad) / 100;

     /* Si el seguro es basico se multiplica por un 30$mas

        si el seguro es completo se multiplica por un 50% mas
     */
         if(this.tipo ==='basico') {
             cantidad == 1.30;
         } else {
             cantidad *= 1.50;
         }

         return cantidad;
    

 }

function UI () {}

// Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
           min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insertar texto en html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

     setTimeout(() => {
         div.remove();
     },2000);
}

UI.prototype.mostrarResultado = (total, seguro) => {

    const {marca, year, tipo} = seguro;

    let textoMarca;

    switch (marca) {
        case '1':
            textoMarca = 'Americano'
            break
        case '2':
             textoMarca = 'Asiatico'
            break
        case '3':
             textoMarca = 'Europeo'
             break
        default:
             break;
    }
    
    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
     <p class="header">Tu Resumen</p>
     <p class="font-bold">Marca: <span class="font-normal">${textoMarca} </span></p>
     <p class="font-bold">Año: <span class="font-normal">${year} </span></p>
     <p class="font-bold">Cobertura: <span class="font-normal capitalize">${tipo} </span></p>
     <p class="font-bold">Total: <span class="font-normal">${total}€  anual </span></p>
    `;


    const resultadoDiv = document.querySelector('#resultado');
    

    // MOstrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display ='block';

    setTimeout(() => {
        spinner.style.display ='none'; // se borra el spinner y se muestra resultado
        resultadoDiv.appendChild(div);
    },2000);


}

// instanciar UI

const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    // LLENA opciones con los años una vez cargado el doc
    ui.llenarOpciones();
})

addEventListener();
function addEventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    //leear la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // leer año seleccionado
    const year = document.querySelector('#year').value;

    // leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
   
    if (marca === ''|| year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    } 
    ui.mostrarMensaje('Cotizando..', 'exito');

    // Ocultar las cotizaciones previas

    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    // instanciar el seguro
    const seguro = new Seguro (marca, year, tipo);
    const total = seguro.cotizarSeguro();


    // Utilizar el prototype que va a cotizar 
    ui.mostrarResultado(total, seguro);
}