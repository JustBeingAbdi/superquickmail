var data = (localStorage.getItem("user")) || (localStorage.setItem("user", false));


function CheckUser() {
    let token = localStorage.getItem("user");
    let checkuser = new XMLHttpRequest();
    checkuser.open("GET", "/users/verify/token?token=" + token);
    checkuser.send();

    setTimeout(function() {
        if(checkuser.response === 'No') return;
        window.location.assign("/");
    }, 1000);
}
CheckUser();

function Login() {
    document.getElementById("logintext").textContent = "Logging in...";
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let request = new XMLHttpRequest();
    request.open("POST", `/users/login?email=${email}&password=${password}`);
    request.send(email + ' ' + password);

    setTimeout(function() {
        let respons = request.response;
        if(respons === 'Email' || respons === "Password") return document.getElementById("logintext").textContent = "Incorrect Email or Password!";
        localStorage.setItem("user", respons);
        document.getElementById("logintext").textContent = "Logged In! Redirecting...";
        setTimeout(function() {
            window.location.assign("/");

        }, 1000);

    }, 1500)
}

let loginform = document.getElementById("loginform");
loginform.addEventListener("submit", function(event) {
    event.preventDefault();
    Login();
})