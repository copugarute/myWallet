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

let ingresos = [];

let gastos = [];


let suma_ingresos = 0;

let suma_gastos = 0;

let saldo = suma_ingresos;

//*Get elements HTML*********************************************************

    //Formulaio
let formulario = document.getElementById('my_form');
    //Select tipo movimiento
let select_movimiento = document.getElementById('tipo_movimiento');
    //Select tipo categoria
let select_categoria = document.getElementById('categoria');
    //Input monto
let input_monto = document.getElementById('monto');
    //Saldo div
let saldo_html = document.getElementById('saldo');
    //gastos div
let gastos_html = document.getElementById('gastos');
    //ingresos div
let ingresos_html = document.getElementById('ingresos');

//*Funciones****************************************************************

    //Funcion para definir categoría según el tipo de movimiento

select_movimiento.addEventListener('change', function(){

    if(select_movimiento.value == "ingreso"){
        select_categoria.innerHTML = `
        <option value="dinero extra">Dinero Extra</option>
        <option value="salario">Salario</option>
        <option value="Otro">Otro</option>
        `
    }

    if(select_movimiento.value == "gasto"){
        select_categoria.innerHTML = `
        <option value="personal">Personal</option>
        <option value="educacion">Educacion</option>
        <option value="salud">Salud</option>
        <option value="hogar">Hogar</option>
        `
    }
})

    //Función capturar datos de formulario

function get_form(){
    console.log(saldo)
    let tipo = select_movimiento.value
    let categoria = select_categoria.value
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

    saldo = suma_ingresos - suma_gastos

    inyect_montos()

    console.log(ingresos)
    console.log(gastos)
    console.log(saldo)
}

    //Evento formulario

 formulario.addEventListener('submit', function(e){
    e.preventDefault()
    get_form()
    formulario.reset()
    select_categoria.innerHTML = `
            <option value=""> - </option>
        `

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

//funcion validar si hay dinero antes de ingresar un gasto

//funcion insertar movimientos


// function total_movimiento(array){
//    if(array == ingresos){
//     suma_ingresos = ingresos.reduce((total,item)=>{
//         return total + item.monto
//     }, 0)

//     if(array == gastos){
//         suma_gastos = gastos.reduce((total,item)=>{
//             return total + item.monto
//         }, 0)
//     }
//    }
   
//     console.log(suma_ingresos)
//     console.log(suma_gastos)

// }


// function get_form(){
//     let tipo = select_movimiento.value
//     let categoria = select_categoria.value
//     let monto = input_monto.value
//     let fecha = new Date()
//     let fecha_completa = format_date(fecha)

//     //Aquí hacer una condicinal para ver si es gasto o ingreso

//     movimientos.push(new Movimiento(tipo, categoria, monto, fecha_completa))

//     total_movimiento(movimientos)

//     console.log(movimientos)
//     console.log(suma_gastos)
//     console.log(suma_ingresos)
// }

//let opciones_categoria_ingsore = ["Dinero extra", "Salario", "Otro"]

//let opciones_categoria_gasto = ["Personal", "Education", "Salud", "Hogar"]