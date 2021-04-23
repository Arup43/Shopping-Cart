let productList = document.querySelector('#product-list')
let cart = document.querySelector('#cart')

class Storage{
    static getList(){
        let products
        if(localStorage.getItem('products') === null){
            products = []
        } else {
            products = JSON.parse(localStorage.getItem('products'))
        }
        return products
    }
    static getProducts(){
        let products = Storage.getList()
        products.forEach(item => {
            let product = document.createElement('tr')
            product.className = 'p'
            product.innerHTML = `<td>${item.productName}</td><td>${item.price}</td><td><button>Remove</button></td>`
            let cartList = document.querySelector('#cart')
            cartList.appendChild(product)
        })
    }

    static addToLS(productName, price){
        let products = Storage.getList()
        let newProduct = {
            productName: productName,
            price: price
        }
        products.push(newProduct)
        localStorage.setItem('products', JSON.stringify(products))
    }

    static deleteFromLS(productName){
        let products = Storage.getList()
        products.forEach((item, index) => {
            if(item.productName === productName){
                products.splice(index, 1)
            }
        })
        localStorage.setItem('products', JSON.stringify(products))
    }
}

productList.addEventListener('click', addToCart)
cart.addEventListener('click', removeProduct)
document.addEventListener('DOMContentLoaded', Storage.getProducts)

function addToCart(e){
    if(e.target.tagName.toLowerCase() === 'button'){
        let flag = 0
        let products = document.querySelectorAll('.p')
        products.forEach(item => {
            if(item.firstChild.textContent === e.target.parentElement.previousSibling.previousSibling.textContent){
                alert('Already Added!')
                flag = 1
            }
        })
        if(flag !== 1) {
            let product = document.createElement('tr')
            product.className = 'p'
            product.innerHTML = `<td>${e.target.parentElement.previousSibling.previousSibling.textContent}</td><td>${e.target.parentElement.previousSibling.textContent}</td><td><button>Remove</button></td>`
            let cartList = document.querySelector('#cart')
            cartList.appendChild(product)
            Storage.addToLS(e.target.parentElement.previousSibling.previousSibling.textContent.trim(), e.target.parentElement.previousSibling.textContent.trim())

            let div = document.createElement('div')
            div.appendChild(document.createTextNode('Product Added to cart successfully!'))
            div.style.background = 'green'
            div.style.color = 'white'
            div.style.padding = '5px'
            let container = document.querySelector('.container')
            let productTable = document.querySelector('#product-table')
            container.insertBefore(div, productTable)
            setTimeout(() => {
                div.remove()
            }, 2000)
        }
    }
    e.preventDefault()
}

function removeProduct(e){
    if(e.target.tagName.toLowerCase() === 'button'){
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            Storage.deleteFromLS(e.target.parentElement.previousSibling.previousSibling.textContent.trim())

            let div = document.createElement('div')
            div.appendChild(document.createTextNode('Product Removed from the cart successfully!'))
            div.style.background = 'red'
            div.style.color = 'white'
            div.style.padding = '5px'
            let container = document.querySelector('.container')
            let cartTable = document.querySelector('#cart-table')
            container.insertBefore(div, cartTable)
            setTimeout(() => {
                div.remove()
            }, 2000)
        }
    }
    e.preventDefault()
}

