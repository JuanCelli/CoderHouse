import {getProducts} from "/src/components/fetchProcuts.mjs"
import {renderProducts,renderFilterTypeSelector} from './src/components/main.mjs';
import {renderCartAmountNavbar} from "./src/components/utils.mjs"


function startCart(nameItem) {
    return (JSON.parse(localStorage.getItem(nameItem)) ?? [])
}

function startRender(products){
    renderCartAmountNavbar()
    if(document.querySelector(".main-products-container")){
        renderFilterTypeSelector(products)
        renderProducts(products,undefined)
    }
}

export function filterProductFromCart (idProduct){
    productsCart = productsCart.filter(product => product.id !== parseInt(idProduct))
}

const products = await getProducts()

export let productsCart = startCart("cart")
    
export let productsVisited = startCart("productsVisited")

startRender(products)




