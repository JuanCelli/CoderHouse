import {amountProductSelected,calTotalCart,removeOfCart,localStoarageCartRefresh,unrenderProducts} from "./utils.mjs"
import {productsCart} from "../../index.js"


function componentProductCart(container,product){
    const containerProductsCart= document.querySelector("."+container) 
    containerProductsCart.innerHTML +=`<div class="product-card product-cart-card">
                                        <img class="product-img product-cart-img" src=${product.img} alt=${product.name}>
                                        <div class="product-info-container product-cart-info-container">
                                            <h2 class="product-name product-cart-name">${product.name}</h2>
                                            <p class="product-price product-cart-price product-info-item">$${product.price}</p>
                                            <p class="product-price product-cart-price-subtotal product-info-item">$${product.price*product.amount}</p>
                                            <input type="number"  min="1" class="product-cart-amount product-info-item" id-product=${product.id}" value="${parseInt(product.amount)}"></input>
                                            <button class="remove-product-cart-button operator-button" id-product="${product.id}">Quitar</button>
                                        </div>
                                    </div>`
}

function eventListenerInputAmount(){
    const inputAmount = document.querySelectorAll(".product-cart-amount")
    inputAmount.forEach(input =>{
        input.addEventListener("change", function (){
            const amount = parseInt(input.value)
            const id = parseInt(input.getAttribute("id-product"))
            productsCart.forEach(product =>{
                if(product.id === id){
                    if(product.amount<amount){
                        Toastify({
                            text: `Agregaste una unidad más de ${product.name}`,
                            duration: 1500,
                            gravity: "bottom",
                            style: {
                                background: "linear-gradient(to right, #74007c, #b35cb9)",
                              },
    
                            }).showToast(); 
                    }
                    else{
                        Toastify({
                            text: `Quitaste una unidad de ${product.name}`,
                            duration: 2000,
                            gravity: "bottom",
                            style: {
                                background: "linear-gradient(to right, #ff8a8a, #ff4c4c)",
                              },
    
                            }).showToast();
                    }

                    product.amount=amount

                    localStoarageCartRefresh()
                }
            })
        })
    })
}

function eventListenerButtonRemove(){
    const buttonRemove = document.querySelectorAll(".remove-product-cart-button")
    buttonRemove.forEach(button =>{
        const id = parseInt(button.getAttribute("id-product"))
        button.addEventListener("click", ()=>{
            removeOfCart(id)  
        })
    })
}

function renderCartTotal(){
    const amount = amountProductSelected()
    const total = calTotalCart()
    
    const containerProductsCart = document.querySelector(".main-products-container-cart")

    containerProductsCart.innerHTML +=`<div class="container-total-cart">
                                        <div class="product-info-container product-cart-info-container total-cart-container">
                                            <p class="product-cart-price-subtotal total-info-item">Total: $${total}</p>
                                            <p class="product-cart-price total-info-item">Cantidad de productos: ${amount}</p>
                                        </div>
                                    </div>
                                    <div class="total-info-item">
                                        <a href="./dataForm.html">
                                            <button class="operator-button-form">Comprar</button>
                                        </a>
                                    </div>`
}

export function renderCart(){
    const container = "main-products-container-cart"
    if(document.querySelector(`.${container}`)){
        unrenderProducts()
        const containerCart = document.querySelector(`.${container}`)
        productsCart.forEach(product => {
            componentProductCart(container,product)
        })
        if(containerCart.childNodes.length==0){
            containerCart.innerHTML = "<h2>El carrito está vacio</h2>"
            return
        }
        renderCartTotal()
        eventListenerInputAmount()
        eventListenerButtonRemove()
    }
}

renderCart()

