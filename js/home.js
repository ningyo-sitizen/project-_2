const nav = document.querySelector("nav");

window.addEventListener("scroll", function () {
    if (window.scrollY > 70) {
        nav.classList.add("shrink-nav");
    } else {
        nav.classList.remove("shrink-nav");
    }
});


const menuIcon = document.getElementById("menu-icon");
const closeMenu = document.getElementById("close-menu");
const mobileMenu = document.getElementById("mobile-menu");

menuIcon.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    console.log("buka")
});


closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    console.log("tutup")
});
