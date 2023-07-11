let productsCart = []

class product {
    constructor(name,id,price,type,img){
        this.name = name
        this.id = id
        this.price = price
        this.type = type
        this.img = img
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

function productSwitch(id){
    const dataProduct={
        status: false,
        name: undefined,
        price: undefined
    }


    products.forEach(product => {
        if(product.id===id){
            dataProduct.status=true
            dataProduct.name = product.name
            dataProduct.price = product.price
            return dataProduct
        }
    })
    
    return dataProduct;
}

function addProduct(){
    let productId = parseInt(prompt("Ingrese el ID del producto que desea agregar."))
    let productSelected = productSwitch(productId)
    console.log(productSelected)
    
    if(productSelected.status!==false){
        alert(`Has seleccionado ${productSelected.name} que tiene valor de $${productSelected.price}`)
        loadInCart(productSelected)
    }
    else{
        alert(`No has ingresado un ID valido, vuelve a intentarlo.`)
    }
}

function loadInCart(dataProduct){
    for (let i = 0; i <= productsCart.length; i++) {
        if(productsCart[i]===undefined){
            productsCart[i]=dataProduct
            break
        }
    }
}

function removeOfCart(){
    let productRemoved = productsCart.pop()

    if(productRemoved!==undefined){
        alert(`Has quitado ${productRemoved.name} del carrito correctamente.`)
    }
    else{
        alert(`El carrito está vacio.`)
    }


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
    const containerProducts= document.querySelector("."+container) 
    containerProducts.innerHTML =   containerProducts.innerHTML+
                                    `<div class="product-card">
                                        <img class="product-img" src=${img} alt=${nameProduct}>
                                        <div class="product-info-container">
                                            <h2 class="product-name">${nameProduct}</h2>
                                            <p class="product-id product-info-item">ID: ${idProduct}</p>
                                            <p class="product-price product-info-item">Valor: $${priceProduct}</p>
                                        </div>
                                    </div>`
}

function renderProducts(filter){
    if(filter!==undefined){
        filter = filter.toString()
    }
    unrenderProducts()
    const container = "main-products-container"
    products.forEach(product => {
        if(product.type===filter||filter===undefined){
            componentProduct(container,product.name,product.id,product.price,product.img)
        }
    });
}

function renderFilterTypeSelector(){
    const container = document.querySelector(".main-category-container")
    const typeAlreadyRender = []

    container.innerHTML += `<li onclick="renderProducts()" class="category-item">Todo</li>`

    products.forEach(product=>{
        if(!typeAlreadyRender.includes(product.type)){
            container.innerHTML += `<li onclick="renderProducts('${product.type}')" class="category-item">${product.type}</li>`
            typeAlreadyRender.push(product.type)
        }
    })
}

function unrenderProducts(){
    const container = document.querySelector(".main-products-container")
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
}

renderFilterTypeSelector()
renderProducts()

