console.log("reservation berhasil dimuat");

const nav = document.querySelector("nav");

window.addEventListener("scroll", function () {
    if (window.scrollY > 70) {
        nav.classList.add("shrink-nav");
        console.log("menu js berhasil di log");
    } else {
        nav.classList.remove("shrink-nav");
        console.log("menu js berhasil di log");
    }
});

(function () {
    emailjs.init("e_18YHlJ-8z1LxEOp");
})();

function sendmail(event) {
    event.preventDefault();

    var params = {
        sendername: document.querySelector("#fullname").value,
        phonenumber: document.querySelector("#phonenumber").value,
        email: document.querySelector("#email").value,
        persons: document.querySelector("#persons").value,
        date: document.querySelector("#date").value,
        time: document.querySelector("#time").value
    };

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

let cart = [];
let totalPrice = 0;

window.addToCart = function (item, price) {
    cart.push({ item, price });
    totalPrice += price;
    updateCart();
};

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total-price");

    cartList.innerHTML = "";
    cart.forEach(({ item, price }) => {
        let li = document.createElement("li");
        li.textContent = `${item} - $${price}`;
        cartList.appendChild(li);
    });

    totalElement.textContent = `$${totalPrice}`;
}

window.checkout = function () {
    alert(`Total Order: $${totalPrice}`);
    cart = [];
    totalPrice = 0;
    updateCart();
};

document.addEventListener("DOMContentLoaded", function () {
    console.log("menu js berhasil di log");
});
