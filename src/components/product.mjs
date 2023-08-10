// import {products} from "../data/productsDB.mjs"

import {getProducts} from "/src/components/fetchProcuts.mjs"
import {productsVisited} from "../../index.js"
import {eventListenerBottonAddProduct} from "./utils.mjs"

const products =await getProducts()

export function componentProductDetail(product){
    let container = document.querySelector("#main-container-product-detail")
    container.innerHTML += `<div class"product-detail-container">
                                <div class="product-detail-container-img">
                                    <img class="product-detail-img" src=${product.img}></img>
                                </div>
                                <div class="product-detail-container-info">
                                    <h3 class="product-detail-title">${product.name}</h3>
                                    <p>$${product.price}</p>
                                    <button class="add-product-button operator-button" id-product="${product.id}">Agregar</button>
                                </div>
                            </div>`
}

export function renderProductDetail(products){
    routie('product/:id', function (id){
        let title = document.querySelector(".title")
        const product = products.find(product=>product.id === parseInt(id))
        !productsVisited.find(product=>product.id=== parseInt(id)) && productsVisited.push(product)
        localStoarageProductVisited()
        componentProductDetail(product)
        eventListenerBottonAddProduct()
        title.textContent = product.name
    })
}

export function localStoarageProductVisited(){
    localStorage.setItem("productsVisited",JSON.stringify(productsVisited))
}

renderProductDetail(products)

