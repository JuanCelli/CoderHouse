// import {productsCart,productsVisited} from "../../index.js"
import {eventListenerBottonAddProduct,unrenderProducts} from "./utils.mjs"



export function renderProducts(products,filter){
    filter = filter?.toString()
    unrenderProducts()
    const container = "main-products-container"
        const filters = document.querySelectorAll(".category-item")
        console.log(filters)
        filters.forEach(currentFilter=>{
            console.log(currentFilter.getAttribute("category-filter"))
            console.log(filter)
            if(currentFilter.getAttribute("category-filter")===filter){
                currentFilter.style.color = "#A500B0"
            }
            else{
                currentFilter.style.color = "black"
            }
        })

    products.forEach(product => {
        if(product.type===filter||filter===undefined){
            componentProduct(container,product.name,product.id,product.price,product.img)
        }
    });
    eventListenerBottonAddProduct()
}

function componentProduct(container,nameProduct,idProduct,priceProduct,img){
    const containerProducts= document.querySelector("."+container)
    containerProducts.innerHTML +=`<div  class="product-card">
                                        <a href="./src/pages/product.html#product/${idProduct}" class="product-img-container">
                                            <img href="#/product/${idProduct}" class="product-img" src=${img} alt=${nameProduct}>
                                        </a>
                                        
                                        <div class="product-info-container">
                                            <a href="#/product/${idProduct}" class="product-name">${nameProduct}</a>
                                            <p class="product-price product-info-item">$${priceProduct}</p>
                                            <button class="add-product-button operator-button" id-product="${idProduct}">Agregar</button>
                                        </div>
                                    </div>`
}

export function renderFilterTypeSelector(products){
    const container = document.querySelector(".main-category-container")
    if(container){
        const typeAlreadyRender = []
    
        container.innerHTML += `<li class="category-item">Todo</li>`
    
        products.forEach(product=>{
            if(!typeAlreadyRender.includes(product.type)){
                container.innerHTML += `<li category-filter="${product.type}" class="category-item">${product.type}</li>`
                typeAlreadyRender.push(product.type)
            }
        })
    
        const buttonFilter = document.querySelectorAll(".category-item")
    
        buttonFilter.forEach(button => {
            button.addEventListener("click",function(){
                renderProducts(products,button.getAttribute("category-filter"))
            }
        )
    })}
}