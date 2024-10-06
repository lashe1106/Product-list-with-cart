let totalValue = 0;
let totalPrice = 0;
const totalCount = document.querySelector('#total-count');
totalCount.textContent = totalValue;

const cartContent = document.querySelector('.cart-content');
let cart = {};

const cartDetails = document.querySelector('.cart');
const cartRemoveAll = document.querySelector('.cart-image img');
const addToBtn = document.querySelectorAll('.product');

//code using for each to apply to each product in cart
addToBtn.forEach((product) => {
    const hiddenBtn = product.querySelector('#hidden-btn');
    const mainBtn = product.querySelector('#main-btn');
    const addToImage = product.querySelector('.products-box img');
    const subToNum = product.querySelector('#decrease');
    const addToNum = product.querySelector('#increase');
    const numBtn = product.querySelector('#value');
    const productNames = product.querySelector('#name').textContent;
    const productPrices = product.querySelector('#price').textContent;

    let counterValue = 1;
    numBtn.textContent = counterValue;

    let productPrice = parseFloat(productPrices).toFixed(2);
    
    
    mainBtn.addEventListener('click', function () {
        hiddenBtn.style.display = 'flex'
        addToImage.style.border = '2px solid hsl(14, 86%, 42%)'
        cartContent.style.marginTop = '15px';
        cartRemoveAll.src = './assets/images/delete-2-svgrepo-com (2).png'

        if (!cartDetails.style.height) {
            cartDetails.style.height = '400px';
        } else {
            let cartHeight = parseInt(cartDetails.style.height);
            cartDetails.style.height = (cartHeight + 72) + 'px';
        };

        if (!cart[productNames]) {
            cart[productNames] = { name: productNames, quantity: counterValue, price: productPrice, hiddenBtn, addToImage};

            counterValue = 1;
            numBtn.textContent = counterValue;
    
            totalValue += counterValue
            totalCount.textContent = totalValue;

            cart[productNames].quantity = counterValue;
        } else {
            cart[productNames].quantity += counterValue;
        };
        
        cartUpdate()
        return;
    });

    subToNum.addEventListener('click', function () {
        if (counterValue > 1) {
            counterValue--;
            numBtn.textContent = counterValue;
            totalValue--;
            totalCount.textContent = totalValue
        };

        if (cart[productNames] && cart[productNames].quantity > 1) {
            cart[productNames].quantity = counterValue
        };

        cartUpdate()
        return;
    });

    addToNum.addEventListener('click', function () {
        counterValue++;
        numBtn.textContent = counterValue;
        totalValue++;
        totalCount.textContent = totalValue

        if (cart[productNames]) {
            cart[productNames].quantity = counterValue
        };

        cartUpdate()
        return;
    });

});

//function to remove a product from cart onclick
function cartRemove(i) {
    if (cart[i]) {
        const cartQuantity = cart[i].quantity;

        totalValue = totalValue - cartQuantity;
        totalCount.textContent = totalValue;

        cart[i].hiddenBtn.style.display = 'none';
        cart[i].addToImage.style.border = 'none';

        let cartHeight = parseInt(cartDetails.style.height);
        cartDetails.style.height = (cartHeight - 72) + 'px';
        

        delete cart[i];
        cartUpdate()
        
        return;
    };
};

//function to remove all products fom cart onclick
cartRemoveAll.addEventListener('click', () => {
    addToBtn.forEach((product) => {
        const hiddenBtn = product.querySelector('#hidden-btn');
        const addToImage = product.querySelector('.products-box img');
        const numBtn = product.querySelector('#value');

        counterValue = 1;
        numBtn.textContent = counterValue;

        hiddenBtn.style.display = 'none';
        addToImage.style.border = 'none';
    });

    for (let i in cart) {
        if (cart[i]) {
            delete cart[i];
        };
    };

    totalValue = 0;
    totalCount.textContent = totalValue;

    cartUpdate()
});

//function to update cart
function cartUpdate() {
    let cartList = '';
    totalPrice = 0;

    if (totalValue === 0) {
        cartContent.innerHTML = '<div><img src = "./assets/images/illustration-empty-cart.svg" alt = "empty-cart-image" ><h5>Your added items will appear here</h5></div>'
        cartDetails.style.height = '300px';
        cartRemoveAll.src = ''
        cartContent.style.marginTop = '45px'
        return;
    } 

    for (let i in cart) {
        if (cart[i].quantity > 0){
            cartList += `<ul style="list-style-type: none;">
            <li style="border-bottom: 2px solid whitesmoke;">
                <div style= "box-sizing: border-box; margin: 0px;display: flex;align-items: center;justify-content: space-between;">
                    <div style= "display: flex; flex-direction: column;">
                        <h3 style= "margin-top: 10px; color: black; font-family:Red Hat Text;font-weight: 500;font-size: 15px;">${cart[i].name}</h3>
                        <div style= "margin: 10px 0px;display: flex;align-items: center;justify-content: space-between;gap: 10px;">
                            <span style="color: hsl(14, 86%, 42%); font-size: 15px; font-weight: 600;">${cart[i].quantity}x</span>
                            <span style="color: #9F9F9F; font-size: 15px;">@ $${cart[i].price}</span>
                            <span style="color: #9F9F9F;font-weight: 600; font-size: 15px;">$${(cart[i].price * cart[i].quantity).toFixed(2)}</span>
                        </div>
                    </div>
                    <img style= "height: 15px" src="./assets/images/icon-remove-item.svg" onclick= "cartRemove('${cart[i].name}')">
                </div>
            </li>
            </ul>`;

            totalPrice += cart[i].price * cart[i].quantity;
        };  
    };

    cartList += `<ul style="list-style-type: none;">
    <li>
        <div style="display: flex;align-items: center;justify-content: space-between;margin: 30px 0px;">
            <h6 style="font-family:Red Hat Text;font-weight: 400;font-size: 15px;">Order Total</h6>
            <h3 style="color: black;font-family:Red Hat Text;font-weight: 800;font-size: 24px;">$${totalPrice.toFixed(2)}</h3>
        </div>
        <div style="background-color: #fcf8f5; padding: 15px; border-radius: 8px; display: flex;align-items: center;justify-content: center; gap: 10px; margin: 0px 0px 25px 0px;">
            <img src ="./assets/images/icon-carbon-neutral.svg">
            <p style="font-family:Red Hat Text;font-weight: 500;font-size: 15px;">This is a <span style="color: black;">carbon-neutral</span> delivery</p>
        </div>
        <button style="width: 100%; height: 55px; background-color: hsl(14, 86%, 42%); color: white; border-radius: 30px; border: none; text-align: center; font-family: Red Hat Text; font-weight: 600; font-size: 16px;">Confirm Order</button>
    </li>
    </ul>`
    
   return cartContent.innerHTML = cartList; 
};    

