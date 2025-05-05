
function showCategory(category) {
    document.getElementById('foods').style.display = 'none';
    document.getElementById('drinks').style.display = 'none';
    document.getElementById('dessert').style.display = 'none';
    document.getElementById(category).style.display = 'grid'; 
    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
}

document.addEventListener("DOMContentLoaded", function() {
console.log("menu")

});

let cart = [];
let totalPrice = 0;

window.addToCart = function (item, price, image) {
    console.log("Menambahkan item ke cart:", item, price, image);
    
    let existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1, image }); 
    }
    
    totalPrice += price;
    updateCart();
};

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total-price");

    cartList.innerHTML = ""; 
    totalPrice = 0; 

    cart.forEach(({ item, price, quantity, image }) => {
        let li = document.createElement("li");
        li.classList.add("cart-item");

        let img = document.createElement("img");
        img.src = image;
        img.alt = item;
        img.classList.add("cart-img");

        let itemText = document.createElement("span");
        itemText.textContent = `${item} - $${price} x ${quantity} `;

        let minusButton = document.createElement("button");
        minusButton.textContent = " - ";
        minusButton.classList.add("cart-btn");
        minusButton.onclick = function () {
            decreaseQuantity(item, price);
        };

        let plusButton = document.createElement("button");
        plusButton.textContent = " + ";
        plusButton.classList.add("cart-btn");
        plusButton.onclick = function () {
            addToCart(item, price, image);
        };

        let removeButton = document.createElement("button");
        removeButton.textContent = " X ";
        removeButton.classList.add("cart-btn-remove");
        removeButton.onclick = function () {
            removeFromCart(item);
        };

        // Tambahkan elemen ke dalam <li>
        li.appendChild(img);
        li.appendChild(itemText);
        li.appendChild(minusButton);
        li.appendChild(plusButton);
        li.appendChild(removeButton);
        
        // Masukkan <li> ke dalam daftar
        cartList.appendChild(li);
        
        // Hitung ulang total harga
        totalPrice += price * quantity;
    });

    totalElement.textContent = `$${totalPrice}`;
}

// Fungsi untuk mengurangi jumlah item
function decreaseQuantity(item, price) {
    let existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        totalPrice -= price;
    } else {
        removeFromCart(item);
    }
    updateCart();
}

// Fungsi untuk menghapus item dari cart
function removeFromCart(item) {
    cart = cart.filter(cartItem => cartItem.item !== item);
    updateCart();
}

window.checkout = function () {
    alert(`Total Order: $${totalPrice}`);
    cart = [];
    totalPrice = 0;
    updateCart();
};

(function () {
    emailjs.init("");
})();

function sendmail(event) {
    event.preventDefault();


    let cartItems = cart.map(item => {
        return `
            <div>
                <img src="${item.image}" alt="${item.item}" style="width: 50px; height: 50px;">
                <p>${item.item} - $${item.price} x ${item.quantity}</p>
            </div>
        `;
    }).join('');

    var params = {
        sendername: document.querySelector("#fullname").value,
        phonenumber: document.querySelector("#phonenumber").value,
        email: document.querySelector("#email").value,
        persons: document.querySelector("#persons").value,
        date: document.querySelector("#date").value,
        time: document.querySelector("#time").value,
        cart: cartItems,
        totalPrice: totalPrice
    };
    
    var sendername = document.querySelector("#fullname").value.trim();
    var phonenumber = document.querySelector("#phonenumber").value.trim();
    var email = document.querySelector("#email").value.trim();
    var persons = document.querySelector("#persons").value.trim();
    var date = document.querySelector("#date").value.trim();
    var time = document.querySelector("#time").value.trim();

        if (!sendername || !phonenumber || !email ||!persons ||!date || !time) {
        alert("Semua kolom dalam form reservasi harus diisi");
        return;
    }

    var serviceID = "service_tq5dg6t";
    var templateID = "template_im2xrem";

    emailjs.send(serviceID, templateID, params)
        .then(function (response) {
            alert("Message sent successfully!");
            console.log("SUCCESS!", response.status, response.text);
        }, function (error) {
            alert("Failed to send message.");
            console.log("FAILED...", error);
        });
}
