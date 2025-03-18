const nav = document.querySelector("nav");

window.addEventListener("scroll", function () {
    if (window.scrollY > 70) {
        nav.classList.add("shrink-nav");
    } else {
        nav.classList.remove("shrink-nav");
    }
});

const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

menuIcon.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
});

(
function() {
    emailjs.init("_AZHylIuXRh6WK_yv"); 
  })();


  function sendmail(event) {
    event.preventDefault();

    var params = {
        sendername: document.querySelector("#fullname").value,
        subject: document.querySelector("#email").value,
        message: document.querySelector("#message").value
    };

    var serviceID = "service_hgevzlk"; 
    var templateID = "template_ta0pbh9"; 

    emailjs.send(serviceID, templateID, params)
        .then(function(response) {
            alert("Message sent successfully!");
            console.log("SUCCESS!", response.status, response.text);
        }, function(error) {
            alert("Failed to send message.");
            console.log("FAILED...", error);
        });
}
