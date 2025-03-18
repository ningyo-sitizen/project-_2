
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

window.addToCart = function (item, price) {
    console.log("reservation berhasil dimuat");
    cart.push({ item, price });
    totalPrice += price;
    updateCart();
};
