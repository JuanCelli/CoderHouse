let productsCart = []

function productSwitch(id){
    let productPrice
    let productName
    let dataProduct
    switch (id) {
        case 1:
            productName = "Jean Negro"
            productPrice = 6500
            break;
        case 2:
            productName = "Campera Parka"
            productPrice = 18000            
            break;
        case 3:
            productName = "Chomba"
            productPrice = 3500                        
            break;
        case 4:
            productName = "Zapatillas"
            productPrice = 37999                        
            break;
        case 5:
            productName = "Camiseta de Fútbol"
            productPrice = 17599                        
            break;
        case 6:
            productName = "Gorro de Lana"
            productPrice = 4299                        
            break;
            
        default:
            dataProduct = false
            break;
    }
        
    if(dataProduct!==false){
        dataProduct = [productName,productPrice]
    }
    return dataProduct
}


function addProduct(){
    let productId = parseInt(prompt("Ingrese el ID del producto que desea agregar."))
    let dataProduct = productSwitch(productId)
    
    if(dataProduct!==false){
        alert(`Has seleccionado ${dataProduct[0]} que tiene valor de $${dataProduct[1]}`)
        loadInCart(dataProduct)
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
        alert(`Has quitado ${productRemoved[0]} del carrito correctamente.`)
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
            console.log(`Producto: ${productsCart[i][0]} // Valor: $${productsCart[i][1]}`)
            cartPriceTotal+=productsCart[i][1]
        }
        console.log(`Valor Total: $${cartPriceTotal} // Cantidad de productos: ${productsCart.length}`)
        alert(`Valor Total: $${cartPriceTotal} // Cantidad de productos: ${productsCart.length}`)
    }
}

