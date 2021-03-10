
let emailform = document.getElementById("femail");

emailform.addEventListener("submit", function(event) {
    event.preventDefault();
    SaveEmail();
});


function SaveEmail() {
    
    let email = document.getElementById("email").value;
    let vemail = document.getElementById("vemail").value;
    if(vemail !== email) return document.getElementById("emailtext").textContent = "Email doesn't match Verify Email";
    let request = new XMLHttpRequest();
    request.open("POST", `/users/manage/email?email=${email}&token=${localStorage.getItem("token")}`);
    request.send(vemail);

    setTimeout(function() {
        document.getElementById("emailtext").textContent = request.response;
        

    }, 1500)
}