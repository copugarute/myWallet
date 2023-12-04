//* Constructor movimiento********************************************************
class Movimiento{
    constructor(tipo_movimiento, categoria, monto, fecha){
        this._tipo_movimiento = tipo_movimiento;
        this._categoria = categoria;
        this._monto = monto;
        this._fecha = fecha;
    }

    get tipo(){
       return this._tipo_movimiento;
    }

    set tipo(new_tipo){
        this._tipo_movimiento = new_tipo;
    }

    get categoria(){
        return this._categoria;
    }

    set categoria(new_categoria){
        this._categoria = new_categoria;
    }

    get monto(){
        return this._monto;
    }

    set monto(new_monto){
        this._monto = new_monto
    }

    get fecha(){
        return this._fecha
    }

    set fecha(new_fecha){
        this._fecha = new_fecha
    }
}

//*Variables****************************************************************
let cat = ''

let movimientos = [];

let ingresos = [];

let gastos = [];

let suma_ingresos = 0;

let suma_gastos = 0;

let saldo = suma_ingresos;

let lista_categoria_ingreso = [
    {nombre: 'Elige una opcion', icono: '', valor: 'vacio'},
    {nombre:'Dinero extra', icono:'savings', valor: 'dinero extra'},
    {nombre: 'Salario', icono:'work', valor: 'salario'},
    {nombre: 'Otro', icono:'payments', valor: 'otro'}
]

let lista_categoria_gastos = [
    {nombre: 'Elige una opcion', icono: '', valor: 'vacio'},
    {nombre: 'Personal', icono: 'person', valor: 'personal'},
    {nombre: 'Educacion', icono: 'school', valor: 'educacion'},
    {nombre: 'Salud', icono: 'home_health', valor: 'salud'},
    {nombre: 'Hogar', icono: 'house', valor: 'hogar'}
]

//*Get elements HTML*********************************************************

    //Formulaio
let formulario = document.getElementById('my_form');

    //Select tipo movimiento
let select_movimiento = document.getElementById('tipo_movimiento');

    //Select categoria
let select_categoria = document.getElementById('categoria__select')

    //Input monto
let input_monto = document.getElementById('monto');

    //Saldo div
let saldo_html = document.getElementById('saldo');

    //gastos div
let gastos_html = document.getElementById('gastos');

    //ingresos div
let ingresos_html = document.getElementById('ingresos');

    //Card movimientos
let card_movimientos = document.getElementById('my_card')

let movimientos_container = document.getElementById('container_card')

//*Funciones****************************************************************

    //Funcion para definir categoría según el tipo de movimiento

select_movimiento.addEventListener('change', function(){

    if(select_movimiento.value == "ingreso"){
        select_categoria.style.display = 'block'
        select_categoria.innerHTML = ''
        lista_categoria_ingreso.forEach((item)=>{
            select_categoria.innerHTML += `
            <option value="${item.valor}">${item.nombre}</option>
            `
        })

    }

    if(select_movimiento.value == 'gasto'){
        select_categoria.style.display = 'block'
        select_categoria.innerHTML = ''
        lista_categoria_gastos.forEach((item)=>{
            select_categoria.innerHTML += `
            <option value="${item.valor}">${item.nombre}</option>
            `
        })
    }

    if(select_movimiento.value == "vacio"){
        select_categoria.style.display = 'none'
    }
})

    //Función construir objeto categoria

    select_categoria.addEventListener('change', function(){

        switch (select_categoria.value) {
            case "dinero extra":
                cat = {
                    nombre: 'Dinero extra',
                    valor: select_categoria.value,
                    icono: 'savings'
                }
                
                break;

                case "salario":
                    cat = {
                        nombre: 'Salario',
                        valor: select_categoria.value,
                        icono: 'work'
                    }
                    
                    break;

                    case "otro":
                        cat = {
                            nombre: 'Otro',
                            valor: select_categoria.value,
                            icono: 'payments'
                        }
                        
                        break;
                    
                    case "personal":
                        cat = {
                            nombre: 'Personal',
                            valor: select_categoria.value,
                            icono: 'person'
                        }
                    
                    break;

                    case "educacion":
                        cat = {
                            nombre: 'Educacion',
                            valor: select_categoria.value,
                            icono: 'school'
                        }
                    
                    break;

                    case "salud":
                        cat = {
                            nombre: 'Salud',
                            valor: select_categoria.value,
                            icono: 'home_health'
                        }
                    
                    break;

                    case "hogar":
                        cat = {
                            nombre: 'Hogar',
                            valor: select_categoria.value,
                            icono: 'house'
                        }
                    
                    break;

                    
        
            default:
                break;
        }

        console.log(cat)

    })

    //Función capturar datos de formulario

function get_form(){
    let tipo = select_movimiento.value
    let categoria = cat
    let monto = parseInt(input_monto.value)
    let fecha = new Date()
    let fecha_completa = format_date(fecha)

    if(select_movimiento.value == "ingreso"){
        ingresos.push(new Movimiento(tipo, categoria, monto, fecha_completa))
        total_ingresos(ingresos)
    }
    if(select_movimiento.value == "gasto"){
        gastos.push(new Movimiento(tipo, categoria, monto, fecha_completa))
        total_gastos(gastos)
    }

    movimientos.push(new Movimiento(tipo, categoria, monto, fecha_completa))
    inyect_movimientos_card(movimientos)
    
    saldo = suma_ingresos - suma_gastos

    inyect_montos()
    

    console.log(movimientos)
    console.log(ingresos)
    console.log(gastos)
    console.log(saldo)
}

    //Evento formulario

 formulario.addEventListener('submit', function(e){
    e.preventDefault()
    get_form()
    formulario.reset()
    select_categoria.style.display = 'none'

})


    //Formateo de fecha a DD/MM/YYYY

function format_date(date){
    let dia = date.getDate()
    let mes = date.getMonth() + 1
    let ano = date.getFullYear()

    let fecha_formateada = ` ${dia}/${mes}/${ano} `

    return fecha_formateada
}

    //Función sumar montos

function total_ingresos(array){
    suma_ingresos = array.reduce((total,item)=>{
        return total + item.monto
    }, 0)

    console.log(suma_ingresos)
}

function total_gastos(array){
    suma_gastos = array.reduce((total,item)=>{
        return total + item.monto
    }, 0)

    console.log(suma_gastos)
}

    //funcion mostrar montos

function inyect_montos(){
    saldo_html.innerHTML = ` 
        <div class="saldo">$ ${Number(saldo).toLocaleString('es-cl')}</div>
    `

    gastos_html.innerHTML = `
        <div class="header__monto">$ ${Number(suma_gastos).toLocaleString('es-cl')}</div>
        <div>GASTOS</div>
    `

    ingresos_html.innerHTML = `
        <div class="header__monto">$ ${Number(suma_ingresos).toLocaleString('es-cl')}</div>
        <div>INGRESOS</div>
    `
}

    //Funcion insertar movimientos

function inyect_movimientos_card(element){
    movimientos_container.innerHTML = ''

    const reversed_movimientos = element.slice().reverse()

    reversed_movimientos.forEach((item,index)=>{
        console.log(index)
        movimientos_container.innerHTML += `
        <div class="card mx-auto mb-2 ${item.tipo === 'ingreso' ? 'ingreso' : 'gasto'}" id="my_card_${index}">
            <div class="movimientos__container card-body">
                <div class="movimientos__icono ${item.tipo === 'ingreso' ? 'icono_ingreso' : 'icono_gasto'} " >
                    <span class="material-symbols-outlined">
                        ${item.categoria.icono}
                    </span>
                    <p>${item.categoria.nombre}</p>
                </div>
                <div class="movimientos__info text-center">
                    <h6>$ ${Number(item.monto).toLocaleString('es-cl')}</h6>
                    <p>16/11/2023</p>
                </div>
                <div class="movimientos__actions">
                    <button type="button" class="btn my_btn">
                        <span class="material-symbols-outlined size-30 my_icon">
                            edit
                        </span>
                    </button>
                    
                    <button type="button" class="btn my_btn" onclick="eliminar_gasto(${index})">
                        <span class="material-symbols-outlined size-30 my_icon">
                            delete
                        </span>
                    </button>
                </div>
            </div>
        </div>
        `
        
    })
}