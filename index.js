
function startCart() {
    return (JSON.parse(localStorage.getItem("cart") ) ?? [])
}

class product {
    constructor(name,id,price,type,img){
        this.name = name
        this.id = id
        this.price = price
        this.type = type
        this.img = img
        this.amount=1
    }
}
const products =[
    new product("Jean Negro",1,6500,"Pantalones","https://elasdeljean.com/wp-content/uploads/2020/05/15883370602464ce466dd5f3dfc9b448444cc10ef3.png"),
    new product("Campera Parka",2,18000,"Camperas","https://http2.mlstatic.com/D_NQ_NP_837023-MLA69580204294_052023-O.webp"),
    new product("Chomba",3,3500,"Remeras","https://biffas.com.ar/wp-content/uploads/2021/09/chomba-lima-marino.jpg"),
    new product("Zapatillas",4,37999,"Calzado","https://www.grupooxicas.com/242-thickbox_default/zapatilla-calzado-de-seguridad-funcional-mujer-bali-numeros-del-34-al-42.jpg   "),
    new product("Camiseta de Fútbol",5,17599,"Remeras","https://www.thefutbolstore.com.ar/uploads/v2/product/hi/202006_700_A.jpg"),
    new product("Gorro de Lana",6,4299,"Accesorios","https://celadasa.vtexassets.com/arquivos/ids/216499-800-auto?v=637993807990500000&width=800&height=auto&aspect=true")
]
let productsCart = startCart()

function addProduct(id){
    id = parseInt(id)
    products.forEach(product => product.id===id && loadInCart({...product}))
}

function loadInCart(productSelected){
    let validation = false
    productsCart.forEach(product=>{
        if(product.id === productSelected.id){
            product.amount++
            localStoarageCartRefresh()
            validation=true
            // alert(`Has agregado ${productSelected.name} al carrito`)
            return
        }
    })
    if(validation===false){
        productsCart.push(productSelected)
        localStoarageCartRefresh()
        // alert(`Has agregado ${productSelected.name} al carrito`)
    }
}

function removeOfCart(idProduct){
    productsCart = productsCart.filter(product => product.id !== parseInt(idProduct))

    localStoarageCartRefresh()
}

function calTotal(){
    let cartPriceTotal = 0

    if(productsCart.length===0){
        alert(`El carrito está vacio. Agregale algún producto y luego calcula el valor total!`)
    }
    else{
        for(let i=0; i < productsCart.length; i++){
            console.log(`Producto: ${productsCart[i].name} // Valor: $${productsCart[i].price}`)
            cartPriceTotal+=productsCart[i].price
        }
        console.log(`Valor Total: $${cartPriceTotal} // Cantidad de productos: ${productsCart.length}`)
        alert(`Valor Total: $${cartPriceTotal} // Cantidad de productos: ${productsCart.length}`)
    }
}

function componentProduct(container,nameProduct,idProduct,priceProduct,img){
    console.log(container)
    const containerProducts= document.querySelector("."+container)
    containerProducts.innerHTML +=`<div class="product-card">
                                        <img class="product-img" src=${img} alt=${nameProduct}>
                                        <div class="product-info-container">
                                            <h2 class="product-name">${nameProduct}</h2>
                                            <p class="product-price product-info-item">$${priceProduct}</p>
                                            <button class="add-product-button operator-button" id-product="${idProduct}">Agregar</button>
                                        </div>
                                    </div>`
}

function componentProductCart(container,product){
    console.log(product)
    const containerProductsCart= document.querySelector("."+container) 
    containerProductsCart.innerHTML +=`<div class="product-card product-cart-card">
                                        <img class="product-img product-cart-img" src=${product.img} alt=${product.name}>
                                        <div class="product-info-container product-cart-info-container">
                                            <h2 class="product-name product-cart-name">${product.name}</h2>
                                            <p class="product-price product-cart-price product-info-item">$${product.price}</p>
                                            <p class="product-price product-cart-price-subtotal product-info-item">$${product.price*product.amount}</p>
                                            <input type="number"  min="1" class="product-cart-amount product-info-item" id-product=${product.id}" value="${parseInt(product.amount)}"></input>
                                            <button class="add-product-button add-product-cart-button operator-button" id-product="${product.id}" onclick="removeOfCart(${product.id})">Quitar</button>
                                        </div>
                                    </div>`
}

function renderProducts(filter){
    filter = filter?.toString()
    unrenderProducts()
    const container = "main-products-container"
    products.forEach(product => {
        if(product.type===filter||filter===undefined){
            componentProduct(container,product.name,product.id,product.price,product.img)
        }
    });
    eventListenerBottonAddProduct()
}

function renderCartAmountNavbar(){
    const cartNavbar = document.querySelector(".amount-cart-navbar")
    console.log(cartNavbar)
    cartNavbar.textContent = `${amountProductSelected()}`
}

function renderCart(productsCart){
    renderCartAmountNavbar()
    if(document.querySelector(".main-products-container-cart")){
        unrenderProducts()
        const container = "main-products-container-cart"
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
    }
}

function renderFilterTypeSelector(){
    const container = document.querySelector(".main-category-container")
    if(container){
        const typeAlreadyRender = []
    
        container.innerHTML += `<li onclick="renderProducts()" class="category-item">Todo</li>`
    
        products.forEach(product=>{
            if(!typeAlreadyRender.includes(product.type)){
                container.innerHTML += `<li category-filter="${product.type}" class="category-item">${product.type}</li>`
                typeAlreadyRender.push(product.type)
            }
        })
    
        const buttonFilter = document.querySelectorAll(".category-item")
    
        buttonFilter.forEach(button => {
            button.addEventListener("click",function(){
                renderProducts(button.getAttribute("category-filter"))
            }
        )
    })}
}

function unrenderProducts(){
    const container = (document.querySelector(".main-products-container") || document.querySelector(".main-products-container-cart"))
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
}
function eventListenerBottonAddProduct(){
    const buttons = document.querySelectorAll(".add-product-button")
    buttons.forEach(button =>{
        button.addEventListener("click", function (){
            addProduct(button.getAttribute("id-product"))
        })
    })
}

function eventListenerInputAmount(){
    const inputAmount = document.querySelectorAll(".product-cart-amount")
    console.log(inputAmount)
    inputAmount.forEach(input =>{
        input.addEventListener("change", function (){
            const amount = parseInt(input.value)
            const id = parseInt(input.getAttribute("id-product"))
            console.log(id)   
            productsCart.forEach(product =>{
                if(product.id === id){
                    product.amount=amount
                    localStoarageCartRefresh()
                    console.log("Hola")
                }
            })
        })
    })
}

function localStoarageCartRefresh(){
    localStorage.setItem("cart",JSON.stringify(productsCart))
    renderCart(productsCart)
}

function startRender(){
    renderCartAmountNavbar()
    if(document.querySelector(".main-products-container")){
        renderProducts(undefined,"main-products-container")
    }
    else if(document.querySelector(".main-products-container-cart")){
        renderCart(productsCart)
    }
}

function amountProductSelected(){
    return productsCart.reduce((accumulator, product) => accumulator + product.amount,
    0)
}

function renderCartTotal(){
    const amount = amountProductSelected()
    const total = productsCart.reduce((accumulator,product)=>accumulator+product.price*product.amount,0)
    
    const containerProductsCart = document.querySelector(".main-products-container-cart")

    containerProductsCart.innerHTML +=`<div class="container-total-cart">
                                        <div class="product-info-container product-cart-info-container total-cart-container">
                                            <p class="product-cart-price-subtotal total-info-item">Total: $${total}</p>
                                            <p class="product-cart-price total-info-item">Cantidad de productos: ${amount}</p>
                                        </div>
                                    </div>`
}

renderFilterTypeSelector()
startRender()




