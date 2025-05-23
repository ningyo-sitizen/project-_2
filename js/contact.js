(function() {
    emailjs.init(""); 
})();

function sendmail(event) {
    console.log("send")
    event.preventDefault();

    var sendername = document.querySelector("#fullname").value.trim();
    var email = document.querySelector("#email").value.trim();
    var message = document.querySelector("#message").value.trim();

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!sendername || !email || !message) {
        alert("Semua kolom harus diisi!");
        return;
    }

    
    if (!emailPattern.test(email)) {
        alert("Masukkan email yang valid.");
        return;
    }

    var params = {
        sendername: sendername,
        email: email,
        message: message
    };

    var serviceID = "service_hgevzlk"; 
    var templateID = "template_ta0pbh9"; 

    emailjs.send(serviceID, templateID, params)
        .then(function(response) {
            alert("Pesan berhasil dikirim!");
            console.log("SUCCESS!", response.status, response.text);
        }, function(error) {
            alert("Gagal mengirim pesan.");
            console.log("FAILED...", error);
        });
}
