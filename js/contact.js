(function() {
    emailjs.init("_AZHylIuXRh6WK_yv"); 
  })();


  function sendmail(event) {
    console.log("send")
    event.preventDefault();

    var params = {
        sendername: document.querySelector("#fullname").value,
        email: document.querySelector("#email").value,
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
