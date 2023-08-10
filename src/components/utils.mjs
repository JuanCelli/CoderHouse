import {getProducts} from "/src/components/fetchProcuts.mjs"
import {productsCart,filterProductFromCart} from "../../index.js"
import {renderCart} from "../components/cart.mjs"

const products = await getProducts()


export function amountProductSelected(){
        return productsCart.reduce((accumulator, product) => accumulator + product.amount,
        0)
}

export function calTotalCart(){
    return productsCart.reduce((accumulator,product)=>accumulator+product.price*product.amount,0)
}

export function eventListenerBottonAddProduct(){
    const buttons = document.querySelectorAll(".add-product-button")
    buttons.forEach(button =>{
        button.addEventListener("click", function (){
            addProduct(button.getAttribute("id-product"))
        })
    })
}

export function loadInCart(productSelected){
    let validation = false

    productsCart.forEach(product=>{
        if(product.id === productSelected.id){
            product.amount++
            localStoarageCartRefresh()
            validation=true
            return
        }
    })
    if(validation===false){
        productsCart.push(productSelected)
        localStoarageCartRefresh()
    }
    Swal.fire({
        title: 'Agregado a carrito',
        text: `Has agregado ${productSelected.name} al carrito`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
}
export function addProduct(id){
    id = parseInt(id)
    products.forEach(product => product.id===id && loadInCart({...product}))
}
export function removeOfCart(idProduct){
    let pruductRemoved = productsCart.find(product => product.id === parseInt(idProduct))

    Swal.fire({
        title: 'Eliminar',
        text: `Esta acción eliminará el producto ${pruductRemoved.name} del carrito. Deseas continuar?`,
        icon: 'warning',
        allowEscapeKey:true,
        showConfirmButton:true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#d33636',
        showCancelButton:true,
        denyButtonText:'Cancelar',
        denyButtonColor:'#e8e8e8'
      })
      .then((res)=>{
        if(res.isConfirmed){
            filterProductFromCart(idProduct)
            localStoarageCartRefresh()
            Swal.fire({
                title: 'Eliminado!',
                text: `Has elimnado ${pruductRemoved.name} del carrito`,
                icon: 'success',
                allowEscapeKey:true,
                showConfirmButton:true,
                confirmButtonText: 'OK',
              })
        }
      })

}

export function renderCartAmountNavbar(){
    const cartNavbar = document.querySelector(".amount-cart-navbar")
    cartNavbar.textContent = `${amountProductSelected()}`
}

export function localStoarageCartRefresh(){
    localStorage.setItem("cart",JSON.stringify(productsCart))
    renderCartAmountNavbar()
    renderCart(productsCart)
}

export function unrenderProducts(){
    const container = (document.querySelector(".main-products-container") || document.querySelector(".main-products-container-cart"))
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
}



