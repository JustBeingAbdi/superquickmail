
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
function SavePassword() {
    
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("confirm_password").value;
    if(cpassword !== password){
        return document.getElementById("change_password_text").textContent = "Password doesn't match Confirm Password!";
    }

    let request = new XMLHttpRequest();
    request.open("POST", `/users/manage/password?password=${password}&token=${localStorage.getItem("token")}`);
    request.send();

    setTimeout(function() {
        let respons = request.response;
        if(respons === 'No') return document.getElementById("change_password_text").textContent = "Something Went Wrong. Unable to change Password. Please try again later";

        document.getElementById("change_password_text").textContent = "Password Changed!";
    }, 1500)
}

document.getElementById("changep").addEventListener("submit", function(event) {
    event.preventDefault();
    SavePassword();
})


function Delete() {

    let drequest = new XMLHttpRequest();
    drequest.open('GET', '/users/account/terminate?token=' + localStorage.getItem("token"));
    drequest.send();
    window.location.assign(`/logout?key=${localStorage.getItem("token")}&host=https://${window.location.hostname}`);

}