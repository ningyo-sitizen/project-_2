
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
    
    // Cek apakah item sudah ada di cart
    let existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;  // Tambah jumlah jika sudah ada
    } else {
        cart.push({ item, price, quantity: 1, image }); // Tambah item baru
    }
    
    totalPrice += price;
    updateCart();
};

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total-price");

    cartList.innerHTML = ""; // Hapus list lama sebelum update
    totalPrice = 0; // Reset total harga

    cart.forEach(({ item, price, quantity, image }) => {
        let li = document.createElement("li");
        li.classList.add("cart-item");

        // Buat elemen gambar
        let img = document.createElement("img");
        img.src = image;
        img.alt = item;
        img.classList.add("cart-img");

        // Buat elemen teks untuk item
        let itemText = document.createElement("span");
        itemText.textContent = `${item} - $${price} x ${quantity} `;

        // Buat tombol "-" untuk mengurangi jumlah
        let minusButton = document.createElement("button");
        minusButton.textContent = " - ";
        minusButton.classList.add("cart-btn");
        minusButton.onclick = function () {
            decreaseQuantity(item, price);
        };

        // Buat tombol "+" untuk menambah jumlah
        let plusButton = document.createElement("button");
        plusButton.textContent = " + ";
        plusButton.classList.add("cart-btn");
        plusButton.onclick = function () {
            addToCart(item, price, image);
        };

        // Buat tombol "X" untuk menghapus item
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
