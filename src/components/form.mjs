import {productsCart} from "../../index.js"
import {amountProductSelected,calTotalCart} from "./utils.mjs"

function startForm(nameItem) {
    return (JSON.parse(localStorage.getItem(nameItem)) ?? {})
}

export function renderFormStep1(){
    if(infoPurchase.delivery){
        document.querySelector(`#${infoPurchase.delivery}`).checked = true
    }
    const button = document.querySelector(".button-form")
    if(button){
        button.addEventListener("click", function(){
            const radios = (document.getElementsByName("entrega"))
            let radioSelected
            radios.forEach(radio=>{
                if(radio.checked){
                    radioSelected=radio.value
                }
            })
            infoPurchase.delivery = radioSelected
            localStoarageInfoPurchase()
            spinerLoad(".main-form-container")
            setTimeout(() => {
                renderFormStep2()
            }, 2000);
            
        })
    }
}
export function renderFormStep2(){
    unrenderForm()
    let container = document.querySelector(".main-form-container")

    container.innerHTML += `<div class="form-container">
                                <h3>Paso 2 - Datos</h3>
                                <form id="form-data" action="">
                                    <label for="name">Nombre</label>
                                    <input type="text" id="name" name="data" placeholder="Nombre" required/>
                                    <label for="last-name">Apellido</label>
                                    <input type="text" id="last-name" name="data" placeholder="Apellido" required/>
                                    <label for="dni">DNI</label>
                                    <input type="text" inputmode="numeric" id="dni" name="data" placeholder="Ej: 41184571" pattern="[0-9]{8}" required/>
                                    <label for="mail">Mail</label>
                                    <input type="mail" id="mail" name="data" placeholder="Ej: mail@gmail.com" required/>
                                    <label for="phone">Teléfono</label>
                                    <input type="tel" id="phone" name="data" placeholder="Ej: 1154265378" required/>
                                </form>
                            </div>`
    let form = document.querySelector("#form-data")

    if(infoPurchase.delivery==="domicilio"){
        form.innerHTML += `<label for="calle">Provincia</label>
                                    <select id="provincia" name="data" required>
                                        <option value="" selected disabled >Seleccione provincia</option>
                                        <option value="Ciudad de Buenos Aires">Ciudad de Buenos Aires</option>
                                        <option value="Buenos Aires">Buenos Aires</option>
                                        <option value="Santa Fe">Santa Fe</option>
                                    </select>
                                    <label for="calle">Calle</label>
                                    <input type="text" id="calle" name="data" placeholder="Ej: Rivadavia" required/>
                                    <label for="altura">Altura</label>
                                    <input type="text" id="altura" name="data" placeholder="Ej: 2584" required/>
                                    <label for="observacion">Observación</label>
                                    <input type="text" id="observacion" name="data" placeholder="Ej: Piso/Casa/Departamento (Opcional)"/>
                            `
    }

    if(infoPurchase.data){
        const inputs = (document.getElementsByName("data"))
        inputs.forEach(input=>{
            const id = input.getAttribute("id")
            if(infoPurchase.data[id]){
                input.setAttribute("value",infoPurchase.data[id])
            }
        })

    }


    
    form.innerHTML +=`<button class="operator-button-form" type="submit">Continuar</button>`

    document.getElementById('form-data').addEventListener('submit', (event) => {
        event.preventDefault();
        infoPurchase.data = {}
        let dataForm = document.getElementsByName("data")
        dataForm.forEach(element=>{
            infoPurchase.data[element.getAttribute("id")]=(document.getElementById(element.getAttribute("id")))?.value
        })
        localStoarageInfoPurchase()
        spinerLoad(".main-form-container")
        setTimeout(() => {
            renderFormStep3()

        }, 2000);
    })
}
export function renderFormStep3(){
    unrenderForm()
    let container = document.querySelector(".main-form-container")

    container.innerHTML += `<div>
                                <h3>Paso 3 - Medio de pago</h3>
                                <form id="form-data" action="">
                                    <div class="div-radio">
                                        <input type="radio" id="efectivo" name="pago" value="efectivo" checked/>
                                        <label for="efectivo">Efectivo</label>
                                    </div>
                                    <div class="div-radio">
                                        <input type="radio" id="debito" name="pago" value="debito"/>
                                        <label for="debito">Tarjeta de Débito</label>
                                    </div>
                                    <div class="div-radio">
                                        <input type="radio" id="credito" name="pago" value="credito"/>
                                        <label for="credito">Tarjeta de Crédito</label>
                                    </div>
                                    <button class="operator-button-form">Continuar</button>
                                </form>
                            </div>`

    const button = document.querySelector(".button-form")

    if(infoPurchase.pay?.method){
        document.querySelector(`#${infoPurchase.pay.method}`).checked = true
    }

    document.getElementById('form-data').addEventListener('submit', (event) => {
        event.preventDefault();
        const radios = (document.getElementsByName("pago"))
        let radioSelected
        radios.forEach(radio=>{
            if(radio.checked){
                radioSelected=radio.value
            }
        })
        if(!infoPurchase.pay){
            infoPurchase.pay={}
        }
        infoPurchase.pay.method = radioSelected
        localStoarageInfoPurchase()
        if(infoPurchase.pay.method==="debito"||infoPurchase.pay.method==="credito"){
            
            spinerLoad(".main-form-container")
            setTimeout(() => {
                renderFormStep4()
            }, 1000);
        }
        else{
            spinerLoad(".main-form-container")
            setTimeout(() => {
                renderFormStep5()
    
            },4000);
            
            
        }
    })
}
export function renderFormStep4(){
    unrenderForm()
    let container = document.querySelector(".main-form-container")

    container.innerHTML += `<div>
                                <h3>Paso 4 - Datos de la Tarjeta</h3>
                                <form id="form-data" action="">
                                    <label for="number-card">Numero de tarjeta</label>
                                    <input type="text" id="number-card" name="data" placeholder="Ej: 4344-5555-5523-4562" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}" required/>
                                    <label for="name-card">Nombre y apellido</label>
                                    <input type="text" id="name-card" name="data" placeholder="Tal cual figura en tarjeta" required/>
                                    <label for="dni">DNI</label>
                                    <input type="text" inputmode="numeric" id="dni" name="data" placeholder="Ej: 41184571" pattern="[0-9]{8}" required/>
                                    <label for="code-card">Código de seguridad</label>
                                    <input type="text" id="code-card" name="data" placeholder="Ej: 648" pattern="[0-9]{3}" required/>
                                </form>
                            </div>`

    let form = document.querySelector("#form-data")

    if(infoPurchase.pay.method==="credito"){
        form.innerHTML += `<label for="fees">Cuotas</label>
                            <select id="fees" name="data" required>
                                <option value="" selected disabled >Seleccione cantidad de cuotas</option>
                                <option value=1>1 cuota</option>
                                <option value=3>3 cuotas</option>
                                <option value=6>6 cuotas</option>
                            </select>`
    }
    else{
        delete infoPurchase.pay?.fees
        localStoarageInfoPurchase()
    }
    form.innerHTML +=`<button class="operator-button-form" type="submit">Continuar</button>`


    document.getElementById('form-data').addEventListener('submit', (event) => {
        event.preventDefault();
        if(infoPurchase.pay?.method==="credito"){
            const fees = document.querySelector("#fees")
            infoPurchase.pay.fees = parseInt(fees.value)
        }
        localStoarageInfoPurchase()
        spinerLoad(".main-form-container")
        setTimeout(() => {
            renderFormStep5()

        },4000);
    })


}
export function renderFormStep5(){
    unrenderForm()
    let container = document.querySelector(".main-form-container")

    container.innerHTML += `<div class="step5-container-form">
                                <h3>Resumen de compra - Finalizar compra</h3>
                                <div id="form-data">
                                    <p class="item-info-purchase">Total: $${calTotalCart()}</p>
                                    <p class="item-info-purchase">Cantidad de productos: ${amountProductSelected()}</p>
                                    <p class="item-info-purchase">Metodo de entrega: ${(infoPurchase.delivery).toUpperCase()}</p>
                                    <p class="item-info-purchase">Medio de pago: ${(infoPurchase.pay.method).toUpperCase()}</p>
                                </div>
                            </div>`
    let form = document.querySelector("#form-data")
    if(infoPurchase.pay.method==="credito"){
        if(form){
            let valueFees = parseInt(calTotalCart()/infoPurchase.pay.fees)
            form.innerHTML += `<p class="item-info-purchase">Cantindad de cuotas: ${infoPurchase.pay.fees} ($${valueFees} c/u)</p>`
        }

    }
    form.innerHTML +=`<button class="button-form operator-button-form">Confirmar Compra</button>`

    const button = document.querySelector(".button-form")
    if(button){
        button.addEventListener("click", function(){
            Swal.fire({
                title: 'Confirmación',
                text: `Presionando Comprar confirmas la compra de los productos cargados dentro de carrito`,
                icon: 'warning',
                allowEscapeKey:true,
                showConfirmButton:true,
                confirmButtonText: 'Comprar',
                // confirmButtonColor: '#d33636',
                showCancelButton:true,
                denyButtonText:'Cancelar',
                denyButtonColor:'#e8e8e8'
              })
              .then((res)=>{
                if(res.isConfirmed){
                    spinerLoad(".main-form-container")
                    setTimeout(() => {
                        unrenderForm()
                        Swal.fire({
                            title: 'Compra realizado con éxito!',
                            text: `Tu compra se registró con éxito, te enviaremos un mail a ${infoPurchase.data.mail} con todo el detalle. Muchas gracias!`,
                            icon: 'success',
                            allowEscapeKey:true,
                            showConfirmButton:true,
                            confirmButtonText: 'OK',
                          })
                          .then(()=>{
                                localStorage.setItem("purchaseMade",JSON.stringify({products:productsCart, infoPurchase: infoPurchase}))
                                localStorage.removeItem("cart")
                                window.location.href = "../../index.html"
                          })
                    }, 4000);
                }
              })
        })
    }
}
export function unrenderForm(){
    const container = (document.querySelector(".main-form-container"))
    if(container){
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }
    }

}
export function localStoarageInfoPurchase(){
    localStorage.setItem("infoPurchase",JSON.stringify(infoPurchase))
}

let infoPurchase = startForm("infoPurchase")

renderFormStep1()

function spinerLoad(container){
    unrenderForm()
    let containerForm = document.querySelector(container)
    containerForm.innerHTML += `<div id="loading-spinner" class="spinner"></div>`
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "block";
}


